const { response } = require('../helpers/response.helper.js');
const constants = require('../config/constants.js');

const bodyValidator = (Schema) => {

    return async (req, res, next) => {

        const validate = await Schema.validate(req.body);

        let message = '';
        if (validate.error) {
            message = validate.error.details[0].message;
            message = message.replace(/"/g, '');
            return response.helper(res, false, message, {}, constants.responseStatus.BAD_REQUEST);
        }
        next();
    };
};






module.exports = {
    bodyValidator,

};


