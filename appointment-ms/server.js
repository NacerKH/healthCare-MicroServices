const express= require('express');
const mongoose = require('mongoose');

require('dotenv').config({path: './config/.env'});
const db =require('./config/db');
const userRoutes=require('./routes/AppointmentRoutes')
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/v1/',userRoutes)
mongoose.set('strictQuery', false);


app.listen(process.env.PORT, () =>{
    console.log(`listening on port ${process.env.PORT}`);
})
