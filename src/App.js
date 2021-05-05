import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import Web3 from 'web3';

import './App.css';
import TicketEvent from './abis/TicketEvent.json';
import Navbar from './components/Navbar';
import EventDetail from './pages/EventDetail';
import EventRegistration from './pages/EventRegistration';
import Main from './pages/Main';

function App() {
  const [account, setAccount] = useState('');
  const [ticketEventCount, setTicketEventCount] = useState(0);
  const [ticketEventBlockchain, setTicketEventBlockchain] = useState(null);

  const loadBlockchain = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);

      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

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
        loadBlockchain={loadBlockchain}
        account={account} />
      <Switch>
        <Route path="/eventregistration">
          <EventRegistration
            ticketEventBlockchain={ticketEventBlockchain}
            account={account}
            setTicketEventCount={setTicketEventCount}  />
        </Route>
        <Route path="/event/:id">
          <EventDetail
            ticketEventBlockchain={ticketEventBlockchain} />
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
    </Router>
  );
}

export default App;
