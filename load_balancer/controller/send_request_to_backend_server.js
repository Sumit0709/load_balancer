const fetch = require('node-fetch')
const url = require('url');

const backend_servers = require('../helper/BackendServers')
const Request = require('../helper/Request')
const request_list_obj = require('../stats/RequestList');
const LoadBalancerFactory = require('../helper/LoadBalancerFactory');

const send_request_to_backend_server = async (req, res) => {

    const backend_server_address = req.backend_server_address;

    // These load balancer objects are used to process the start and end of request. Some load balancer algo might want to perform certain activity when a request start and end (ex least connection algorithm)
    const lb_factory = new LoadBalancerFactory();
    const load_balancer_obj = lb_factory.createLoadBalancer(req.lb_type);

    // Request object is created to store requests related information for statistics purpose
    const request_obj = new Request(req.request_id, backend_server_address);
    request_list_obj.insert_new_request(request_obj);

    try{
        request_obj.start_request();
        load_balancer_obj.start_request(backend_server_address);

        const original_url_string = req.originalUrl;
        const parsedUrl = url.parse(original_url_string);
        const url_path = parsedUrl.path;

        // The path requested by user
        request_obj.set_path(url_path);

        // Sending request to the target backend server
        const response = await fetch(`${backend_server_address}${url_path}`, {
            method: req.method, 
            headers: req.headers
        });

        // extracting meaningful data from response and sending it back to the user
        const response_body = await response.text();
        const response_headers = response.headers;
        const content_type = response_headers.get('content-type');

        request_obj.end_request(response.status);
        load_balancer_obj.end_request(backend_server_address);

        await res.set('Content-Type', content_type);
        return res.send(response_body);

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