const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

//login and create token
loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }


    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
    )

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})


loginRouter.get('/checkTokenValidity', async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '')

    try {
        jwt.verify(token, process.env.SECRET)

        res.status(200).send('Token is valid')
    } catch (error) {
        res.status(401).send('Invalid token')
    }
})
module.exports = loginRouter