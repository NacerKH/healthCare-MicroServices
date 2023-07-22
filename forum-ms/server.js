const express= require('express');
require('dotenv').config({path: './config/.env'});
const db =require('./config/db');
const cors = require('cors');

const PostRoutes=require('./routes/PostRoutes')
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// Enable CORS for all routes
app.use(cors());
app.use('/api/v1/',PostRoutes)




////server
app.listen(process.env.PORT, () =>{
    console.log(`listening on port ${process.env.PORT}`);
})
