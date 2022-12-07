const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userrouter = require('./routes/usertest');
const authRoute = require('./routes/auth')
dotenv.config();
app.use(express.json());
app.use('/api/user',userrouter)
app.use('/api/auth',authRoute)
mongoose.connect(process.env.MONGO_URL).then(()=>console.log('connected to cluster'))

app.listen(process.env.PORT || 5000,()=>console.log('listening on port 5000'));
