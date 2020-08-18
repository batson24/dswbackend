// const express = require("express");
// const http = require("http");
// const app = express();
// const server = http.createServer(app);
// const socketpeer = require("socket.io");
// const io = socketpeer(server);






// io.on('connection', socketpeer => {
//     if (!users[socketpeer.id]) {
//         users[socketpeer.id] = socketpeer.id;
//     }
//     socketpeer.emit("yourID", socketpeer.id);
//     sio.socketpeer.emit("allUsers", users);
//     socketpeer.on('disconnect', () => {
//         delete users[socketpeer.id];
//     })

//     socketpeer.on("callUser", (data) => {
//         sio.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
//     })

//     socketpeer.on("acceptCall", (data) => {
//         sio.to(data.to).emit('callAccepted', data.signal);
//     })
// });

// module.exports = socketpeer