const express = require('express');
require('dotenv').config({ path: './config/.env' });
const cookieParser = require('cookie-parser');

const { setupLogging } = require("./Services/logging");
const routes = require('./routes')
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
setupLogging(app);
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World! from `gatway`')
    res.send(req.cookies.user_id)
})
app.use(routes)



////server
app.listen(process.env.PORT, () => {
    console.log(` gatway Api listening on port ${process.env.PORT}`);
})
