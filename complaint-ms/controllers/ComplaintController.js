const mongoose=require('mongoose');
const ComplaintModel =require('../Models/complaint');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.createComplaint = async (req, res) => {
    console.log( "ddd",req)
    const newComplaint = new ComplaintModel({
      userId: req.body.userId??"null",
      medecineId:req.body.medecineId??"null",
      title: req.body.title,
      description: req.body.description,
      type:req.body.type,
      
   
      });
      try {
        const Complaint = await newComplaint.save();
        return res.status(201).json(Complaint);
      } catch (err) {
        return res.status(400).send(err);
      }

}
module.exports.getAllComplaint = async (req, res) => {
 
      try {
        const Complaint = await ComplaintModel.find();
        return res.status(200).json(Complaint);
      } catch (err) {
        return res.status(400).send(err);
      }

}
module.exports.getComplaint = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
  
ComplaintModel.findById({ _id: req.params.id },(err,data)=>{
        if(!err && data ) return res.send(data);
        else console.log('ID unknow : ' + err);

     });
  
}

module.exports.updateComplaint = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const updatedComplaint = await ComplaintModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (updatedComplaint) {
      return res.status(200).json(updatedComplaint);
    } else {
      return res.status(404).json({ error: "Complaint not found" });
    }
  } catch (err) {
    return res.status(400).send(err);
  }
}

module.exports.deleteComplaint = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const result = await ComplaintModel.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).json({ message: "Complaint deleted successfully" });
    } else {
      return res.status(404).json({ error: "Complaint not found" });
    }
  } catch (err) {
    return res.status(400).send(err);
  }
}

module.exports.getComplaintByUser = async (req, res) => {
  const userId = req.params.id;
  console.log(req)
  try {
    const complaint = await ComplaintModel.find({userId:userId});
    return res.status(200).json(complaint);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.getComplaintByMedicine = async (req, res) => {
  const medecineId = req.params.id;
  console.log(req)

  try {
    const complaint = await ComplaintModel.find({medecineId:medecineId});
      
    return res.status(200).json(complaint);
  } catch (err) {
    return res.status(400).send(err);
  }
};
