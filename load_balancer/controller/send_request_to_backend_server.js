const fetch = require('node-fetch')
const url = require('url');

const backend_servers = require('../helper/BackendServers')
const Request = require('../helper/Request')
const request_list_obj = require('../stats/RequestList');
const LoadBalancerFactory = require('../helper/LoadBalancerFactory');

const send_request_to_backend_server = async (req, res) => {

    const backend_server_address = req.backend_server_address;

    // to process start and end of request
    const lb_factory = new LoadBalancerFactory();
    const load_balancer_obj = lb_factory.createLoadBalancer(req.lb_type);

    // to process requests for statistics purpose
    const request_obj = new Request(req.request_id, backend_server_address);
    request_list_obj.insert_new_request(request_obj);


    // const backend_servers = new BS().getInstance();
    // console.log(backend_server_address);

    try{
        request_obj.start_request();
        load_balancer_obj.start_request(backend_server_address);

        const original_url_string = req.originalUrl;
        const parsedUrl = url.parse(original_url_string);
        

        const url_path = parsedUrl.path;
        request_obj.set_path(url_path);
        // console.log("PATH = ", url_path);

        const response = await fetch(`${backend_server_address}${url_path}`, {
            method: req.method, 
            headers: req.headers
        });

        const responseBody = await response.text();
        // console.log(responseBody);

        // console.log(response.status);
        // res.json(responseBody);
        request_obj.end_request(response.status);
        load_balancer_obj.end_request(backend_server_address);

        return res.send(responseBody);

    }
    catch(err){
        console.log(err.message)
        request_obj.end_request(500);
        load_balancer_obj.end_request(backend_server_address);

        backend_servers.remove_unhealthy_server(backend_server_address);

        return res.status(500).json({
            success: false,
            error: 'Error in connecting to server!'
        })
    }

}

module.exports = send_request_to_backend_server;