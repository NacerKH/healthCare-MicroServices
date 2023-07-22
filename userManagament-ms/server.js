const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/UserRoutes');
require('dotenv').config({ path: './config/.env' });
require('./config/db');
const { checkUser, requireAuth } = require('./middlewares/AuthentificationMiddleware');
const cors = require('cors');
var bodyParser = require('body-parser');

const app = express();

const corsOptions = {
    origin: "*",
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}
app.use(cors(corsOptions));


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());

//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res,next) => {
    res.status(200).json(res.locals?.user?._id)
})
//router
app.use('/api/user', userRoutes);

////server
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
})