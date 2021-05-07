import React,{ useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Main({ ticketEventBlockchain, ticketEventCount }) {
    const [ticketEvents, setTicketEvents] = useState([]);

    useEffect(() => {
        const getTicketEvents = async () => {
            let temp = [];

            for(let i = 0; i < ticketEventCount; i++){
                const event = await ticketEventBlockchain.methods.tickets(i + 1).call();
                temp.push(event);
            }

            setTicketEvents(temp);
        }
        if(ticketEventBlockchain) getTicketEvents();
    }, [ticketEventBlockchain, ticketEventCount])

    console.log(ticketEvents)
    
    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>List of Events</h1>
                <Link to="/eventregistration" className="btn btn-primary btn-lg my-3">
                    Register Event
                </Link>
            </div>
           

            { ticketEvents.map(ticketEvent => (
                <div className="card" key={ticketEvent.eventId}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-6" >
                                <h2><Link to={`/event/${ticketEvent.eventId}`}>{ticketEvent.name}</Link></h2>
                                <p>{ticketEvent.date} {ticketEvent.time}</p>
                                <p>{ticketEvent.location}</p>
                                <p>{window.web3.utils.fromWei(ticketEvent.ticketPrice, 'ether')} ETH</p>
                            </div>
                            <div className="col-sm-6 d-flex flex-column align-items-end">
                                <button className="btn btn-primary btn-lg mt-4 mb-2">
                                    Promotion Reward Tally
                                </button>
                                <Link className="btn btn-secondary btn-lg" to={`/event/${ticketEvent.eventId}`}>
                                    Earn Promotion Reward
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Main;
