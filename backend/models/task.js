const mongoose = require('mongoose')
mongoose.set('strictQuery',false)

const TaskSchema = new mongoose.Schema({
    taskName: { minlength: 3, type:String, required: true,
    },
    taskDescription: String,
    status: { type: String, enum: ['Backlog', 'In Progress', 'In Review' ,'Completed'], default: 'Backlog' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default:'Low' },
    labels: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    board:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }
})

TaskSchema.virtual('formattedCreatedAt').get(function() {
    return this.createdAt.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    })
})

TaskSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Task', TaskSchema)
