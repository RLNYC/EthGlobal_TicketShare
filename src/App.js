import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import Torus from '@toruslabs/torus-embed';
import Web3 from 'web3';

import './App.css';
import TicketEvent from './abis/TicketEvent.json';
import Navbar from './components/Navbar';
import EventDetail from './pages/EventDetail';
import EventRegistration from './pages/EventRegistration';
import Main from './pages/Main';
import WalletModal from './components/WalletModal';

function App() {
  const [account, setAccount] = useState('');
  const [ticketEventCount, setTicketEventCount] = useState(0);
  const [ticketEventBlockchain, setTicketEventBlockchain] = useState(null);

  const openWithTorus = async () => {
    const torus = new Torus();
    await torus.init(
      {
        network: {
          host: 'https://dev-testnet-v1-1.skalelabs.com',
          chainId: "344435",
          networkName: "Skale Test Network"
        }
      }
    );
    await torus.login();
    const web3 = new Web3(torus.provider);
    window.web3 = web3;

    loadBlockchain();
  }
  
  const openWithMetaMask = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);

      await window.ethereum.enable();
      loadBlockchain();
    }
    // else if (window.web3) {
    //   window.web3 = new Web3(window.web3.currentProvider);
    //   loadBlockchain();
    // }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  const loadBlockchain = async () => {
    const web3 = window.web3;

    const netId = await web3.eth.net.getId();
    const accounts = await web3.eth.getAccounts();

    setAccount(accounts[0]);

    if(netId){
      const ticketEvent = new web3.eth.Contract(TicketEvent.abi, TicketEvent.networks[netId].address);
      setTicketEventBlockchain(ticketEvent);

      const eventCount = await ticketEvent.methods.ticketEventCount().call();
      setTicketEventCount(eventCount);
      console.log(eventCount)
    }
    else{
      window.alert('Contract is not deployed to detected network')
    }
  }

  return (
    <Router className="App">
      <Navbar
        openWithTorus={openWithTorus}
        account={account} />
      <Switch>
        <Route path="/eventregistration">
          <EventRegistration
            ticketEventBlockchain={ticketEventBlockchain}
            account={account}
            setTicketEventCount={setTicketEventCount}  />
        </Route>
        <Route path="/event/:id/:referLink/:referer">
          <EventDetail
            ticketEventBlockchain={ticketEventBlockchain}
            account={account} />
        </Route>
        <Route path="/event/:id/:referLink">
          <EventDetail
            ticketEventBlockchain={ticketEventBlockchain}
            account={account} />
        </Route>
        <Route path="/event/:id">
          <EventDetail
            ticketEventBlockchain={ticketEventBlockchain}
            account={account} />
        </Route>
        <Route path="/">
          {account
            ? <Main
                ticketEventBlockchain={ticketEventBlockchain}
                ticketEventCount={ticketEventCount} />
            : <div className="container pt-3"><h1>Connect to your wallet</h1></div>
          }
        </Route>
      </Switch>
      <WalletModal openWithTorus={openWithTorus} openWithMetaMask={openWithMetaMask} />
    </Router>
  );
}

export default App;
