
// Return 200 when a request reaches here which signifies that server is running.
const server_health_check = async(req, res) => {
    return res.status(200).json({
        message: `Server is healthy`
    })
}

module.exports = server_health_check;