const mongoose=require('mongoose');
const UserModel =require('../Models/User')
const ObjectID = require('mongoose').Types.ObjectId;
module.exports.createUser = async (req, res) => {
    console.log( "ddd",{...req})
    const newUser = new UserModel({
        name: req.body.name,
      gender: req.body.gender,
      picture: req.file.path,
   
      });
      try {
        const user = await newUser.save();
        return res.status(201).json(user);
      } catch (err) {
        return res.status(400).send(err);
      }

}
module.exports.getAllUser = async (req, res) => {
 
      try {
        const user = await UserModel.find();
        return res.status(200).json(user);
      } catch (err) {
        return res.status(400).send(err);
      }

}
module.exports.getUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
  
UserModel.findById({ _id: req.params.id },(err,data)=>{
        if(!err && data ) return res.send(data);
        else console.log('ID unknow : ' + err);
     });
  

}