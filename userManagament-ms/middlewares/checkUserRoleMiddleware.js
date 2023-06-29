const User = require('../Models/User');


async function checkUserRole(req, res, next, roleName) {
    const userId = req.user.id; // Assuming you have a middleware that sets the authenticated user in the request object
  
    try {
      // Find the user and populate the 'role' field
      const user = await User.findById(userId).populate('role');
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the user has the required role
      if (!user.role || user.role.name !== roleName) {
        return res.status(403).json({ error: 'Access denied' });
      }
  
      // User has the required role, proceed to the next middleware/controller
      next();
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  }
  
  module.exports = checkUserRole;
