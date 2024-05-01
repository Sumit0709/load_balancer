const fs = require('fs');
const path = require('path');

const Queue = require('../helper/Queue')

class RequestList{
    constructor(){
        this.requests = new Queue();
    }

    insert_new_request(request){
        this.requests.push(request);
    }

    process_requests(){
        const old_requests = this.requests;
        this.requests = new Queue();
        const logFilePath = path.join(__dirname, 'server_log.log');

        // console.log("\nLOGGING REQUEST DATA -- ");
        while(!old_requests.isEmpty()){
            const req = old_requests.pop();

            const start_time = req.get_start_time();
            const end_time = req.get_end_time();
            const time_taken = end_time - start_time;
            const server_address = req.get_server_address();
            const timestamp = new Date().toISOString();
            const path = req.get_path()
            const status = req.get_response_status();

            if(end_time == ""){
                this.requests.push(req);
            }else{
                const data = `[${timestamp}],${server_address} ${status},${time_taken},${path}\n`;
                // console.log(data);
                fs.appendFile(logFilePath, data, (err) => {
                    if (err) {
                        console.error('Error writing to log file:', err);
                    }
                });
            }

        }
        console.log(" -- LOGGING COMPLETED\n");
    }
    
}


class Singleton {

    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new RequestList();
        }
    }

    getInstance() {
        return Singleton.instance;
    }

}

const singleton_object = new Singleton();
const request_list_obj = singleton_object.getInstance();


module.exports = request_list_obj