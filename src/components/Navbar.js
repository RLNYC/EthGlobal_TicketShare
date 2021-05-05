import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ loadBlockchain, account }) {
    return (
        <nav className="navbar navbar-light bg-light">
            <Link className="navbar-brand mb-0 h1" to="/">Ticket Share</Link>
            <button
                className="btn btn-outline-primary my-2 my-sm-0"
                onClick={loadBlockchain}
            >
                {account ? account.substring(0, 7) + '...' + account.substring(35, 42) : 'Connect to Wallet'}
            </button>
        </nav>
    )
}

export default Navbar;
