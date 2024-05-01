const read_log_file = require("../stats/read_log_file");

const get_server_process_time = async (req, res, next) => {
    
    const data = await read_log_file();
    // console.log(data);
    return res.status(200).json({
        success: true,
        data: data
    })

}

module.exports = get_server_process_time;