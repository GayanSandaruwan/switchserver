'use strict';
const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    service: 'zoho',
    auth: {
        user: 'gayan@ciperlabs.com',
        pass: 'gayanzoho2017'
    }
});

// setup email data with unicode symbols
exports.sendMail = function(key,email){


    let mailOptions = {
        from: '"Serendib Travel Guide 👻" <gayankavirathne@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Hello ✔ Welcome To Serendib Travel Guide', // Subject line
        text: 'You Are Registered as a User Under Serendib Travel Guide System', // plain text body
        html: '<b>Your Key is shown below. Open Your Application and Enter the key </b>' + key // html body
    };
// send mail with defined transport object
    transporter.sendMail(mailOptions,(error, info) => {
        if (error) {
            console.log(error);
            return false;
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    console.log("Mail Sent")
    return true;
}

