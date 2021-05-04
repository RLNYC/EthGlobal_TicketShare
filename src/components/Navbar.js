import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav class="navbar navbar-light bg-light">
            <Link class="navbar-brand mb-0 h1" to="/">Ticket Share</Link>
            <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Connect to Wallet</button>
        </nav>
    )
}

export default Navbar;
