const checkEmailVerification = (req, res, next) => {
    // Assuming user object is stored in req.user after authentication
   console.log(req.cookies.user);
    if (!req.cookies?.user && ! res.locals.user.email_verification ) {
      return res.status(401).json({ message: 'Email not verified' });
    }
    next();
  };
 
module.exports = checkEmailVerification;
  
  
  
  
  
  
  