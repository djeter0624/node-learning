const app = require('express')();
const server = require("http").Server(app);
const io = require("socket.io").listen(server);
const moment = require("moment")
users = [];
connections = [];

// listen to port 3000
server.listen(process.env.PORT || 3000);
console.log("Server running...");

// get the index.html file
app.get('/', function(req, res) {
    res.sendFile((__dirname + '/public/index.html'));
});

// connect to the socket
io.sockets.on('connection', function(socket){
    // add socket to connection 
    connections.push(socket);

    // Send a message
    socket.on('send message', function(data){
        // add the time using moment
        let createdAt = moment().valueOf();
        const time = moment(createdAt).format("LLL");
        io.sockets.emit('new message', {msg: data, user: socket.username, time: time});
    });

    // Add a new user
    socket.on('new user', function(data, callback){
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUsernames();
    });

    // update the usernames
    function updateUsernames() {
        io.sockets.emit('get users', users);
    }

});