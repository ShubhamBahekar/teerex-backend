const mongoose = require("mongoose");

const billingAddressSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    zipCode:{
        type:String,
        required:true,
    }
})

const userBillingAddressSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
        unique:true
    },
    addresses:[billingAddressSchema]
})

const billingAddressDetails = mongoose.model("billingAddressDetails",userBillingAddressSchema);

module.exports = billingAddressDetails;