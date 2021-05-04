import React from 'react';

function EventDetail() {
    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-sm-12 col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2>Party Time</h2>
                            <p>May 7, 2020</p>
                            <p>123 Party St</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure eius, aperiam, facere eos ipsum sunt iste reiciendis impedit quia facilis labore! Delectus consectetur, laboriosam cum quae quos ea ducimus velit!</p>
                        </div>
                    </div>
                    
                </div>

                <div className="col-sm-12 col-md-4 d-flex flex-column align-items-end">
                    <button>Ticket Price: 0.5 ETH</button>
                    <button className="btn btn-primary mb-4">
                        Purchase Ticket
                    </button>

                    <button className="btn btn-success">
                        Promote Event to earn reward tokens
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EventDetail;
