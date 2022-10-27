const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

fullName:{
    type:String,
    required: true
},
email:{
    type:String,
    required: true,
    unique: true
},
phoneNumber:{
    type:Number,
    required: true,
    unique: true
},password:{
    type:String,
    required: true
}
},{ timestamps: true }
)

module.exports = mongoose.model('users',userSchema)