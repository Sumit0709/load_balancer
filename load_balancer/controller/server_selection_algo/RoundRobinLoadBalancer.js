const backend_servers = require('../../helper/BackendServers');
const Queue = require('../../helper/Queue');
const LoadBalancer = require('./LoadBalancer');

const all_backend_servers = backend_servers.get_all_server_list();

/**
 * Singleton implementation of RoundRobinLoadBalancer Class
 */
class RoundRobinLoadBalancer extends LoadBalancer{
    constructor(){
        super();
        this.healthy_servers = new Set();
        this.rr_servers = new Queue(all_backend_servers);
    }

    get_next_available_server(){
        // console.log(this.rr_servers);
        const available_servers = backend_servers.get_healthy_server_list();

        let count = all_backend_servers.length;

        // making sure that the selected server is healthy
        while(count>0){
            const current_server_address = this.rr_servers.pop_push();
            if(available_servers.has(current_server_address)){
                return current_server_address;
            }
            count--;
        }
        
        return null;
    }
    
}


class Singleton {

    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new RoundRobinLoadBalancer();
        }
    }

    getInstance() {
        return Singleton.instance;
    }

}

const singleton_object = new Singleton();
const round_robin_loadbalancer = singleton_object.getInstance();


module.exports = round_robin_loadbalancer