const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;
const uesrSchema = mongoose.Schema({
    username: String,
    password: {
        type: String
    },
    role: {
        type: String,
        default: "user"
    },
    address: String,
    wishlist: [{
        type: ObjectId,
        ref: 'product'
    }]
}, { timestamps: true })

module.exports = mongoose.model('users', uesrSchema)