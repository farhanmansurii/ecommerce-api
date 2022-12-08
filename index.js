const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userrouter = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
dotenv.config();
app.use(function (request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.json());
app.use('/api/user', userrouter);
app.use('/api/auth', authRoute);
app.use('/api/product', productRoute);
mongoose.connect(process.env.MONGO_URL).then(() => console.log('connected to cluster'));

app.listen(5000, () => console.log('listening on port 5000'));
