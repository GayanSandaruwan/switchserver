var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/' , function(req, res){
	
	res.send('<h1> Welcome To the IOT Switch Server </h1>');
});

io.on('connection', function(socket){
	
	console.log('A User Connected');	
});
http.listen(3001, function(){

	console.log('Starting to listen On Port 3001');
});
