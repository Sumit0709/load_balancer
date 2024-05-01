# Load Balancer

This project implements a load balancer and gives user freedom to choose the type of load balancing algorithm they want to implement. It is written in Javascript using NodeJS

## Description

The load balancer distributes incoming requests across multiple server instances to ensure optimal performance and reliability. It helps in scaling the application horizontally by adding more server instances as the load increases.



## Features

- *Singleton Design Pattern*: The load balancer utilizes the singleton design pattern to ensure that only one instance of the load balancer is created throughout the application's lifecycle. This helps in maintaining a single point of control for load balancing operations.
- Flexibility to choose from multiple load balancing algorithms like random-selection, round-robin, least-connection
- Up to date healthy servers list to avoid connection failure
- Proper logging of data related to incoming request, processing that data to generate meaningful information

## Load Balancing Algorithms

- *Random Selection*: Requests are distributed randomly across available servers, providing a simple and efficient load balancing strategy.
- *Round Robin*: Requests are distributed sequentially to each server in a circular manner, ensuring fair distribution of traffic among all servers.
- *Least Connection Count*: Requests are directed to the server with the least number of active connections, aiming to evenly distribute the load based on server capacity.

## Statistics
- Total Requests Handled: 50k
- Number of backend servers running: 5 Server Instance 
- Processing time of request on the backend server is upto 10,000 ms (10 sec.)

### Random Selection Algorithm
- Number of requests handled by each server 
    Server 1: 8576      ->      17.14%   
    Server 2: 10308     ->      20.61%
    Server 3: 10047     ->      20.1%
    Server 4: 10739     ->      21.5%
    Server 5: 10322     ->      20.64%

- Server processing time
    Server 1: 52293973  ->      Average = 6097.7 ms
    Server 2: 52651024  ->      Average = 5107.8 ms
    Server 3: 55258060  ->      Average = 5499.9 ms
    Server 4: 51279501  ->      Average = 4775.1 ms
    Server 5: 44041313  ->      Average = 4266.7 ms

Number of connections lost  -> 8
Average Response time       -> 5148 ms

### Round Robin Algorithm
- Number of requests handled by each server 
    Server 1: 10136     ->      20.27%
    Server 2: 10136     ->      20.27%
    Server 3: 10136     ->      20.27%
    Server 4: 10048     ->      20.09%
    Server 5: 9540      ->      19.08%

- Server processing time
    Server 1: 51548742  
    Server 2: 51658970  
    Server 3: 51578948  
    Server 4: 48444518  
    Server 5: 51576662  

Number of connections lost  -> 4
Average Response time       -> 5096 ms

### Least Connection Count Algorithm
- Number of requests handled by each server 
    Server 1: 10030     ->      20.06%     
    Server 2: 9995      ->      19.99%
    Server 3: 10055     ->      20.11% 
    Server 4: 9787      ->      19.57%
    Server 5: 10119     ->      20.24% 

- Server processing time
    Server 1: 51586362 ms
    Server 2: 50984690 ms
    Server 3: 51242037 ms
    Server 4: 49673152 ms
    Server 5: 51227276 ms

Number of connections lost  -> 14
Average Response time       -> 5095 ms

Number of connections lost is highest in Least Connection Count Algorithm because it has to do more work to select the next server to process incoming request.

## Installation

1. Clone the repository: git clone https://github.com/Sumit0709/load_balancer.git
2. Open 3 terminals: One for each backend_servers, client_simulator and load_balancer
3. Install dependencies: npm install
4. Run: npm start

### Customisation

- In each project, there is a CONSTANTS.js file, which contains all the variables
- We can update their values to see changes. 
- UPDATE BACKEND SERVER ADDRESS - In load_balancer's CONSTANTS.js file we can update all_backend_servers value to add our own list of servers.
- UPDATE LOAD BALANCING ALGORITHM - In load_balancer's CONSTANTS.js file we can update load_balancing_algorithm_type's value to change the algorithm (Possible values - 'random-selection', 'round-robin', 'least-connection'). If nothing is specified, then 'random-selection' will be used.



## Bugs 
- When load balancing algorith is 'least-connection' then the server is unavailable for first 10 seconds. It is because the lc_server variable containing a map (server_address, no_of_connections) of healthy server is not initialised (as healthy server's list is empty when server starts)