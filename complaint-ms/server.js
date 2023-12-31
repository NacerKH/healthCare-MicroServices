const express = require('express');
require('dotenv').config({ path: './config/.env' });
const cors = require('cors');
const db = require('./config/db');

const mongoose = require('mongoose');


const ComplaintRoutes = require('./routes/ComplaintRoutes')
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Enable CORS for all routes
app.use(cors());

app.use('/api/complaint/', ComplaintRoutes)



app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
})