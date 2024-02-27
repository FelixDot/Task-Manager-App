
const boardRouter = require('express').Router()
const Board = require('../models/board')
const Task = require('../models/task')

const User = require('../models/user')
const jwt = require('jsonwebtoken')


boardRouter.get('/', async (request, response) => {
    const boards = await Board.find({})
        .populate({ path: 'user',
            select: 'username name id' })
        .populate({
            path: 'tasks',
            select: 'taskName taskDescription status priority labels createdAt'
        })
    return response.json(boards)
})

boardRouter.post('/',async (request,response, next) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.user) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const board = new Board({
        boardName: body.boardName,
        user: user.id,
        tasks: []
    })
    try{
        const savedBoard = await board.save()

        user.boards = user.boards.concat(savedBoard._id)
        await user.save()
        return response.status(201).json(savedBoard)

    }catch(exception){
        next(exception)
    }
})

boardRouter.post('/:boardId/tasks', async (req, res) => {
    try {
        const boardId = req.params.boardId
        const taskData = req.body

        const board = await Board.findById(boardId)
        if (!board) {
            return res.status(404).send({ error: 'Board not found' })
        }

        const task = new Task({
            ...taskData,
            board: boardId
        })

        await task.save()
        board.tasks.push(task)
        await board.save()
        return res.status(201).send(task)
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error: 'Error when adding the task.' })
    }
})

boardRouter.get('/:username', async (request, response) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.user) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        if(request.params.username.toString() !== decodedToken.username){
            return response.status(404).json({ error: 'unauthorized' })
        }
        const user = await User.findById(decodedToken.id)

        if (!user) {
            return response.status(404).json({ error: 'User not found' })
        }

        const boards = await Board.find({ user: user }).populate({ path: 'user',
            select: 'username name id' })
            .populate({
                path: 'tasks',
                select: 'taskName taskDescription status priority labels createdAt'
            })
        return response.json(boards)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ error: 'Error retrieving boards.' })
    }
})

boardRouter.delete('/:boardId', async(request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    try{
        const boardId = request.params.boardId
        await Task.deleteMany({ board: boardId })
        await Board.findByIdAndDelete(boardId)
        return response.status(200).end()
    }catch(error){
        return response.status(500).json({ error: error })
    }
})
module.exports = boardRouter