const express= require('express');
require('dotenv').config({path: './config/.env'});
const db =require('./config/db');
const userRoutes=require('./routes/UserRoutes')
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/v1/',userRoutes)



////server
app.listen(process.env.PORT, () =>{
    console.log(`listening on port ${process.env.PORT}`);
})
