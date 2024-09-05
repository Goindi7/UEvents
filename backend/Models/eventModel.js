const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
    },
    user: {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        rollNumber: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        year: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        }
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Event', eventSchema);
