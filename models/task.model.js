const mongoose = require('mongoose');
const Schema = mongoose.Schema

const subtaskSchema = new Schema({
    subject: {

        type: String,
        default: '',

    },
    deadline: {
        type: Date
    },
    status: {
        type: String,
        default: '',
    },
    deleted: {
        type: Boolean,
        default: false
    }
})

const Taskschema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    subject: {

        type: String,
        default: '',

    },
    status: {
        type: String,
        default: '',
    },
    deadline: {
        type: Date
    },
    deleted: {
        type: Boolean,
        default: false
    },
    subtasks: [subtaskSchema]
}, { timestamps: true, toJSON: true }

);




const Task = mongoose.model("Task", Taskschema, "Task")
module.exports = Task; 