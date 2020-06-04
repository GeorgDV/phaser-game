var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var __dirname = "C:/Users/georg/Desktop/Giti_Repod/Kaspari_Tunnid/CaptainPlayful/src/bomberman"

app.use('/js',express.static(__dirname + '/js'));
app.use('/bomberman_assets',express.static(__dirname + '/bomberman_assets'));
app.use('/main.js',express.static(__dirname + '/main.js'));

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});

server.listen(8081,function(){ // Listens to port 8081
    console.log('Listening on '+server.address().port);
});