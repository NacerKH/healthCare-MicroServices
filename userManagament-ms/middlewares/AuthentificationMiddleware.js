const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User');

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {

                res.locals.user = null;
                res.cookie('jwt', '', { maxAge: 1 });
                next();
            } else {
                console.log('decoded token ' + decodedToken.id);
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                console.log(res.locals.user);

                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }


}
module.exports.requireAuth = async  (req, res, next)  => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
                return res.status(419).json({ message: 'Unauthorized' });
            }
            else {
                console.log(decodedToken.id);
                next();
            }
        });
    } else {
        return res.status(419).json({ message: 'Unauthorized' });
    }
}