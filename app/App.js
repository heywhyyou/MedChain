import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const App = () => {
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [message, setMessage] = useState('Connect Wallet to start');

    // Contract ABI and address (from Remix after deployment)
    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
    const contractABI = [
        // ABI from Remix deployment
    ];

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(accounts => {
                    setAccount(accounts[0]);
                    const web3 = new Web3(window.ethereum);
                    const medChainContract = new web3.eth.Contract(contractABI, contractAddress);
                    setContract(medChainContract);
                    setMessage('Wallet connected successfully!');
                }).catch(error => {
                    console.error(error);
                    setMessage('Failed to connect wallet');
                });
        } else {
            setMessage('Please install MetaMask');
        }
    }, []);

    const handleSubmit = () => {
        if (!contract || !account) {
            setMessage('Connect your wallet first');
            return;
        }

        // Call a function from your smart contract
        contract.methods.yourSmartContractMethod()
            .send({ from: account })
            .then(receipt => {
                setMessage(`Transaction Successful! Hash: ${receipt.transactionHash}`);
            })
            .catch(error => {
                setMessage('Transaction Failed: ' + error.message);
            });
    };

    return (
        <div>
            <h1>MedChain Real Estate Transactions</h1>
            <p>{message}</p>
            <button onClick={handleSubmit}>Submit Transaction</button>
        </div>
    );
};

export default App;