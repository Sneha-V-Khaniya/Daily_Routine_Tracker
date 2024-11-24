const express = require('express');
const { addTask, deleteTask, updateTask, getUserTasks, getUserTaskDetails } = require('../controllers/taskControllers');

const router = express.Router();

router.post('/', addTask);
router.delete('/', deleteTask);
router.patch('/', updateTask);
router.post('/all', getUserTasks);
router.post('/details', getUserTaskDetails);

module.exports = router;