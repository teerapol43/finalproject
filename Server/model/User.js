const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;
const uesrSchema = mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: "user",
    },
    enabled: {
        type: Boolean,
        default: false,
    },
    fulladdress: String,
    phoneNumber: String,
    province: String,
    subdistrict: String,
    zipCode: Number,
    name: String,
    cart: [{
        type: ObjectId,
        ref: 'cart'
    }],
    wishlist: [{
        type: ObjectId,
        ref: 'product'
    }]
}, { timestamps: true })

module.exports = mongoose.model('users', uesrSchema)