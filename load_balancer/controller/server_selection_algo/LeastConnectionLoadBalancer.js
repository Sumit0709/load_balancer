const fs = require('fs');
const path = require('path');

const backend_servers = require('../../helper/BackendServers');
const LoadBalancer = require('./LoadBalancer');
const CONSTANTS = require('../../CONSTANTS');
/**
 * Singleton implementation of LeastConnectionLoadBalancer Class
 */
class LeastConnectionLoadBalancer extends LoadBalancer{
    constructor(){
        super();
        this.healthy_servers = [],
        this.lc_servers = new Map(), // {address, count}

        this.update_healthy_servers_list(),
        this.periodic_internal_health_check();
    }


    start_request(server_address){
        super.start_request(server_address);
        // updating number of request being handled by a server
        // adding request
        const new_request_count = this.lc_servers.get(server_address) + 1;
        this.lc_servers.set(server_address, new_request_count);
        
        // inserting number of requests being handled by each server into the log file
        // let data = '';
        // for (const [key, value] of this.lc_servers) {
        //     data += `${value},`;
        // }
        // data += "\n";

        // const logFilePath = path.join(__dirname+'../../../stats/', 'least_connection.log');
        // fs.appendFile(logFilePath, data, (err) => {
        //     if (err) {
        //         console.error('Error writing to log file:', err);
        //     }
        // });
    }

    end_request(server_address){
        // updating number of request being handled by a server
        // removing request
        const new_request_count = this.lc_servers.get(server_address) - 1;
        this.lc_servers.set(server_address, new_request_count);
    }

    get_next_available_server(){
        const current_server_address = this.get_min_connection_server();
        return current_server_address;
    }


    // Class specific functions

    periodic_internal_health_check(){
        setInterval(async () => {
            this.update_healthy_servers_list();
        }, CONSTANTS.internal_health_check_interval_for_least_connection_algo); // called every 10 sec
    
    }

    update_healthy_servers_list(){
        this.healthy_servers = backend_servers.get_healthy_server_list();
        let valid_lc_servers = this.lc_servers;

        // removing unhealthy servers
        for (const [key, value] of this.lc_servers) {
            if(!this.healthy_servers.has(key)){
                valid_lc_servers.delete(key);
            }
        }
        this.lc_servers = valid_lc_servers;

        // adding healthy servers
        for(const server_address of this.healthy_servers){
            if(!this.lc_servers.has(server_address)){
                this.lc_servers.set(server_address,0);
            }
        }
    }

    get_min_connection_server(){
        let count = 1e18;
        let server_address = null;

        for (const [key, value] of this.lc_servers) {
            if(value<count){
                count = value;
                server_address = key;
            }
        }
        return server_address;
    }
    
}


class Singleton {

    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new LeastConnectionLoadBalancer();
        }
    }

    getInstance() {
        return Singleton.instance;
    }

}

const singleton_object = new Singleton();
const least_connection_loadbalancer = singleton_object.getInstance();


module.exports = least_connection_loadbalancer