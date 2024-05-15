
const { bodyValidator } = require('../middleware/validator.js');
const { Router } = require('express');
const { usercreateAccount, addTask, updateTask, deleteTask, addSubtask, subtasksList, tasksList, updateSubTask } = require('../userController/userController.js');
const { createAccountRequest, addTaskRequest, updatetaskRequest, tasklistRequest } = require('../validators/userValidator.js')

const router = Router();

router.post('/usercreateAccount', bodyValidator(createAccountRequest), usercreateAccount);
router.post('/tasks', bodyValidator(addTaskRequest), addTask);
router.put('/tasks/:taskId', bodyValidator(updatetaskRequest), updateTask);
router.delete('/tasks/:taskId', deleteTask);
router.put('/addSubtask/:taskId', addSubtask);
router.get('/tasks/:taskId/subtasks', subtasksList);
router.get('/tasks', bodyValidator(tasklistRequest), tasksList);
router.put('/tasks/:taskId/subtasks', updateSubTask);





module.exports = router;