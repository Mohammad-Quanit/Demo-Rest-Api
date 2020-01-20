const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const upload = require("./multer.config");



require('dotenv').config();
const port = process.env.PORT || 5500;

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
const connection = mongoose.connection;
connection.once('open', () =>
  console.log('Successfully connected to Mongoose')
);

// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
//   if (err) return err.message;
//   console.log('Successfully connected to Mongoose')
// });

app.use('/exercises', require('./routes/exercise.route'));
app.use('/users', require('./routes/user.route'));
app.use('/chartData', require('./routes/chartData.route'));
app.use("/logs", require("./routes/logs.route"))


let introHtml = `
  <h1>Welcome to Demo CRUD Api's</h1>
  <h3>Go to <a href="https://crud-demo-api.herokuapp.com/exercises">https://crud-demo-api.herokuapp.com/exercises</a> for any demo Todo list</h3>
  <h3>Go to <a href="https://crud-demo-api.herokuapp.com/users">https://crud-demo-api.herokuapp.com/users</a> for any demo User list</h3>
`;

app.post('/upload', upload.array('file') ,(req, res) => {
  // console.log(req.files);
  let file = req.files.map(file => file.url = `${req.protocol}://${req.get('host')}/upload/${file.filename}`);
  console.log(file)
  res.json({ file: file });
});
app.use('/upload', express.static(__dirname + '/upload/'));

app.get('/', (req, res) => res.send(introHtml));

app.listen(port, () => console.log(`Server is running on ${port}`));
