export const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
        message: "error has already occurred",
        status:false,
        error: err.message
    })
}