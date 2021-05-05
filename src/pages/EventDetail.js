import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function EventDetail({ ticketEventBlockchain }) {
    const { id } = useParams();
    const [ticketEvent, setTicketEvent] = useState({});

    useEffect(() => {
        const getTicketEvents = async () => {
            const event = await ticketEventBlockchain.methods.tickets(id).call();

            setTicketEvent(event);
        }
        if(ticketEventBlockchain) getTicketEvents();
    }, [ticketEventBlockchain, id])

    console.log(ticketEvent);

    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-sm-12 col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2>{ticketEvent?.name}</h2>
                            <p>{ticketEvent?.date}</p>
                            <p>{ticketEvent?.location}</p>
                            <p>{ticketEvent?.description}</p>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-4 d-flex flex-column align-items-end">
                    <button>Ticket Price: {ticketEvent.ticketPrice && window.web3.utils.fromWei(ticketEvent.ticketPrice, 'ether')} ETH</button>
                    <button className="btn btn-primary mb-4">
                        Purchase Ticket
                    </button>

                    <button className="btn btn-success">
                        Promote Event to earn reward tokens
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EventDetail;
