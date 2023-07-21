const express= require('express');
require('dotenv').config({path: './config/.env'});
const db =require('./config/db');

const mongoose = require('mongoose');


const ComplaintRoutes=require('./routes/ComplaintRoutes')
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/api/complaint/', ComplaintRoutes)

const hostname="127.0.0.1"
const port = process.env.port || 9090 // || = OU logique 

app.listen(port, hostname,()=>{
    console.log(`server running  ${hostname}:${port}`);
})