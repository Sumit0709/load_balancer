const fetch = require('node-fetch')
const backend_servers = require('./BackendServers')

const update_healthy_servers = async () => {

    // const backend_servers = new BS().getInstance();

    const all_servers = backend_servers.get_all_server_list();

    all_servers.forEach(async (server_address) => {
        try{
            const backend_server_res = await fetch(`${server_address}/health-check`);
            // const res_data = await backend_server_res.json();
            const healthy_server_list = backend_servers.get_healthy_server_list();
            if(backend_server_res.status == 200){
                if(!healthy_server_list.has(server_address)){
                    backend_servers.add_healthy_server(server_address);
                }
            }
            else{
                if(healthy_server_list.has(server_address)){
                    backend_servers.remove_unhealthy_server(server_address);
                }
            }
        }
        catch(err){
            const healthy_server_list = backend_servers.get_healthy_server_list();
            if(healthy_server_list.has(server_address)){
                backend_servers.remove_unhealthy_server(server_address);
            }
        }
        
    })

    // console.log(`healthy_servers is up to date`)
    // console.log(backend_servers.get_healthy_server_list());
}

module.exports = update_healthy_servers