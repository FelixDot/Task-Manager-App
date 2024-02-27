const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./blog_api_helper')
const User = require('../models/user')
const Board = require('../models/board')
const Task = require('../models/task')
const api = supertest(app)

let auth
beforeEach(async () => {
    await Board.deleteMany({})
    await User.deleteMany({})
    await Task.deleteMany({})
    await Board.insertMany(helper.initalBoards)
    await User.insertMany(helper.initalUser)
    await Task.insertMany(helper.initalTasks)


    auth = await api.post('/api/login').send({ username: 'root', password: 'test123' })


})

test('boards from user', async() => {
    const boards = await api.get('/api/boards/ml').auth(auth.body.token, { type: 'bearer' })
    console.log(boards.body)
})


test('a Board can be added', async() => {

    const newBoard = {
        'boardName': 'second Board',
        'tasks': [],
    }

    await api.post('/api/boards').auth(auth.body.token, { type: 'bearer' }).send(newBoard).expect(201).expect('Content-Type',/application\/json/)

    const boardsAtEnd = await helper.boardsInDb()
    const name = boardsAtEnd.map(b => b.boardName)
    expect(name).toContain('second Board')
})

test('task can be added to a Board', async() => {


    const newBoard = {
        'boardName': 'Second Board',
    }

    await api.post('/api/boards').auth(auth.body.token, { type: 'bearer' }).send(newBoard).expect(201).expect('Content-Type',/application\/json/)

    const newTask = {
        taskName: 'Second Test Task',
        taskDescription: 'This is a test to add task',
        status: 'In Review',
        priority: 'Medium',
        labels: ['test', 'adding']
    }

    const boardsAtStart = await helper.boardsInDb()
    const board = boardsAtStart.find(b => b.boardName === newBoard.boardName)
    const boardId = board.id
    const response = await api.post(`/api/boards/${boardId}/tasks`).auth(auth.body.token, { type:'bearer' }).send(newTask)

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('taskName', newTask.taskName)
    expect(response.body).toHaveProperty('taskDescription', newTask.taskDescription)
    expect(response.body).toHaveProperty('status', newTask.status)
    expect(response.body).toHaveProperty('priority', newTask.priority)
    expect(response.body).toHaveProperty('labels', newTask.labels)


    test('task can be updated',async() => {
        const boardsAtStart = await helper.boardsInDb()
        const boardtoUpdate = boardsAtStart[0]
        const taskId = boardtoUpdate.tasks[0]

        const updateData = {
            status: 'In Review',
            priority: 'High'
        }

        const response = await api.put(`/api/tasks/${taskId}`).send(updateData)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('status', updateData.status)
        expect(response.body).toHaveProperty('priority', updateData.priority)
        const updatedTask = await Task.findById(taskId)
        expect(updatedTask.status).toEqual(updateData.status)
        expect(updatedTask.priority).toEqual(updateData.priority)

    })

})




afterAll(async () => {
/*  await Board.deleteMany({})
    await User.deleteMany({})
    await Task.deleteMany({}) */
    await mongoose.connection.close()
})