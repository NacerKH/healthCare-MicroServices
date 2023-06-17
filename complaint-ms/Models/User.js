const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,

    },
     gender: {
         type : String,
   
    }
 ,
      picture: {
        type: String,

    }


},
    {
        timestamps: true,
    },
)


const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel