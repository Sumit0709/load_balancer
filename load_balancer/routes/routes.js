const express = require('express');
const send_request_to_backend_server = require('../controller/send_request_to_backend_server');
const get_available_server_address = require('../controller/get_available_server_address');


const router = express.Router();

router.get('/*', get_available_server_address, send_request_to_backend_server)

module.exports = router;