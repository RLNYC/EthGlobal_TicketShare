import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
    return (
        <div className="container">
            <Link to="/eventregistration" className="btn btn-primary btn-lg my-3">
                Register Event
            </Link>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <h2><Link to={`/event/1`}>Party Time</Link></h2>
                            <p>May 7, 2020</p>
                            <p>123 Party St</p>
                            <p>0.5 ETH</p>
                        </div>
                        <div className="col-sm-6 d-flex flex-column align-items-end">
                            <button className="btn btn-primary btn-lg mt-4 mb-2">
                                Promotion Reward Tally
                            </button>
                            <button  className="btn btn-secondary btn-lg">Earn Promotion Reward</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;
