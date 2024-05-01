const fs = require('fs');
const path = require('path');

const Queue = require('../helper/Queue');
const read_log_file = require('./read_log_file');

class RequestList{
    constructor(){
        // using queue here, because it will work in O(1) time (Queue is implemented using Linked List)
        this.requests = new Queue(); 
    }

    // push into queue whenever a new request is being handled
    insert_new_request(request){
        this.requests.push(request);
    }

    // This method is called periodically to store request related data into the log file
    process_requests(){
        const old_requests = this.requests;
        this.requests = new Queue();
        const logFilePath = path.join(__dirname, 'request_list_log.log');
        
        while(!old_requests.isEmpty()){
            const req = old_requests.pop();

            const start_time = req.get_start_time();
            const end_time = req.get_end_time();
            const time_taken = end_time - start_time;
            const server_address = req.get_server_address();
            const timestamp = new Date().toISOString();
            const path = req.get_path()
            const status = req.get_response_status();

            // Only processing those requests that are completed, incomplete requests are being pushed back into the queue
            if(end_time == ""){
                this.requests.push(req);
            }else{
                const data = `[${timestamp}],${server_address},${status},${time_taken},${path}\n`;
                // console.log(data);
                fs.appendFile(logFilePath, data, (err) => {
                    if (err) {
                        console.error('Error writing to log file:', err);
                    }
                });
            }

        }

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

// Singleton implementation of RequestList Class. Only one instance will be created throughout the lifecycle of the process
const singleton_object = new Singleton();
const request_list_obj = singleton_object.getInstance();


module.exports = request_list_obj