const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User');

module.exports.checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    const tokenheader = req.headers.authorization;

    if (tokenheader) {
        console.log("tokenheader" + tokenheader);
        jwt.verify(tokenheader, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                // console.log(decodedToken);
                res.locals.user = null;
                res.cookie('jwt', '', { maxAge: 1 });
                next();
            }


            else {

                let user = await UserModel.findById(decodedToken.id);
                console.log(user);
                res.locals.user = user;
                res.cookie('user',user.email_verification??'', { maxAge: 10000000 });

                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }


}
module.exports.requireAuth = async (req, res, next) => {

    const tokenheader = req.headers.authorization;
    if (tokenheader) {
        jwt.verify(tokenheader, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
                return res.status(419).json({ message: 'Unauthorized' });
            }

            else {
                console.log(decodedToken.id);
                next();
            }
        });
    }
    else {
        return res.status(419).json({ message: 'UnauthorizedD' });
    }
}