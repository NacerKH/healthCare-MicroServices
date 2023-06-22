const router = require('express').Router();
const authController = require('../controllers/authentification/AuthentificationController');
const userController = require('../controllers/admin/UserController');
const uploadController = require('../controllers/user/userController');
const multer = require('multer');
const upload = multer();
//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);
//user:DB
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userinfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);
//upload
router.post('/upload', upload.single('file'), uploadController.uploadProfil);
module.exports = router;