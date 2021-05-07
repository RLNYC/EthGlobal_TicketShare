import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function EventDetail({ ticketEventBlockchain, account }) {
    const { id, referLink, referer } = useParams();
    const [ticketEvent, setTicketEvent] = useState({});
    const [isReferer, setIsReferer] = useState(false);
    const [point, setPoint] = useState(0);

    useEffect(() => {
        const getTicketEvents = async () => {
            const event = await ticketEventBlockchain.methods.tickets(id).call();

            setTicketEvent(event);
        }

        const getUserReward = async () => {
            const reward = await ticketEventBlockchain.methods.getUserPoint(id, referLink || account, account).call();
            console.log(reward, 're')
            setPoint(reward);
        }

        const checkUserIsReferer = async () => {
            const isReferer = await ticketEventBlockchain.methods.userIsReferer(id, referLink || account, account).call();
            setIsReferer(isReferer);
        }

        if(ticketEventBlockchain){
            getTicketEvents();
            checkUserIsReferer();
            getUserReward()
        }

    }, [ticketEventBlockchain, id, account, referLink])

    const createReferer = async () => {
        let res;
        if(referLink){
            res = await ticketEventBlockchain.methods.addReferer(id, referLink).send({ from: account });
        }
        else{
            res = await ticketEventBlockchain.methods.createReferer(id).send({ from: account });
        }

        setIsReferer(true);
    }
    
    const purchaseTicket = async () => {
        await ticketEventBlockchain.methods.sendPoints(id, referLink, referer || referLink ).send({ from: account });

        const reward = await ticketEventBlockchain.methods.getUserPoint(id, referLink || account, account).call();
        console.log(reward)
        setPoint(reward);
    }

    const copyRefererLink = () => {
        if(referer){
            navigator.clipboard.writeText(`${window.location.href}/${account}/${referer}`);
        }
        else{
            navigator.clipboard.writeText(`${window.location.href}/${account}`);
        }
    }

    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-sm-12 col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h2>{ticketEvent?.name}</h2>
                                <button className="btn btn-primary mb-4" onClick={purchaseTicket}>
                                    Purchase Ticket
                                </button>
                            </div>
                            <p>Start at {ticketEvent?.date}, {ticketEvent?.time}</p>
                            <p>Location: {ticketEvent?.location}</p>
                            <p>{ticketEvent?.description}</p>
                            <h4>
                                Ticket Price: <span className="badge badge-info">{ticketEvent.ticketPrice && window.web3.utils.fromWei(ticketEvent.ticketPrice, 'ether')} ETH</span>
                            </h4>
                            <p></p>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-4">
                    <h2>Promote Event to earn reward tokens</h2>
                    { isReferer ? (
                        <>
                            <button className="btn btn-success" onClick={copyRefererLink}>
                                Copy Link
                            </button>
                            
                        </>
                    ) : <button className="btn btn-success" onClick={createReferer}>
                            Create Referer Link
                        </button>
                    }
                    <p className="mt-3"><strong>Your reward:</strong> {point} points</p>
                </div>
            </div>
        </div>
    )
}

export default EventDetail;
