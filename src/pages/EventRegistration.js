import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Filestorage from '@skalenetwork/filestorage.js';
import Web3 from 'web3';

import { SKALE_CHAIN_ENDPOINT, ACCOUNT_ADDRESS, YOUR_PRIVATE_KEY } from '../config';

//create web3 connection
const web3Provider = new Web3.providers.HttpProvider(SKALE_CHAIN_ENDPOINT);
let web3 = new Web3(web3Provider);

function EventRegistration({ ticketEventBlockchain, setTicketEventCount, account }) {
    const history = useHistory();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [filePath, setFilePath] = useState('');

    const createEvent = async (e) => {
        try{
            e.preventDefault();
            const startDate = date + ' ' + time;
            const res = await ticketEventBlockchain.methods.createEvent(name, description, startDate, location, window.web3.utils.toWei(ticketPrice, 'ether'), quantity, filePath).send({ from: account });
            console.log(res);

            if(res) setTicketEventCount(res.events.TicketCreated.returnValues.eventId);
            
            history.push('/');
        }
        catch(err){
            console.error(err);
        }
    }

    // file upload
    async function upload(event, specificDirectory=''){
        event.preventDefault();

        //get filestorage instance
        let filestorage = new Filestorage(web3, true);

        //provide your account & private key
        //note this must include the 0x prefix
        let privateKey = '0x' + YOUR_PRIVATE_KEY;
        let accountAddress = ACCOUNT_ADDRESS;

        //get file data from file upload input field
        let file = document.getElementById('files').files[0];
        let reader = new FileReader();

        //file path in account tree (dirA/file.name)
        let filePath;
        if (specificDirectory === '') {
            filePath = file.name;
        } else {
            filePath = specificDirectory + '/' + file.name;
        }

        //file storage method to upload file
        reader.onload = async function(e) {
            const arrayBuffer = reader.result
            const bytes = new Uint8Array(arrayBuffer);
            filestorage.uploadFile(
                accountAddress, 
                filePath, 
                bytes,
                privateKey
            );
            setFilePath(`${ACCOUNT_ADDRESS.slice(2, 42)}/${filePath}`);
        };
        reader.readAsArrayBuffer(file);
    }

    return (
        <div className="container">
            <div className="card mt-3" style={{ maxWidth: '600px', margin: 'auto'}}>
                <div className="card-body">
                    <h2 className="card-title text-center text-primary">Event Registration</h2>

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

                        
                        <div className="input-group mb-3">
                            <label className="font-weight-bold">Image</label>
                            <input
                                onChange={(e) => upload(e)} 
                                type="file"
                                id="files" />
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label className="font-weight-bold">Date</label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label className="font-weight-bold">Time</label>
                                    <input
                                        className="form-control"
                                        type="time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        

                        <div className="form-group">
                            <label className="font-weight-bold">Location</label>
                            <input
                                type="text"
                                className="form-control"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)} />
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label className="font-weight-bold">Ticket Price (In ETH)</label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        value={ticketPrice}
                                        onChange={(e) => setTicketPrice(e.target.value)} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label className="font-weight-bold">Available Quantity</label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <p className="text-muted">* Registration Cost: 0.1 ETH</p>

                        <button className="btn btn-primary" type="submit" disabled={!account}>Register Event</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EventRegistration;
