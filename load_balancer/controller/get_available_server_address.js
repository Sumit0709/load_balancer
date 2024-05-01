const LoadBalancerFactory = require("../helper/LoadBalancerFactory");

const get_available_server_address = async (req, res, next) => {
    const lb_type = req.lb_type;

    // create an object of LoadBalancerFactory to access object of desired load balancer class
    const lb_factory = new LoadBalancerFactory();
    const load_balancer_obj = lb_factory.createLoadBalancer(lb_type);

    // calling get_next_available_server() method to get the next server address based on the chosen load balancing algorithm
    const available_server_address = load_balancer_obj.get_next_available_server();

    if(available_server_address==null || available_server_address==undefined){
        console.log("No server available! ", available_server_address);
        return res.status(503).json({
            success: false,
            error:"No server available!"
        })
    }

    req.backend_server_address = available_server_address;
    next();
}

module.exports = get_available_server_address;