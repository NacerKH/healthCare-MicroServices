const ComplaintController = require ('../controllers/ComplaintController');
const { AddComplaintValidation } =  require ('../middlewares/Validation');
const { upload } = require('../middlewares/Upload');

const router = require('express').Router();


router.post('/addComplaint',ComplaintController.createComplaint);
router.get('/',ComplaintController.getAllComplaint);
router.get('/:id',ComplaintController.getComplaint);
router.put('/:id', ComplaintController.updateComplaint); 
router.delete('/:id', ComplaintController.deleteComplaint)
router.get("/first",(req,res)=>{
    res.send('Hello'); 
    
});
module.exports = router;  
