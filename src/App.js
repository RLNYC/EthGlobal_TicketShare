import React from 'react';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import EventDetail from './pages/EventDetail';
import EventRegistration from './pages/EventRegistration';
import Main from './pages/Main';

function App() {
  return (
    <Router className="App">
      <Navbar />
      <Switch>
        <Route path="/eventregistration">
          <EventRegistration />
        </Route>
        <Route path="/event/:id">
          <EventDetail />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
