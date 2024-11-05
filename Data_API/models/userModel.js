const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        username: {
            required: true,
            type: String
        },
        password: {
            required: true,
            type: String
        }
    },
    {
        versionKey: false,
    }
)

module.exports = mongoose.model('User', User)
