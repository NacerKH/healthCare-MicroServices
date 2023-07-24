const UserModel = require("../../Models/User");
const  transporter  = require("../../utils/mailerUtils");
const crypto = require('crypto');
module.exports.sendEmailVerification = async (req, res) => {
  
    const { email } = req.body;
     
console.log(email,"email");

    try {
      if (!email && ! res.locals?.user.email) {
        return res.status(400).json({ message: 'Email is required' });
        }
       if (! email && res.locals.user.email) {
        email = res.locals.user.email;
       }
       console.log(email);
        // Check if the user with the provided email exists
        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: 'User not found with email ' + email });
        }

        // Generate a verification token
        const verificationToken = crypto.randomBytes(20).toString('hex');

        // Set token expiration (e.g., valid for 24 hours)
        const tokenExpiration = Date.now() + 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        // Save the verification token and expiration in the user model
        user.email_verification_token = verificationToken;
        user.email_verification_token_expiresAt = tokenExpiration;
        await user.save();

        // Compose the verification link with the token
        const verificationLink = process.env.SERVER_URL + `/api/user/email/verify-email/${verificationToken}`;

        // Compose the email message
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Email Verification',
            text: `Click the following link to verify your email: ${verificationLink}`
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Failed to send verification email' });
            }
            console.log('Verification email sent:', info.response);
            res.json({ message: 'Verification email sent successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports.verificationEmail= async (req, res) => {
    const { verificationToken } = req.params;

    try {
      const user = await UserModel.findOne({ email_verification_token: verificationToken });
  
      if (!user) {
        return res.status(404).json({ message: 'Invalid or expired verification token' });
      }
  
      // Check if email is already verified
      if (user.email_verification) {
        return res.status(400).json({ message: 'Email already verified' });
      }
  
      // Check if verification token has expired (e.g., valid for 24 hours)
      if (user.email_verification_token_expiresAt < Date.now()) {
        return res.status(400).json({ message: 'Verification token has expired' });
      }
  
      // Perform email verification logic here
      user.email_verification = new Date();
      user.email_verification_token = undefined;
      user.email_verification_token_expiresAt = undefined;
      await user.save();
  
      res.json({ message: 'Email verified successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };