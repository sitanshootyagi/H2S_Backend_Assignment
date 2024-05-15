const Joi = require('joi');

const createAccountRequest = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),

})

const addTaskRequest = Joi.object({
    user_id: Joi.string().required(),
    subject: Joi.string().required(),
    status: Joi.string().required(),
    deadline: Joi.string().required(),


})
const updatetaskRequest = Joi.object({
    subject: Joi.string().required(),
    status: Joi.string().required(),
    deadline: Joi.string().required(),


})
const subTreateRequest = Joi.object({
    subject: Joi.string().required(),
    deadline: Joi.string().required(),
    status: Joi.string().required(),


})

const tasklistRequest = Joi.object({
    user_id: Joi.string().required(),



})



module.exports = {
    createAccountRequest,
    addTaskRequest,
    updatetaskRequest,
    tasklistRequest,
    subTreateRequest,

};








