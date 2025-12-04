const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
    },
    eventCategory: {
        type: String,
        required: true,
    },
    eventDescription: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    venueName: {
        type: String,
        required: true,
    },
    venueAddress: {
        type: String,
        required: true,
    },
    onlineEventLink: {
        type: String,
    },
    organizerName: {
        type: String,
        required: true,
    },
    organizerContact: {
        type: String,
        required: true,
    },
    ticketPrice: {
        type: Number,
        required: true,
    },
    ticketType: {
        type: String,
        required: true,
    },
    maxAttendees: {
        type: Number,
    }
});

module.exports  = mongoose.model('Event', eventSchema);


