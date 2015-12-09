var express = require("express");
var app = express();
var port = 8888;

app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.set('views', __dirname + '/tpl');
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
	res.render("page");
});

var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
	socket.emit('message', { message: 'Welcome to TMD' });
	socket.on('send', function (data) {
		io.sockets.emit('message', data);
	});
});
console.log("Listening on port " + port);
