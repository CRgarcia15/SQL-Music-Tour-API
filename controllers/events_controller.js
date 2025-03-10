//Dependencies
const events = require('express').Router()
const db = require('../models')
const {Event} = db
const {Op} = require('sequelize')

//Find all events
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [ ['date', 'ASC'] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            }
        })
        res.status(200).json(foundEvents)
    }
    catch (error) {
        res.status(500).json(error)
    }
})

//Find specific event
events.get('/:id', async(req, res) => {
    try {
        const foundEvents = await Event.findOne({
            where: {event_id: req.params.id}
        })
        res.status(200).json(foundEvents)
    }
    catch (error) {
        res.status(500).json(error)
    }
})

//Create an event
events.post('/', async (req, res) => {
    try{ const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Successfully created a new Event',
            data: newEvent
        })
    }
    catch(err) {
        res.status(500).json(err)
    }
})

//Update an event
events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvents} event(s)`
        })
    }
    catch(err) {
        res.status(500).json(err)
    }
})

// Delete an event
events.delete('/:id', async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//Export
module.exports = events