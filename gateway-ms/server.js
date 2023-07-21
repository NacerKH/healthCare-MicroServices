const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
require('dotenv').config({ path: './config/.env' });
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: "http://localhost:4200/",
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials', 'Authorization'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': true
}
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//router
app.use(routes);

////server
app.listen(process.env.PORT, () => {
    console.log(` gateway listening on port ${process.env.PORT}`);
})