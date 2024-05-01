const backend_server_obj = require("../helper/BackendServers");

const get_request_served_count = async (req, res, next) => {
    
    const mp = backend_server_obj.get_request_served_count()
    // console.log(mp)
    let data = Object.fromEntries(mp);

    return res.status(200).json({
        success: true,
        data: data
    })

}

module.exports = get_request_served_count;