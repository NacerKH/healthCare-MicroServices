const UserModel = require('../../Models/User.js');

const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find()
  res.status(200).json(users);
}


module.exports.userinfo = (req, res) => {

  // console.log(req.params);

  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknow :' + req.params.id)

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log('ID unknow : ' + err);
  }).select('-password');
}

module.exports.addUser = async (req, res) => {
  try {

    let picture = "";
    if (req.file) {
      picture = await handleFileUpload(req.file, req.body.pseudo);
    }

    const newUser = new UserModel({
      username: req.body.pseudo,
      email: req.body.email,
      password: req.body.password,
      bio : req.body.bio?? "",
      // Add any other required fields here
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};


module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknow :' + req.params.id)
  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    return res.status(200).json({ message: "Succesfully Deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}
module.exports.follow = async (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow))
    return res.status(400).send('ID unknow :' + req.params.id)


  try {
    //add to the follower List 
    UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err)
      }
    );
    //add to follwing list 
    UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        // if(!err) res.status(201).json(docs); on ne peut pas return deux response
        if (err) return res.status(400).json(err)
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }

}

module.exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    //remove to follower List 
    UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        return res.status(400).json(err);
      }
    );

    //remove to follwing list  conversion tow follw


    UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).json(err);
      }
    );


  } catch (err) {
    return res.status(500).json({ message: err });
  }
};