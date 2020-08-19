//Dependencies
  

let express=require('express')
let app= express()
let PORT= process.env.PORT|| 3003


let cors= require('cors')
let mongoose=require('mongoose')
// let bodyParser = require('body-parser')
// new stuff below
let socketio=require('socket.io')
let http = require('http')
let server = http.createServer(app)
let io = socketio(server)
let {addUsers, removeUser, getUser,getUsersInRoom}= require('./controller/chatusers')
let bodyParser= require( 'body-parser')
let  cookieParser= require('cookie-parser')

// devBundle.compile(app)
//Database
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod Ready and Running Baby?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))
// database connection variable
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/datematch'
// database connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
mongoose.connection.once('open', ()=>{
    console.log('connected to Big Goose...')
})


//middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
// secure apps by setting various HTTP headers
// enable CORS - Cross Origin Resource Sharing











const whitelist = ['http://localhost:3000','https://safe-reaches-87855.herokuapp.com' ]
const corsOptions = {
  origin: function (origin, callback) {
      console.log(whitelist, origin)
    if (origin == false || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
      console.log( Error)
    }
  }
}

app.use(cors(corsOptions))
app.use(cors())

//user controller
let userController= require('./controller/user.js')
app.use('/user', userController)

let datematchController= require('./controller/datematch.js')
app.use('/datematch', datematchController)

// let chatusers= require('./controller/chatusers.js')
//  app.use(chatusers)

let chatController= require('./controller/chat.js')
app.use(chatController)



//  let socketController= require('./controller/socket.js')
//  app.use(socketController)

//  let socketpeerController= require('./controller/socketpeer.js')
//  app.use(socketpeerController)

let rooms={}


io.on("connection", socket => {
  socket.on("join room", roomID => {
      if (rooms[roomID]) {
          rooms[roomID].push(socket.id);
      } else {
          rooms[roomID] = [socket.id];
      }
      const otherUser = rooms[roomID].find(id => id !== socket.id);
      if (otherUser) {
          socket.emit("other user", otherUser);
          socket.to(otherUser).emit("user joined", socket.id);
      }
  });

  socket.on("offer", payload => {
      io.to(payload.target).emit("offer", payload);
  });

  socket.on("answer", payload => {
      io.to(payload.target).emit("answer", payload);
  });

  socket.on("ice-candidate", incoming => {
      io.to(incoming.target).emit("ice-candidate", incoming.candidate);
  });

  socket.on('disconnect', function() {
    console.log('Socket disconnected');
  });
});

const users = {};

io.on('connection', socket => {
    if (!users[socket.id]) {
        users[socket.id] = socket.id;
    }
    socket.emit("yourID", socket.id);
    io.sockets.emit("allUsers", users);
    socket.on('disconnect', () => {
        delete users[socket.id];
    })

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
    })

    socket.on("acceptCall", (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    })
});










server.listen(PORT,()=>{
    console.log('lisenting to a playa')
})
