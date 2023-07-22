const authorizationServices = require('../ExternelServices/UserManagementServices');
const AppointementServices = require('../ExternelServices/AppointementServices');
const complaintServices = require('../ExternelServices/ComplaintServices');
const forumServices = require('../ExternelServices/ForumServices');

const router = require('express').Router();


router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(authorizationServices)
router.use(AppointementServices)
router.use(complaintServices)
router.use(forumServices)

module.exports = router