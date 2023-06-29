const checkEmailVerification = (req, res, next) => {
    // Assuming user object is stored in req.user after authentication
  
    if (!res.locals.user.email_verification) {
      return res.status(401).json({ message: 'Email not verified' });
    }
    next();
  };
 
module.exports = checkEmailVerification;
  
  
  
  
  
  
  