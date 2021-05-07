import React from 'react';

function WalletModal({ openWithTorus, openWithMetaMask }){
    return(
        <div className="container my-5">
            <div className="modal fade" id="walletModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Choose Wallet</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="d-flex flex-column align-items-center">
                                <button
                                    className="btn btn-primary btn-lg w-50 mb-3"
                                    src="/images/portis_icon.png"
                                    alt="Portis"
                                    onClick={openWithTorus}
                                    data-dismiss="modal"
                                >
                                    Torus
                                </button>
                                
                                <button
                                    className="btn btn-warning btn-lg w-50"
                                    onClick={openWithMetaMask}
                                    data-dismiss="modal"
                                >
                                    Metamask
                                </button>
                            </div>
                        </div>

                        <div className="modal-footer"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WalletModal;