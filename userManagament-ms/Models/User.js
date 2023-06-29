const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const { defaultProfilePhotoUrl } = require('../utils/userUtils');
const userSchema = new mongoose.Schema(

    {
        pseudo: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minlength: 6,
        },
        picture: {
            type: String,
            default: function () {
                return defaultProfilePhotoUrl(this.pseudo);
            }
        },
        bio: {
            type: String,
            max: 1024,
        },

        followers: {
            type: [String]
        },

        following: {
            type: [String]
        },

        likes: {
            type: [String]
        },
        email_verification: {
            type: Date,
            default: null
        },
        email_verification_token_expiresAt : {
            type: Date,
            default: null
        },
        email_verification_token : {
            type: String,
            default: null
        },
        role: { type: mongoose.Schema.Types.ObjectId, ref: 'UserRole' } // Reference to the UserRole document
    },
    {
        timestamps: true,
    }
);
// play function before save into  display :'block';
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
// decrypt le login et verfiy if user existe
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email')
};
const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;