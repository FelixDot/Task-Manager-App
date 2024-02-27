const Board = require('../models/board')
const User = require('../models/user')

const initalUser=[{

    _id:'65ce1f7583dfba3842ff4050',
    username:'root',
    passwordHash:'$2b$10$G/x4piCoFypOiKmuylSGquFa5zRwtEJ0lbJcTMdTNG6K4cCNAZEla',
    boards:['65ce1f7583dfba3842ff4056'],
    __v:1
}]
const initalBoards=[
    {
        _id:'65ce1f7583dfba3842ff4056',
        boardName:'default Board',
        user:'65ce1f7583dfba3842ff4050',
        tasks:[
            '65ce1f7583dfba3842ff405b',
        ],
        __v:1
    }
]
const initalTasks=[
    {
        _id:'65ce1f7583dfba3842ff405b',
        taskName:'Test Task',
        taskDescription:'This is a test task',
        status:'Backlog',
        priority:'Medium',
        labels:[
            'test'
        ],
        board:'65ce1f7583dfba3842ff4056',
        createdAt:'2024-02-15T14:28:05.753+00:00',
        __v:0
    }
]
const boardsInDb = async() => {
    const board = await Board.find({})
    return board.map(b => b.toJSON())
}
const usersInDb = async() => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    boardsInDb,
    usersInDb,
    initalBoards,
    initalTasks,
    initalUser
}