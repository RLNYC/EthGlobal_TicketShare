const TicketEvent = artifacts.require("TicketEvent");

module.exports = function(deployer){
    deployer.deploy(TicketEvent);
};