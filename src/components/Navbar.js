import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ account }) {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand mb-0 h1" to="/">Ticket Share</Link>
                <button
                    className="btn btn-outline-primary my-2 my-sm-0"
                    data-toggle="modal"
                    data-target="#walletModal"
                >
                    {account ? account.substring(0, 7) + '...' + account.substring(35, 42) : 'Connect to Wallet'}
                </button>
            </div>
            
        </nav>
    )
}

export default Navbar;
