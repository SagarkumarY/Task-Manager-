const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middlewares/fetchuser');


// Routes: Add a new Task using POST "/api/tasks/addtask". Login required
router.post('/addtask', fetchuser, [
    body('task').notEmpty().withMessage('Task is required').isLength({ min: 5 })
], async (req, res) => {
    const { task } = req.body;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newTask = new Task({ task, user: req.user.id });
        const savedTask = await newTask.save();
        res.json(savedTask);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server error');
    }
});



// Router:2  fetch all task using : Get "/api/tasks/fetchalltasks" . Login required

router.get('/fetchalltasks', fetchuser, async (req, res) => {
    try {
        // Find tasks associated with the authenticated user
        const tasks = await Task.find({ user: req.user.id });

        res.json(tasks);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server error');
    }
});




// Router:3 Update an existing Task using PUT "/api/tasks/updatetask/:taskId". Login required
router.put('/updatetask/:taskId', fetchuser, async (req, res) => {
    const { taskId } = req.params;
    const { task } = req.body;

    try {
        // Find the task by its unique identifier (e.g., taskId)
        const taskToUpdate = await Task.findById(taskId);

        if (!taskToUpdate) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if the authenticated user is the owner of the task
        if (taskToUpdate.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        // Update the task properties as needed
        if (task) {
            taskToUpdate.task = task;
        }

        const updatedTask = await taskToUpdate.save();
        res.json(updatedTask);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server error');
    }
});



// Router:4  Delete a Task using DELETE "/api/tasks/deletetask/:taskId". Login required
router.delete('/deletetask/:taskId', fetchuser, async (req, res) => {
    const { taskId } = req.params;

    try {
        // Find the task by its unique identifier (e.g., taskId)
        const taskToDelete = await Task.findById(taskId);

        if (!taskToDelete) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if the authenticated user is the owner of the task
        if (taskToDelete.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        // Delete the task using deleteOne()
        await Task.deleteOne({ _id: taskToDelete._id })

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server error');
    }
});









module.exports = router;
