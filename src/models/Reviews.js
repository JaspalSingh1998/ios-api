const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    businessId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Review', ReviewSchema)
