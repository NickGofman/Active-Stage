const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const userRouter = require('./routes/userRegistration');
const Login = require('./routes/login');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
// Serve static files from the frontend public directory
app.use(express.static(path.join(__dirname, 'front-end/build')));
const port = process.env.port || 3001;
app.use('/user', Login);

app.use('/user', userRouter);
app.listen(port, () => {
  console.log(`WE ARE RUNNING PORT: ${port}`);
});
