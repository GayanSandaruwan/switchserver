var query = {username':req.user.username};
req.newData.username = req.user.username;


MyModel.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    return res.send("succesfully saved");
});
