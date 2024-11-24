const express = require('express');
const { upsertTaskData, deleteTaskData, getUserTaskData, getTaskData } = require('../controllers/taskDataControllers');

const router = express.Router();

router.post('/', upsertTaskData);
router.delete('/', deleteTaskData);
router.post('/all', getUserTaskData);
router.get('/:taskID', getTaskData)

module.exports = router;