const express = require('express');

const server_health_check = require('../controller/server_health_check');
const error_occured = require('../controller/error');
const server_response = require('../controller/server_response');

const router = express.Router();  


router.get('/health-check', server_health_check, error_occured)
router.get('/', server_response, error_occured)
router.get('/test', server_response, error_occured)

module.exports = router;