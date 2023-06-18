const userController = require('../controllers/UserController');
const { AddUserValidation } =  require('../middlewares/Validation');
const { upload } =require('../middlewares/Upload');

const router = require('express').Router();


router.post('/addUser', upload, AddUserValidation,userController.createUser);
router.get('/users',userController.getAllUser);
router.get('/user/:id',userController.getUser);
router.get('/first', (req, res) => {
    res.send('Hello, World!');
});

module.exports = router;