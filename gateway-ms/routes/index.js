const authorizationServices = require('../ExternelServices/UserManagementServices');
const AppointementServices = require('../ExternelServices/AppointementServices');

const router = require('express').Router();


router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(authorizationServices)
router.use(AppointementServices)

module.exports = router