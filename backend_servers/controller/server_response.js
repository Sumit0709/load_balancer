const CONSTANTS = require("../CONSTANTS");

const server_response = async(req, res) => {
    const max_server_processing_time = CONSTANTS.max_server_processing_time
    const random =  Math.floor(Math.random() * max_server_processing_time);

    // Intentionally postponing the response to simulate real-life scenarios.
    setTimeout(() => {
        return res.status(200).json({
            message: `Server is running on PORT :: ${req.PORT}`
        })
    }, random);
}

module.exports = server_response