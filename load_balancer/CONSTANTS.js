
module.exports = {
    all_backend_servers : ['http://localhost:8000', 'http://localhost:8001', 'http://localhost:8002', 'http://localhost:8003', 'http://localhost:8004'],
    healthy_servers: [],
    number_of_servers: 5,
    update_healthy_servers_interval: 10000,
    process_request_data_interval: 10000,
    PORT: 9000,
    load_balancing_algorithm_type: 'random-selection',
    internal_health_check_interval_for_least_connection_algo :10000,
    
}