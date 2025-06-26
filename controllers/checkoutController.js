const userAddressDetails = require("../models/billingAddress");
const handleAsync = require("../utilities/handleAsync");


const getUserAddressDetails = handleAsync(async (req,res) =>{
    const userId = req.user._id;

const data = await userAddressDetails.findOne({userId});
const addresses = data.addresses
res.success(addresses);

});


const createUserAddressDetails = handleAsync(async(req,res) =>{
 const userId = req.user._id;

const {firstName,lastName,selectedCountry:country,selectedState:state,selectedCity:city,phoneNumber,address,zipCode} = req.body;

const result = await userAddressDetails.findOneAndUpdate(
    {userId},
    {$push:
        {addresses:{
    firstName,
    lastName,
    country,
    state,
    city,
    phoneNumber,
    address,
    zipCode,}}
}

)
console.log("Result", result);
return res.success({id: result._id },201);

});

module.exports = {createUserAddressDetails, getUserAddressDetails}