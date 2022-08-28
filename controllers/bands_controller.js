//Dependencies
const bands = require('express').Router()
const db = require('../models')
const {Band} = db

//Find all bands
bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll()
        res.status(200).json(foundBands)
    }
    catch (error) {
        res.status(500).json(error)
    }
})

//Find specific band
bands.get('/:id', async(req, res) => {
    try {
        const foundBands = await Band.findOne({
            where: {band_id: req.params.id}
        })
        res.status(200).json(foundBands)
    }
    catch (error) {
        res.status(500).json(error)
    }
})

//Create a band
bands.post('/', async (req, res) => {
    try{ const newBand = await Band.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newBand
        })
    }
    catch(err) {
        res.status(500).json(err)
    }
})

//Update a band
bands.put('/:id', async (req, res) => {
    try {
        const updatedBands = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedBands} band(s)`
        })
    }
    catch(err) {
        res.status(500).json(err)
    }
})

// Delete a band
bands.delete('/:id', async (req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBands} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//Export
module.exports = bands