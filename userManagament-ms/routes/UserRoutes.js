const router = require('express').Router();
const authController = require('../controllers/authentification/AuthentificationController');
const adminController = require('../controllers/admin/UserController');
const userController = require('../controllers/user/userController');
const EmailVerficationController = require('../controllers/user/EmailVerficationController');

const {  requireAuth ,checkUser} = require('../middlewares/AuthentificationMiddleware');
const   checkEmailVerification = require('../middlewares/MustVerified');

const multer = require('multer');
const upload = multer();
//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);


// Grouped routes with requireAuth middleware
router.use(requireAuth);
router.use(checkUser);
router.post("/email/send-email-verification", EmailVerficationController.sendEmailVerification);
router.get("/email/verify-email/:verificationToken", EmailVerficationController.verificationEmail);

router.use(checkEmailVerification);
router.get("/logout", authController.logout);
//user:DB
router.get("/", adminController.getAllUsers);
router.get("/:id", adminController.userinfo);
router.put("/:id", adminController.updateUser);
router.post("/addUser", adminController.addUser);
router.delete("/:id", adminController.deleteUser);

//user:follow 
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);
//upload
router.post('/upload', upload.single('file'), userController.uploadProfil);
module.exports = router;