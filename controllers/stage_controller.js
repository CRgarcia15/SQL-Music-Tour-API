//Dependencies
const stages = require('express').Router()
const db = require('../models')
const {Stage} = db
const {Op} = require('sequelize')

//Find all stages
stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll({
            order: [ ['available_start_time', 'ASC'] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            }
        })
        res.status(200).json(foundStages)
    }
    catch (error) {
        res.status(500).json(error)
    }
})

// FIND A SPECIFIC STAGE
stages.get('/:id', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: { stage_id: req.params.id }
        })

        if (foundStage != null) {
            res.status(200).json(foundStage)
        } else {
            res.status(404).json("Stage " + req.params.id + " does not exist!")
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
})


//Create an stage
stages.post('/', async (req, res) => {
    try{ const newStages = await Stage.create(req.body)
        res.status(200).json({
            message: 'Successfully added a new stage',
            data: newStages
        })
    }
    catch(err) {
        res.status(500).json(err)
    }
})

//Update an event
stages.put('/:id', async (req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedStages} stage(s)`
        })
    }
    catch(err) {
        res.status(500).json(err)
    }
})

// Delete an event
stages.delete('/:id', async (req, res) => {
    try {
        const deletedStages = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStages} stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//Export
module.exports = stages