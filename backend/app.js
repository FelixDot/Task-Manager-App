const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
app.use(middleware.tokenExtractor)
const usersRouter = require('./controllers/users')
const boardsRouter = require('./controllers/boards')
const tasksRouter = require('./controllers/tasks')
const loginRouter = require('./controllers/login')


const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })


app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/boards', middleware.userExtractor, boardsRouter)

app.use('/api/users', usersRouter)
app.use('/api/boards', boardsRouter)
app.use('/api/tasks', tasksRouter)
app.use('/api/login', loginRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app