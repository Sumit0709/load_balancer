const random_selection_loadbalancer = require('../controller/server_selection_algo/RandomSelectionLoadBalancer')
const round_robin_loadbalancer = require('../controller/server_selection_algo/RoundRobinLoadBalancer')
const least_connection_loadbalancer = require('../controller/server_selection_algo/LeastConnectionLoadBalancer')

/*
    This class will create object for the desired load balancer class i.e. least-connection, round-robin or random-selection
    We will not create their object directly
    We will create object of this class to access the object of load balancer class
*/
class LoadBalancerFactory {

    createLoadBalancer(lb_type){

        switch(lb_type){
            case "random-selection": {
                return random_selection_loadbalancer
            }
            case "round-robin": {
                return round_robin_loadbalancer
            }
            case "least-connection": {
                return least_connection_loadbalancer
            }
            default: {
                return random_selection_loadbalancer
            }
        }
    }
}

module.exports = LoadBalancerFactory;