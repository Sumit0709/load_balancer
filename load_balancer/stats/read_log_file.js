const fs = require('fs');
const path = require('path');

const read_log_file = () => {

    // Object to store total response times for each URL
    const responseTimes = {};
    const serverCount = {};

    // Regular expression pattern to extract relevant information
    const pattern = /\[(.*?)\],(.*?),(\d+),(\d+),(.*?)\n/g;

    // Read the log file
    const filePath = path.join(__dirname, './request_list_log.log');
    const fsData = fs.readFileSync(filePath, 'utf8')

    let match;
    while((match = pattern.exec(fsData)) !== null) {
        const timestamp = match[1];
        const server_address = match[2];
        const status_code = parseInt(match[3]);
        const response_time = parseInt(match[4]);
        const url_path = parseInt(match[5]);


        // Update total response time for the URL
        if (responseTimes[server_address]) {
            responseTimes[server_address] += response_time;
        } else {
            responseTimes[server_address] = response_time;
        }

        // if (serverCount[server_address]) {
        //     serverCount[server_address] += 1;
        // } else {
        //     serverCount[server_address] = 1;
        // }
        
    }
    return responseTimes;

}

module.exports = read_log_file;