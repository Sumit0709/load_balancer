
const error_occured = async(err, req, res, next) => {
    console.log("ERROR :: ", err.message);
    return res.status(500).json({
        success: false,
        error: err.message
    })

}

module.exports = error_occured;