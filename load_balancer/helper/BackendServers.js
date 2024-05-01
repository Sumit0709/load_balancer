const CONSTANTS = require("../CONSTANTS");

class BackendServer{
    constructor(){
        this.backend_servers = CONSTANTS.all_backend_servers;
        // ['http://localhost:8000', 'http://localhost:8001', 'http://localhost:8002', 'http://localhost:8003', 'http://localhost:8004']
        this.healthy_servers = new Set();
    }

    get_healthy_server_list(){
        // console.log(this.healthy_servers)
        return this.healthy_servers;
    }

    get_all_server_list(){
        return this.backend_servers;
    }
    
    add_healthy_server(server_address){
        // console.log("HEALTHY :: ", server_address)
        this.healthy_servers.add(server_address); 
    }
    
    remove_unhealthy_server(server_address){
        this.healthy_servers.delete(server_address);
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