const mongoose = require('mongoose');



const ComplaintSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,

    },
      type : {
        type: String,
      }, 

    userId : {
        type:Number,
    }

},
    {
        timestamps: true,
    },
)


const ComplaintModel = mongoose.model('complaint',ComplaintSchema );
module.exports = ComplaintModel

