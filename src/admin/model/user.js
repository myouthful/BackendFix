const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['user','admin','support'],
        default: 'user',
    },
    isActive: {
        type: Boolean,
        default:true,
    },
    {
        timestamps:true
    }

})


module.exports= mongoose.model('User',userSchema);