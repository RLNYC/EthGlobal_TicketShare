/*
 * This truffle script will deploy your smart contracts to your SKALE Chain.
 *
 *  @param {String} privateKey - Provide your wallet private key.
 *  @param {String} provider - Provide your SKALE endpoint address.
 */
require("dotenv").config();

const HDWalletProvider = require("truffle-hdwallet-provider");
//https://skale.network/developers/ for SKALE documentation
//Provide your wallet private key
const privateKey = process.env.PRIVATEKEY;
//Provide your SKALE endpoint address
const skale = process.env.SKALE;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    // truffle deploy --reset --network skale --compile-all
    skale: {
      provider: () => new HDWalletProvider(privateKey, skale),
      gasPrice: 0,
      network_id: "*"
    }
  },
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.6.12",    // Fetch exact version from solc-bin (default: truffle's version)
    },
  },
};