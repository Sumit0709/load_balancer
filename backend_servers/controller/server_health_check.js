const { json } = require("express");

const server_health_check = async(req, res) => {
    return res.status(200).json({
        message: `Server is healthy`
    })
}

module.exports = server_health_check;