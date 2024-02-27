const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.set('strictQuery',false)

const BoardSchema= new mongoose.Schema({
    boardName: { minlength: 3, type:String, required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tasks:[
        { type: Schema.Types.ObjectId, ref: 'Task' }
    ]
})

BoardSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Board', BoardSchema)

