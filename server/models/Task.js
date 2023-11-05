const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    task: {
        type: String,
        require: true
    },

    date: {
        type: Date,
        default: Date.now
    }

})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;