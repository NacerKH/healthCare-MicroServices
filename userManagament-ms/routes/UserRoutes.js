const router = require('express').Router();
const authController = require('../controllers/authentification/AuthentificationController');
const adminController = require('../controllers/admin/UserController');
const userController = require('../controllers/user/userController');
const {  requireAuth } = require('../middlewares/AuthentificationMiddleware');

const multer = require('multer');
const upload = multer();
//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// Grouped routes with requireAuth middleware
router.use(requireAuth);
//user:DB
router.get("/", adminController.getAllUsers);
router.get("/:id", adminController.userinfo);
router.put("/:id", adminController.updateUser);
router.delete("/:id", adminController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);
//upload
router.post('/upload', upload.single('file'), userController.uploadProfil);
module.exports = router;