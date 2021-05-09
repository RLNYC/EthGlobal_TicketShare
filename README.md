# Ticket Share
A ticketing platform with economic incentives for ticket buyers to promote events

- Live Site - https://ticketshare-119e2.web.app/
- Demo - https://youtu.be/nNiqjIxZ2Wg

## Technologies
- React
- Bootstrap 4
- Solidity
- Openzeppelin
- Skale Testnet
- Skale File Storage
- Torus Wallet

## Running the dapp on local host
- Run `npm i`
- Create a file called 'config.js' on the src folder and add the following code:
```
export const SKALE_CHAIN_ENDPOINT = "[YOUR_SKALE_CHAIN_ENDPOINT]";
export const ACCOUNT_ADDRESS = "[YOUR_ACCOUNT_ADDRESS]";
export const YOUR_PRIVATE_KEY = "[YOUR_PRIVATE_KEY]";

```
- Create a file called '.env' on the project root folder and add the following code:
```
PRIVATEKEY=[YOUR_PRIVATE_KEY]
SKALE=[YOUR_SKALE_CHAIN_ENDPOINT]
```
- Run `truffle deploy --reset --network skale --compile-all`
- Run `npm start` to start the dapp