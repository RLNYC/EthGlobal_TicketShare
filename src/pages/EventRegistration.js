import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function EventRegistration({ ticketEventBlockchain, setTicketEventCount, account }) {
    const history = useHistory();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const createEvent = async (e) => {
        try{
            e.preventDefault();
            const res = await ticketEventBlockchain.methods.createEvent(name, description, date, time, location, window.web3.utils.toWei(ticketPrice, 'ether'), quantity).send({ from: account });
            console.log(res);

            if(res) setTicketEventCount(res.events.TicketCreated.returnValues.eventId);
            
            history.push('/');
        }
        catch(err){
            console.error(err);
        }
        
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <form className="mt-3" onSubmit={createEvent}>
                        <div className="form-group">
                            <label className="font-weight-bold">Name of your event</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label className="font-weight-bold">Description</label>
                            <textarea
                                className="form-control"
                                type="text"
                                rows="3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}></textarea>    
                        </div>

                        <div className="form-group">
                            <label className="font-weight-bold">Date</label>
                            <input
                                className="form-control"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label className="font-weight-bold">Time</label>
                            <input
                                className="form-control"
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label className="font-weight-bold">Location</label>
                            <input
                                type="text"
                                className="form-control"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label className="font-weight-bold">Ticket Price</label>
                            <input
                                className="form-control"
                                type="number"
                                value={ticketPrice}
                                onChange={(e) => setTicketPrice(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label className="font-weight-bold">Available Quantity</label>
                            <input
                                className="form-control"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)} />
                        </div>

                        <p>* Registration Cost: 1 ETH</p>

                        <button className="btn btn-primary" type="submit" disabled={!account}>Register Event</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EventRegistration;
