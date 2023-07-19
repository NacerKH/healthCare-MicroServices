const authorizationServices = require('../ExternelServices/UserManagementServices');

const router = require('express').Router();


router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(authorizationServices)

module.exports = router