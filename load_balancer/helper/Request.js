
/*
    Class to store information related to incoming requests
*/
class Request{
    constructor(id, server_address=""){
        this.id = id,
        this.start = "",
        this.end = "",
        this.path = "",
        this.server_address = server_address,
        this.request_status = "", // current status of request
        this.response_status = "" // status code received from a processesed request
    }

    start_request(){
        this.start = Date.now();
    }

    end_request(status=503){
        this.response_status = status
        this.end = Date.now();
    }

    set_path(path){
        this.path = path
    }

    set_request_status(status){
        this.request_status = status
    }

    set_response_status(status){
        this.response_status = status
    }

    get_start_time(){ return this.start}
    
    get_end_time(){ return this.end}

    get_path(){ return this.path}

    get_response_status(){ return this.response_status}

    get_request_status(){ return this.request_status}

    get_server_address(){ return this.server_address}
}

module.exports = Request;