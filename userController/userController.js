const User = require('../models/user.model.js');
const Task = require('../models/task.model.js');
const constants = require('../config/constants.js');
const responseMessage = require('../config/messages/en.js');
const { response } = require('../helpers/response.helper.js');


module.exports =
{
    usercreateAccount: async (req, res, next) => {
        try {
            const { name, email } = req.body;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValidEmail = emailRegex.test(email);
            if (isValidEmail == true) {
                var checkaccount = await User.findOne({ email: email }).exec();
                if (checkaccount) {
                    response.helper(res, false, responseMessage.DEVICE_EXIST, req.body, constants.responseStatus.SUCCESS);
                } else {
                    var data = {
                        name: name,
                        email: email

                    }
                    var createUser = await User.create(data);
                    response.helper(res, false, responseMessage.SIGN_UP_SUCCESS, { User_id: createUser._id }, constants.responseStatus.SUCCESS);

                }
            } else {
                response.helper(res, false, responseMessage.INVALID_EMAIL, {}, constants.responseStatus.BAD_REQUEST);

            }

        } catch (ex) {
            console.error("exception while creating account", ex);
            return response.helper(res, false, responseMessage.TRY_AGAIN, {}, constants.responseStatus.INTERNAL_SERVER_ERROR);
        }

    },
    addTask: async (req, res, next) => {
        try {
            const { user_id, subject, status, deadline } = req.body;
            let validuser = await User.findById(user_id).exec();
            if (validuser) {
                const taskData = await Task.find({ user: validuser._id, subject: subject }).exec();

                if (taskData.length === 0) {
                    var data = {
                        user: validuser._id,
                        subject: subject,
                        status: status,
                        deadline: deadline

                    }

                    const task = await Task.create(data)
                    response.helper(res, false, responseMessage.Task_Create, task, constants.responseStatus.SUCCESS);
                } else {
                    response.helper(res, false, responseMessage.TASK_SUBJECT_EXIST, {}, constants.responseStatus.BAD_REQUEST);

                }


            } else {
                response.helper(res, false, responseMessage.USER_NOT_EXIST, {}, constants.responseStatus.BAD_REQUEST);

            }
        } catch (ex) {
            console.error("exception while creating account", ex);
            return response.helper(res, false, responseMessage.TRY_AGAIN, {}, constants.responseStatus.INTERNAL_SERVER_ERROR);
        }

    },
    updateTask: async (req, res, next) => {
        try {
            const task_id = req.params.taskId;
            const { subject, status, deadline } = req.body;
            const validtask = await Task.findOne({ _id: task_id, deleted: false }).exec();
            if (validtask) {
                var date = new Date()
                var data = {
                    subject: subject,
                    deadline: deadline,
                    status: status,
                    updatedAt: date
                }
                const updatedTask = await Task.findByIdAndUpdate(validtask._id, { $set: data }, { new: true }).exec();
                response.helper(res, false, responseMessage.Task_Updated, updatedTask, constants.responseStatus.SUCCESS);

            } else {
                response.helper(res, false, responseMessage.Task_Not_Exist, {}, constants.responseStatus.BAD_REQUEST);

            }
        } catch (ex) {
            console.error("exception while creating account", ex);
            return response.helper(res, false, responseMessage.TRY_AGAIN, {}, constants.responseStatus.INTERNAL_SERVER_ERROR);
        }
    },
    deleteTask: async (req, res, next) => {
        try {
            const task_id = req.params.taskId;
            const validtask = await Task.findOne({ _id: task_id, deleted: false }).exec();
            if (validtask) {
                var date = new Date()
                await Task.findByIdAndUpdate(validtask._id, { $set: { deleted: true, updatedAt: date } }, { new: true }).exec();
                response.helper(res, false, responseMessage.DELETE_Task, {}, constants.responseStatus.SUCCESS);

            } else {
                response.helper(res, false, responseMessage.Task_Not_Exist, {}, constants.responseStatus.BAD_REQUEST);

            }
        } catch (ex) {
            console.error("exception while creating account", ex);
            return response.helper(res, false, responseMessage.TRY_AGAIN, {}, constants.responseStatus.INTERNAL_SERVER_ERROR);
        }
    },
    addSubtask: async (req, res, next) => {
        try {
            const task_id = req.params.taskId;
            const { subject, deadline, status } = req.body;
            const validtask = await Task.findOne({ _id: task_id, deleted: false }).exec();
            if (validtask) {
                var data = {
                    subject: subject,
                    deadline: deadline,
                    status: status
                }
                validtask.subtasks.push(data);
                await validtask.save();
                response.helper(res, false, responseMessage.Sub_Task_Add, {}, constants.responseStatus.SUCCESS);

            } else {
                response.helper(res, false, responseMessage.Task_Not_Exist, {}, constants.responseStatus.BAD_REQUEST);

            }
        } catch (ex) {
            console.error("exception while creating account", ex);
            return response.helper(res, false, responseMessage.TRY_AGAIN, {}, constants.responseStatus.INTERNAL_SERVER_ERROR);
        }

    },


    subtasksList: async (req, res, next) => {
        try {
            const task_id = req.params.taskId;

            const validtask = await Task.findById(task_id);
            if (!validtask) {
                return response.helper(res, false, responseMessage.Task_Not_Exist, {}, constants.responseStatus.BAD_REQUEST);
            }

            if (validtask.subtasks.length === 0) {
                return response.helper(res, false, responseMessage.Subtask_Not_Exist, {}, constants.responseStatus.BAD_REQUEST);
            }

            const subTasksList = [];
            for (let i = 0; i < validtask.subtasks.length; i++) {
                const subTask = validtask.subtasks[i];
                if (!subTask.deleted) {
                    subTasksList.push({
                        subTasks_id: subTask._id,
                        subject: subTask.subject,
                        deadline: subTask.deadline,
                        status: subTask.status,
                        deleted: subTask.deleted
                    });
                }
            }

            return response.helper(res, true, responseMessage.SUBTASK_LIST, subTasksList, constants.responseStatus.SUCCESS);
        } catch (error) {
            console.error('Error fetching subtasks:', error);
            return response.helper(res, false, 'An error occurred', {}, constants.responseStatus.INTERNAL_SERVER_ERROR);
        }
    },
    tasksList: async (req, res, next) => {
        try {
            const { user_id } = req.body;
            const validUser = await User.findById(user_id).exec();
            if (validUser) {
                const validTask = await Task.find({ user: validUser._id, deleted: false }).exec();


                if (validTask) {
                    const tasks = await Task.aggregate([
                        { $match: { user: validUser._id, deleted: false } },
                        {
                            $project: {
                                user: 1,
                                subject: 1,
                                status: 1,
                                deadline: 1,
                                deleted: 1,
                                subtasks: {
                                    $filter: {
                                        input: "$subtasks",
                                        as: "subtask",
                                        cond: { $eq: ["$$subtask.deleted", false] }
                                    }
                                },
                                createdAt: 1,
                                updatedAt: 1,
                                __v: 1
                            }
                        }
                    ]).exec();
                    response.helper(res, false, responseMessage.TASK_SUBTASKLIST, tasks, constants.responseStatus.BAD_REQUEST);

                } else {
                    response.helper(res, false, responseMessage.Task_Not_Exist, {}, constants.responseStatus.BAD_REQUEST);

                }
            } else {
                response.helper(res, false, responseMessage.USER_NOT_EXIST, {}, constants.responseStatus.BAD_REQUEST);

            }
        } catch (ex) {
            console.error("exception while creating account", ex);
            return response.helper(res, false, responseMessage.TRY_AGAIN, {}, constants.responseStatus.INTERNAL_SERVER_ERROR);
        }
    },

    updateSubTask: async (req, res, next) => {
        try {
            const task_id = req.params.taskId;
            const { subtasks } = req.body;
            const validtask = await Task.findOne({ _id: task_id, deleted: false }).exec();
            if (validtask) {
                let subTaskUpdate = await Task.findOneAndUpdate({ _id: validtask._id }, { $set: { subtasks: subtasks } }, { new: true }).exec();
                return response.helper(res, false, responseMessage.SUBTask_Updated, subTaskUpdate, constants.responseStatus.BAD_REQUEST);

            } else {
                return response.helper(res, false, responseMessage.Task_Not_Exist, {}, constants.responseStatus.BAD_REQUEST);

            }
        } catch (ex) {
            console.error("exception while creating account", ex);
            return response.helper(res, false, responseMessage.TRY_AGAIN, {}, constants.responseStatus.INTERNAL_SERVER_ERROR);
        }
    },


}