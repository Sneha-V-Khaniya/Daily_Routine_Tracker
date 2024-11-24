const Task = require('../models/Task');
const TaskData = require('../models/TaskData');

const upsertTaskData = async (req, res) => {
    const { taskID, value, date } = req.body;
    // const [day, month, year] = req.body.date.split('/'); // Split DD/MM/YYYY

    // Create a valid date string in YYYY-MM-DD format
    // const date = new Date(`${year}-${month}-${day}`);
    
    // if (isNaN(date.getTime())) {
    //     return res.status(400).json({ message: 'Invalid date format' });
    // }
    // console.log(taskID, value, date)
    try {
        const taskData = await TaskData.findOneAndUpdate(
            { taskID, date },
            { $set: { value } },
            { upsert: true, new: true }
        );

        res.status(200).json({ message: 'Task data added / updated successfully' });
    } 
    catch (error) {
        console.error('Error while adding/updating task data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteTaskData = async (req, res) => {
    const { taskDataID } = req.body;

    try {
        await TaskData.findByIdAndDelete(taskDataID);
        res.status(200).json({ message: 'Task data deleted successfully' });
    } 
    catch (error) {
        console.error('Error while deleting task data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getUserTaskData = async (req, res) => {
    const { userID } = req.body;

    try {
        const taskIDs = await Task.find({ userID }, { _id: 1 });
        const ids = taskIDs.map(task => task._id);

        const taskData = await TaskData.find({ taskID: { $in: ids } }, {_id: 1, taskID: 1, date: 1, value: 1});

        res.status(200).json(taskData);
    } 
    catch (error) {
        console.error('Error while getting user task data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getTaskData = async (req, res) => {
    const { taskID } = req.params;
    
    try{
        const task = await Task.findById(taskID, {_id: 1, taskName: 1});
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const taskData = await TaskData.find({ taskID: task._id }, { date: 1, value: 1 }).sort({ date: 1 });

        const taskDetail = {
            taskID: task._id,
            taskName: task.taskName,
            taskData,
        };

        res.status(200).json({taskDetail});
    }
    catch(error){
        console.error("Error fetching task's data: ", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { upsertTaskData, deleteTaskData, getUserTaskData, getTaskData };
