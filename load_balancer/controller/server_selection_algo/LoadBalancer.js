const backend_servers = require('../../helper/BackendServers');

/**
 * Parent Class for every Load Balancer
 */
class LoadBalancer{
    constructor(){
    }

    // for every incoming request update the number of requests handled by each server
    start_request(server_address = ""){
        backend_servers.update_request_served_count(server_address);
    }

    end_request(server_address = ""){

    }
    
}

module.exports = LoadBalancer