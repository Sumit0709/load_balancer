const express = require('express');
const send_request_to_backend_server = require('../controller/send_request_to_backend_server');
const get_available_server_address = require('../controller/get_available_server_address');
const get_request_served_count = require('../controller/get_request_served_count');
const get_server_process_time = require('../controller/get_server_process_time');


const router = express.Router();

router.get('/stats/server-count', get_request_served_count)
router.get('/stats/server-time', get_server_process_time)
router.get('/*', get_available_server_address, send_request_to_backend_server)

module.exports = router;