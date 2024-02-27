const tasksRouter = require('express').Router()
const Task = require('../models/task')
const jwt = require('jsonwebtoken')



tasksRouter.get('/:taskId', async (request, response) => {
    try{
        const taskId = request.params.taskId.toString()

        const task = await Task.findById( taskId ).populate('board', 'boardName')

        if(!task){
            return response.status(404).json({ error:'task not found' })
        }
        response.json(task)
    }catch(error){
        console.error(error)
        response.status(500).json({ error: 'Server error when retrieving the task.' })
    }
})

tasksRouter.put('/:taskId',async(request, response) => {
    try{

        const taskId = request.params.taskId.toString()
        const body = request.body
        const updatedTask = {
            taskName:body.taskName,
            status:body.status,
            priority:body.priority,
            labels:body.labels,
            createdAt: body.createdAt,
            taskDescription:body.taskDescription
        }
        const task = await Task.findByIdAndUpdate( taskId, updatedTask,{ new:true } ).populate('board', 'boardName')

        if(!task){
            return response.status(404).json({ error:'task not found' })
        }
        response.json(task)

    }catch(error){
        console.error(error)
        response.status(500).json({ error: 'Server error when updating the task.' })
    }
})

tasksRouter.delete('/:taskId',async(request,response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    try{
        await Task.findByIdAndDelete(request.params.taskId)
        response.status(200).end()
    }catch(error){
        response.status(500).json({ error: error })

    }

})

module.exports = tasksRouter