const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const cookieParser=require('cookie-parser')

const port = process.env.port || 3001;
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(cookieParser());

app.use('/auth', authRoutes);
app.listen(port, () => {
  console.log(`WE ARE RUNNING PORT: ${port}`);
});
