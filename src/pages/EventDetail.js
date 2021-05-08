import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Filestorage from '@skalenetwork/filestorage.js';
import Web3 from 'web3';

import { SKALE_CHAIN_ENDPOINT } from '../config';

//create web3 connection
const web3Provider = new Web3.providers.HttpProvider(SKALE_CHAIN_ENDPOINT);
let web3 = new Web3(web3Provider);

function EventDetail({ ticketEventBlockchain, getBalance, account }) {
    const { id, referLink, referer } = useParams();
    const [ticketEvent, setTicketEvent] = useState({});
    const [isReferer, setIsReferer] = useState(false);
    const [point, setPoint] = useState('0');
    const [imageURL, setImageURL] = useState('');

    useEffect(() => {
        const getTicketEvents = async () => {
            const event = await ticketEventBlockchain.methods.tickets(id).call();
            downloadFileToVariable(event.imagePath);
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

        const downloadFileToVariable = async (storagePath) => {
            let filestorage = new Filestorage(web3, true);
            let file = await filestorage.downloadToBuffer(storagePath);
            file = 'data:image/png;base64,' + file.toString('base64');
            console.log(file);
            setImageURL(file);
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
        console.log(res);
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

    const claimToken = async () => {
        try{
            await ticketEventBlockchain.methods.withdrawTokens(id, referLink || account, account).send({ from: account });
            setPoint(0);
            getBalance();
        } catch (err) {
            console.error(err);
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
                            <p>Start at {ticketEvent?.date}</p>
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
                    <img className="img-fluid" src={imageURL} alt="Event" />
                </div>
            </div>
            <h2 className="mt-3">Promote Event to earn reward tokens</h2>
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
            <p className="mt-3"><strong>Your reward:</strong> {window.web3.utils?.fromWei(point.toString(), 'Ether')} TSH</p>
            {point != 0 && <button className="btn btn-warning" onClick={claimToken}>
                Claim TST
            </button> }
        </div>
    )
}

export default EventDetail;
