import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [transferRecipient, setTransferRecipient] = useState(""); // New state for recipient
  const [transferAmount, setTransferAmount] = useState(0); // New state for amount

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      try {
        const tx = await atm.deposit(1);
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error depositing:", error);
      }
    }
  };

  const withdraw = async () => {
    if (atm) {
      try {
        const tx = await atm.withdraw(1);
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error withdrawing:", error);
      }
    }
  };

  const handleTransferChange = (event) => {
    const { name, value } = event.target;
    if (name === "recipient") {
      setTransferRecipient(value);
    } else if (name === "amount") {
      setTransferAmount(parseFloat(value)); // Parse amount as a number
    }
  };

  const transferFunds = async () => {
    if (atm) {
      try {
        const recipient = ethers.utils.getAddress(transferRecipient); // Ensure valid recipient address
        const tx = await atm.transferFunds(recipient, transferAmount); // Use transferAmount
        await tx.wait();
        getBalance();
        setTransferRecipient(""); // Clear recipient input after successful transfer
        setTransferAmount(0); // Clear amount input after successful transfer
      } catch (error) {
        console.error("Error transferring funds:", error);
      }
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <button onClick={deposit}>Deposit 1 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>
        <br />
    <label htmlFor="recipient">Transfer To:</label>
    <input
      type="text"
      name="recipient"
      value={transferRecipient}
      onChange={handleTransferChange}
    />
    <label htmlFor="amount">Amount (ETH):</label>
    <input
      type="number"
      name="amount"
      value={transferAmount}
      onChange={handleTransferChange}
    />
    <button onClick={transferFunds}>Transfer Funds</button>

      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container" style={{ backgroundColor: "#3c2f42" }}>
      <header>
        <h1 style={{ color: "white", fontSize: "3em", fontWeight: "bold", fontStyle: "italic" }}>
          Welcome to the Metacrafters ATM!
        </h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 2rem;
          color: white;
          font-family: sans-serif;
        }

        button {
          background-color: #d7d7d7;
          border: none;
          border-radius: 5px;
          padding: 1rem 2rem;
          margin: 1rem;
          cursor: pointer;
          color: black;
          font-size: 1.2em;
          font-weight: bold;
          font-style: italic;
          transition: background-color 0.2s ease-in-out;
        }

        button:hover {
          background-color: #cccccc;
        }

        input {
          padding: 0.5rem 1rem;
          border: 1px solid #d7d7d7;
          border-radius: 5px;
          background-color: transparent;
          color: white;
          font-size: 1em;
          margin: 0.5rem;
        }

        p {
          font-size: 1.5em;
          margin: 1rem;
        }
      `}</style>
    </main>
  );

  
}
