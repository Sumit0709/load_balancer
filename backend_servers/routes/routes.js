const express = require('express');

const server_health_check = require('../controller/server_health_check');
const error_occured = require('../controller/error');
const server_response = require('../controller/server_response');

const router = express.Router();  

// this route is to check whether server is up or not. This is hit every few second to keep track of healthy servers
router.get('/health-check', server_health_check, error_occured)

router.get('/', server_response, error_occured)
router.get('/test', server_response, error_occured)

module.exports = router;