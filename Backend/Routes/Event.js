const express = require('express');
const router = express.Router();

const {getEvent,getEventByName,createEvent,updateEvent,deleteEvent} = require('../Controllers/EventController');

// Get all events

router.get('/getEvent', getEvent);

// Get a single event by name

router.get('/getEvent/:eventName', getEventByName);

// Create a new event

router.post('/addEvent', createEvent);

// Update an existing event

router.patch('/updateEvent/:eventName', updateEvent);

// Delete an existing event

router.delete('/deleteEvent/:eventName', deleteEvent);

module.exports = router;
