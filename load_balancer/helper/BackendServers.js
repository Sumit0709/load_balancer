const CONSTANTS = require("../CONSTANTS");

/* 
    This is a Singleton implementation of BackendServer Class 
    Only one instance is created so that we can have all available and healthy server at one place and which can be updated to reflect changes
*/
class BackendServer{
    constructor(){
        this.backend_servers = CONSTANTS.all_backend_servers;
        this.healthy_servers = new Set();
        this.request_served_count = new Map();
        this.initialise_request_served_count();
    }

    get_healthy_server_list(){
        return this.healthy_servers;
    }

    get_all_server_list(){
        return this.backend_servers;
    }
    
    add_healthy_server(server_address){
        this.healthy_servers.add(server_address); 
    }
    
    remove_unhealthy_server(server_address){
        this.healthy_servers.delete(server_address);
    }

    update_request_served_count(server_address){
        const old = this.request_served_count.get(server_address)
        this.request_served_count.set(server_address, old+1);
    }

    get_request_served_count(){
        return this.request_served_count;
    }

    initialise_request_served_count(){
        for(const server_address of this.backend_servers){
            this.request_served_count.set(server_address,0);
        }
    }
}


class Singleton {

    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new BackendServer();
        }
    }

    getInstance() {
        return Singleton.instance;
    }

}

const singleton_object = new Singleton();
const backend_server_obj = singleton_object.getInstance();


module.exports = backend_server_obj