import React from 'react';

function EventRegistration() {
    return (
        <div className="container">
            <form className="mt-3">
                <div className="form-group">
                    <label className="font-weight-bold">Name of your event</label>
                    <input type="text" className="form-control" />
                </div>

                <div className="form-group">
                    <label className="font-weight-bold">Description</label>
                    <textarea
                        className="form-control"
                        type="text"
                        rows="3"></textarea>    
                </div>

                <div class="form-group">
                    <label class="font-weight-bold">Date</label>
                    <input
                        class="form-control"
                        type="date" />
                </div>

                <div class="form-group">
                    <label class="font-weight-bold">Time</label>
                    <input
                        class="form-control"
                        type="time" />
                </div>

                <div className="form-group">
                    <label className="font-weight-bold">Location</label>
                    <input type="text" className="form-control" />
                </div>

                <div class="form-group">
                  <label class="font-weight-bold">Ticket Price</label>
                  <input
                    class="form-control"
                    type="number" />
                </div>

                <div class="form-group">
                  <label class="font-weight-bold">Available Quantity</label>
                  <input
                    class="form-control"
                    type="number" />
                </div>

                <p>* Registration Cost: 1 ETH</p>

                <button type="submit" className="btn btn-primary">Register Event</button>
            </form>
        </div>
    )
}

export default EventRegistration;
