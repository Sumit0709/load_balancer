const backend_servers = require('../../helper/BackendServers');
const LoadBalancer = require('./LoadBalancer');

class RandomSelectionLoadBalancer extends LoadBalancer{
    constructor(){
        super()
        this.healthy_servers = new Set();
    }

    get_next_available_server(){
        const available_servers = backend_servers.get_healthy_server_list();
        const available_servers_list = Array.from(available_servers);

        const random =  Math.floor(Math.random() * available_servers_list.length);
        const current_server_address = available_servers_list[random];
        
        return current_server_address;
    }
    
}


class Singleton {

    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new RandomSelectionLoadBalancer();
        }
    }

    getInstance() {
        return Singleton.instance;
    }

}

const singleton_object = new Singleton();
const random_selection_loadbalancer = singleton_object.getInstance();


module.exports = random_selection_loadbalancer