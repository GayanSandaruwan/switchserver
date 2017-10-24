/**
 * Created by gayan on 5/11/17.
 */
'use strict'

let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let router = express.Router();
mongoose.Promise = require('bluebird');
let jwt = require('jsonwebtoken');
let User = require('../Models/User');
let random = require('random-key');
let UserSwitch = require('../Models/User_switch');
let BulbGroup = require('../Models/Bulb_group');
let Bulb = require('../Models/Bulb');
let BulbSwitchLog = require('../Models/Bulb_switch_log');
let mailer = require('./mail');


// let authentication = require('../middleware/authentication');
// let adminAuth = require('../middleware/adminAuth');

router.route('/register')      
      //Register New User
    .post(function(req, res) {
        var user = new User();
        console.log(req.body);
        //console.log(res);                                          //body parser lets us use the req.body
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.email = req.body.email;
        user.key = req.body.key;                                    //random.generate(6);
        let success = mailer.sendMail(user.key,user.email);
        console.log("Trying To register");
        user.save(function(err) {
            if (err || !success) {
                res.send({message : false});
                console.log(err);
            }
            else {
                res.json({
                    message: 'User successfully added!',
                    user: user
                });
                console.log(user.first_name + " Saved Successfully");
            }
        });
    });

router.route('/SignIn')                                           //Verify Driver against sent key to the mail
    .post(function(req, res) {
        let email = req.body.email;
                                   //body parser lets us use the req.body
        console.log(req.body);
        User.findOne({ 'email': email },function (err, user) {
            if (err) return handleError(err);
            if (user == null)
                res.json({message: false});
            else
                if(user.key== req.body.key)
                    res.json({message: true, user});
                else
                    res.json({message: false});
        });
    });


router.route('/user/switch')      
    .post(function(req, res) {
      //Add a Switch to the User

        console.log(req.body);
        let user = req.body.user;
        let switchN = req.body.switch;

        UserSwitch.findOne({ 'User': user },function (err, userSwitch) {
            if (err) return handleError(err);

            // No record In User Switch Relationship
            if (userSwitch == null)
                User.findOne({'email' : user}, function(err, user){

                    if(err) return handleError(err);
                    else if(user == null){
                        res.send({message : "No User Registered Under The Given Criteria!"});
                    }

                    //User Details Available.. Creating new User - Switch entry.
                    else{
                        let newUserSwitch = new UserSwitch();
                        newUserSwitch.User = req.body.user;
                        newUserSwitch.switches = [switchN];
                        newUserSwitch.save(function(err) {
                                if (err) {
                                    res.send({message : false});
                                    console.log(err);
                                }   
                                else {
                                    res.json({
                                        message: "User   : " + user.first_name + " Saved Successfully" + "Assigned with switch : "+ switchN +" !",
                                        UserSwitch: UserSwitch
                                    });
                                    console.log("User   : " + user.first_name + " Saved Successfully" + "Assigned with switch : "+ switchN );
                                }
                            });
                    }
                        
                });
            else{

                if(userSwitch.switches.includes(switchN)){
                    res.send({message: "Already Available"});
                }
                else{

                    var query = {'User':user};
                    userSwitch.switches.push(switchN);
                    console.log(userSwitch);
                    UserSwitch.findOneAndUpdate(query, {$set :{switches : userSwitch.switches}}, {upsert:true}, function(err, doc){
                        if (err) return res.send(500, { error: err });
                        return res.send("Successfully Updated!");
                    });
                }
            }
                
        });
            
});
                                       
 

router.route('/user/getSwitches')      
      //Buttons Assigned for a user
    .post(function(req, res) {

        console.log(req.body);

        UserSwitch.find({User : req.body.user}, function(err, switches){
            if(err){
                res.send({message : false});
            }
            else
                res.send({message : switches});
        });
                                       
    });


router.route('/switch/bulbs')      
      //Buttons Assigned for a user
    .post(function(req, res) {

        console.log(req.body);

        BulbGroup.findOne({switch : req.body.switch}, function(err, bulbgroup){
            if(err || bulbgroup==null){
                res.send({message : false});
            }

            Bulb.find({ bulb : {$in : bulbgroup.bulbs}}, function(err, bulbs){
                if(err){
                res.send({message : false});
                }
                res.send({message : bulbs});
            });
            
        });
                                       
    });

router.route('/switch/new')      
      //Buttons Assigned for a user
    .post(function(req, res) {

        console.log(req.body);

        let newBulbGroup = new BulbGroup();
        newBulbGroup.bulbs = req.body.bulbs;
        newBulbGroup.switchName = req.body.name;        

        BulbGroup.find().count(function (err, count) {

            newBulbGroup.switch = count+1;
            newBulbGroup.save(function(err,bulbGroup){
                if(err){
                    console.log(err);
                }
                res.send({message :bulbGroup});

        });
        });
                                       
    });

router.route('/user/getSwitches')      
      //Buttons Assigned for a user
    .post(function(req, res) {

        console.log(req.body);

        UserSwitch.find({User : req.body.email}, function(err, switches){
            if(err){
                res.send({message : false});
            }
            res.send({message : switches});
        });
                                       
    });

router.route('/bulb/new')      
      //Buttons Assigned for a user
    .post(function(req, res) {

        console.log(req.body);
        let newBulb = new Bulb();
        newBulb.Name = req.body.name;
        newBulb.user = req.body.user;
        newBulb.state = false;
        Bulb.find().count(function (err, count) {
            newBulb.bulb = count;
            newBulb.save(function(err, bulb){

                if(err){
                    res.send({message: false});
                }
                res.send({message : bulb});
            });
        });                                     
    });


router.route('/user/bulbs')      
      //Buttons Assigned for a user
    .post(function(req, res) {

        console.log(req.body);
        let user = req.body.user;
        Bulb.find({user : user},function(err, bulbs){

            res.send({message : bulbs});
        });                                     
    });



router.route('/switch/state')      
      //Buttons Assigned for a user
    .post(function(req, res) {

        console.log(req.body);
        let state = req.body.state;
        let switchI = req.body.switch;
        
        BulbGroup.findOne({switch: switchI },function(err, bulbgroup){

            if(bulbgroup=null){
                res.send({message : "No Switch for the given ID"});
            }


            Bulb.update({bulb : {$in : bulbgroup.bulbs}},{state : state}, function(err, newState){

                if(err){
                    res.send({message : "No bulb for the ID"});
                }

                let newBSLog = new BulbSwitchLog();
                newBSLog.switch = req.body.switch;
                newBSLog.state = req.body.state;

                newBSLog.save(function(err,log){

                    if(err){
                        res.send({message : false});
                    }
                    res.send({message : log});
                })

            });       

        });

                             
    });


module.exports = router;