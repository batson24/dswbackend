// let express= require('express')
// let dateSocket = express.Router()

// // var io = require('socket.io').listen(server)
//  let http= require('http')

// let server= http.createServer(dateSocket)
//  let socket= require('socket.io')
// //  let sio = socket(server)




// const sio = require("socket.io")(server, {
//     handlePreflightRequest: (req, res) => {
//         const headers = {
//             "Access-Control-Allow-Headers": "Content-Type, Authorization",
//             "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
//             "Access-Control-Allow-Credentials": true
//         };
//         res.writeHead(200, headers);
//         res.end();
//     }
// });







// let rooms = {};

// sio.on("connection", socket => {
//     socket.on("join room", roomID => {
//         if (rooms[roomID]) {
//             rooms[roomID].push(socket.id);
//         } else {
//             rooms[roomID] = [socket.id];
//         }
//         const otherUser = rooms[roomID].find(id => id !== socket.id);
//         if (otherUser) {
//             socket.emit("other user", otherUser);
//             socket.to(otherUser).emit("user joined", socket.id);
//         }
//     });

//     socket.on("offer", payload => {
//         io.to(payload.target).emit("offer", payload);
//     });

//     socket.on("answer", payload => {
//         io.to(payload.target).emit("answer", payload);
//     });

//     socket.on("ice-candidate", incoming => {
//         io.to(incoming.target).emit("ice-candidate", incoming.candidate);
//     });
// });
// module.exports = socket