class response {
    static helper(res, isSuccess, message, data, status) {
        return res.status(status).send({
            statusCode: status,
            message,
            data,
        });
    }

    static notFound(req, res, next) {
        return res.status(404).send();
    }
}



module.exports = {
    response,
};