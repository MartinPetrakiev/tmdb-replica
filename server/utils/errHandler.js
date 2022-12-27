function errorHandler(err, req, res, next) {
    if (err.status === 333) {
        res.status(333)
            .json({ error: { message: 'ErrorHandler: not allowed!', err } })
    } else if (err.status == 409) {
        res.status(409)
            .json({ error: { message: err.message } });
    } else if (err.status == 401) {
        res.status(401)
            .json({ error: { message: err.message } });
    } else {
        console.error(err.stack)
        // console.log(err)
        res.status(500)
            .json({ error: { message: 'ErrorHandler: Something went wrong!', err } })
    }
}

module.exports = errorHandler;
