const mongoose = require('mongoose')

const uesrSchema = mongoose.Schema({
    username: String,
    password: {
        type: String
    },
    role: {
        type: String,
        default: "user"
    }
}, { timestamps: true })

module.exports = mongoose.model('users', uesrSchema)