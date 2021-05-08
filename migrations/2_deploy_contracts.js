const Token = artifacts.require("Token");
const TicketEvent = artifacts.require("TicketEvent");

module.exports = async function(deployer){
    await deployer.deploy(Token);
    const token = await Token.deployed();
    
    await deployer.deploy(TicketEvent, token.address);
    const ticketEvent = await TicketEvent.deployed();

    await token.passMinterRole(ticketEvent.address);
};