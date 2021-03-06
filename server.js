require('dotenv').config();
const express = require('express');
const cors = require('cors');
const socket = require("socket.io");

const errorHandler = require("./middlewares/errorHandler");
const connection = require("./middlewares/mongoose.config");

const socketEvents = require('./socketEvents')

const headers = require("./headers");
const AppRoutes = require('./routes');

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const app = express();

app.use(express.json());
// preventing cors issues
app.use(cors());
// app routes
app.use(AppRoutes);
// // app headers
app.use(headers);
// global error handler
app.use(errorHandler);

connection
  .once('open', () => console.log('Successfully connected to Mongoose'))
  .catch(err => console.log("ERROR ", err.message));

app.use('/tmp/upload', express.static(__dirname + '/tmp/upload/'));

const server = app.listen(port, () => console.log(`Server is running on ${port}`));
const socketInstance = socket(server);

socketEvents(socketInstance);




// socketInstance.on("connection", socket => {
//   // console.log('a user connected');
//   socket.on('disconnect', function () {
//     console.log('user disconnected');
//   });
//   socket.on('chat', function (msg) {
//     socket.broadcast.emit('chat', msg);
//     console.log(msg)
//   });
// });


// const chatRooms = ['pubg', 'bf', 'csgo'];

// socketInstance.of("/chat-room").on('connection', socket => {
//   // socket.emit("welcome", "Hello and welcome to the chat room.");
//   socket.on("JOIN_ROOM", room => {
//     if(chatRooms.includes(room)) {
//       socket.join(room);
//       socketInstance.of("/chat-room").in(room).emit("NEW_USER", "New User Added to " + room);
//       return socket.emit("SUCCESS", "You have succesfully joined this room")
//     } else {
//       return socket.emit("ERROR", `ERROR, No Room Named ${room}`);
//     }
//   })
// });




// ****** another way to connect to mongo ********//
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
//   if (err) return err.message;
//   console.log('Successfully connected to Mongoose')
// });


// app.use('/exercises', require('./routes/exercise.route'));
// app.use('/users', require('./routes/user.route'));
// app.use('/chartData', require('./routes/chartData.route'));
// app.use("/logs", require("./routes/logs.route"))

// const upload = require("./middlewares/multer");
// app.post('/tmp/upload', upload.array('file') ,(req, res) => {
//   let file = req.files.map(file => file.url = `${req.protocol}://${req.get('host')}/tmp/upload/${file.filename}`);
//   console.log(file)
//   res.json({ file });
// });
