const UserModel = require('../../Models/User');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../../utils/errorsUtils');
const transporter = require("../../utils/mailerUtils");


const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};

module.exports.signUp = async (req, res) => {
    console.log(req.body);
    const { pseudo, email, password, role } = req.body
    // Validate the role
    const validRoles = ['patient', 'medecin'];
    if (!validRoles.includes(role)) {
        return res.status(400).json({ error: 'Invalid role. Allowed roles are "user" and "patient".' });
    }

    try {
        const user = await UserModel.create({ pseudo, email, password, role });
        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const errors = signUpErrors(err);
        res.status(200).send({ errors })

    }

};


module.exports.signIn = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge });
        res.status(200).json({ token: token, role: user.role, user_id: user._id })
    } catch (err) {
        const errors = signInErrors(err);
        res.status(500).json({ errors });
    }
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ message: "logout Successffullly" });
}

module.exports.forgetPassword = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    try {

        UserModel.findOne({ email }, (err, user) => {
            if (!user) {
                return res.status(400).json({ error: "User not exist with this email" });
            }
            const token = createToken(user._id);
            const data = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Account Activation Link',
                html: `
    <h2>Please click on given link to reset your password</h2>
    <p>${process.env.CLIENT_URL}/#/reset-password/${token}</p>
    `
            }
            // Send the email
            transporter.sendMail(data, (error, info) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ message: 'Failed to send verification email' });
                }
                console.log('Verification email sent:', info.response);
                res.json({ message: 'Verification email sent successfully' });
            });
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports.resetPassword = async (req, res) => {
    const { password, password_confirmation } = req.body;

    const { token } = req.params;

    try {
        // Verify the token
        const decodedToken = verifyToken(token);

        // Find the user based on the decoded token
        const user = await UserModel.findById(decodedToken.id);

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }
        // Check if the password and password_confirmation match
        if (password !== password_confirmation) {
            return res.status(400).json({ error: 'Password and password confirmation do not match' });
        }
        // Update the user's password
        user.password = password;
        await user.save();

        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to verify a JWT token
const verifyToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        return decodedToken;
    } catch (error) {
        throw new Error('Invalid token');
    }
};