const Task = require('../models/Task');
const TaskData = require('../models/TaskData');

const addTask = async(req, res) => {
    const { userID, taskName } = req.body;

    if (!userID || !taskName) {
        return res.status(400).json({ message: 'userID and taskName are required' });
    }

    try{
        const newTask = new Task({ userID, taskName });
        await newTask.save();
        res.status(201).json({ message: 'Task created successfully' });
    }
    catch(error){
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteTask = async (req, res) => {
    const {taskID} = req.body;

    if (!taskID) {
        return res.status(400).json({ message: 'taskID is required' });
    }

    try{
        const result = await Task.deleteOne({_id : taskID});

        if(result.deletedCount === 0){
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({message: 'Task deleted successfully'});
    }
    catch(error){
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateTask = async(req, res) =>{
    const { taskID, taskName } = req.body;

    if (!taskID ||!taskName) {
        return res.status(400).json({ message: 'taskID and taskName are required' });
    }

    try{
        const result = await Task.updateOne({_id: taskID}, {$set: {taskName}});

        if(result.matchedCount === 0){
            return res.status(404).json({ message: 'Task not found' });
        }
        
        if(result.modifiedCount === 0){
            return res.status(200).json({ message: 'Task already has the same name' });
        }

        res.status(200).json({ message: 'Task updated successfully' });
    }
    catch(error){
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getUserTasks = async (req, res) => {
    const {userID} = req.body;

    if (!userID) {
        return res.status(400).json({ message: 'userID is required' });
    }

    try{
        const tasks = await Task.find({userID: userID}, {_id: 1, taskName: 1});
        res.status(200).json(tasks);
    }
    catch(error){
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getUserTaskDetails = async (req, res) => {
    const {userID} = req.body;

    if (!userID) {
        return res.status(400).json({ message: 'userID is required' });
    }

    try{
        const tasks = await Task.find({userID: userID}, {_id: 1, taskName: 1});

        let taskDetails = [];
        for(const task of tasks){
            const taskData = await TaskData.find({taskID: task._id}, {date: 1, value: 1}).sort({date: 1});
            // task.taskData = taskData;
            taskDetails.push({taskID: task._id, taskName: task.taskName, taskData});

        }

        res.status(200).json({taskDetails});
    }
    catch(error){
        console.error("Error fetching tasks' details: ", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { addTask, deleteTask, updateTask, getUserTasks, getUserTaskDetails};