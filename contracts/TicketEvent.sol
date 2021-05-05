pragma solidity ^0.6.12;

contract TicketEvent {
    string public name = "Ticket Event";
    uint public ticketEventCount = 0;
    mapping(uint => Ticket) public tickets;

    struct Ticket {
        uint eventId;
        string name;
        string description;
        string date;
        string time;
        string location;
        uint ticketPrice;
        uint quantity;
        address payable owner;
    }

    event TicketCreated (
        uint eventId,
        string name,
        string description,
        string date,
        string time,
        string location,
        uint ticketPrice,
        uint quantity,
        address payable owner
    );

    constructor() public {}

    function createEvent(string memory _name, string memory _description, string memory _date, string memory _time, string memory _location, uint _ticketPrice, uint _quantity) public {
    ticketEventCount++;

    tickets[ticketEventCount] = Ticket(ticketEventCount, _name, _description, _date, _time, _location, _ticketPrice, _quantity, msg.sender);
    emit TicketCreated(ticketEventCount, _name, _description, _date, _time, _location, _ticketPrice, _quantity, msg.sender);
  }
}