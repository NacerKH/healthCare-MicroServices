const mongoose = require('mongoose');



const ComplaintSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
      },
      medecineId: {
        type: String,
        required: true
      },
    
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,

    },
      type : {
        type: String,
      }

},
    {
        timestamps: true,
    },
)


const ComplaintModel = mongoose.model('complaint',ComplaintSchema );
module.exports = ComplaintModel

