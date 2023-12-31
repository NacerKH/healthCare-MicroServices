const Role = require('../../Models/Role.js');
const UserModel = require('../../Models/User.js');
const handleFileUpload = require('../../services/Upload.js');
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
  const { pseudo, email, password, bio } = req.body;
  console.log(req.body);
  try {

    let picture = "";
    if (req.file) {
      picture = await handleFileUpload(req.file, req.body.pseudo);
    }

    const newUser = await new UserModel({
      pseudo: pseudo,
      email: email,
      password: password,
      bio: bio ?? "",
      // Add any other required fields xD
      picture: picture ?? "",
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
          pseudo: req.body.pseudo,
          email: req.body.email,
          password: req.body.password,
          picture: req.body.picture,
          role: req.body.role,
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

module.exports.assignRole = async (req, res) => {

  const { userId, roleId } = req.body;
  try {
    // Check if the user and role exist
    const user = await UserModel.findById(userId);
    const role = await Role.findById(roleId);

    if (!user) {
      throw new Error('User not found');
    }

    if (!role) {
      throw new Error('Role not found');
    }

    // Check if the user already has the role assigned
    const existingUserRole = await UserRole.findOne({ user: userId, role: roleId });

    if (existingUserRole) {
      throw new Error('Role already assigned to the user');
    }

    // Assign the role to the user
    user.roles.push(roleId);
    await user.save();

    return 'Role assigned to the user successfully';
  } catch (error) {
    return error.message;
  }
}