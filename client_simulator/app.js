const fetch = require('node-fetch')
const CONSTANTS = require('./CONSTANTS');

const send_requests = async () => {
    const NUMBER_OF_REQUEST_TO_SEND = 50000;
    // CONSTANTS.NUMBER_OF_REQUEST_TO_SEND;

    for(let i=0; i<NUMBER_OF_REQUEST_TO_SEND; i++){
        send_one_request(i);
        await new Promise(resolve => setTimeout(resolve, 0));
    }
}

const send_one_request = async(i) => {
    try{
        console.log(`sending request number ${i}`)
        const load_balancer_address = CONSTANTS.loadBalancer_address;
        const response = await fetch(`${load_balancer_address}`, {
            method: "GET", 
            // headers: req.headers
        });

        console.log("Response received for ", i);
    }
    catch(err){
        console.log("ERROR IN SENDING REQUEST");
        console.log(err.message);
    }
}

send_requests();