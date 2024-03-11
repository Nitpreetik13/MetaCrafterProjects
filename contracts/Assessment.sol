// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import "hardhat/console.sol"; // Consider using it for debugging if needed

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event Transfer(address indexed _from, uint256 _value);

    constructor(uint256 initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        require(msg.sender == owner, "Only the owner can deposit funds.");

        // Perform deposit logic
        balance += _amount;

        emit Deposit(_amount);
    }

    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "Only the owner can withdraw funds.");
        require(_withdrawAmount <= balance, "Insufficient funds.");

        // Perform withdrawal logic
        balance -= _withdrawAmount;

        emit Withdraw(_withdrawAmount);
    }

    // New function: transferFunds(address payable _recipient, uint256 _amount)
    function transferFunds(address payable _recipient, uint256 _amount) public {
        require(msg.sender == owner, "Only the owner can transfer funds.");
        require(_amount <= balance, "Insufficient funds to transfer.");

        // Perform transfer logic
        balance -= _amount;
        _recipient.transfer(_amount); // Use `.transfer()` for smaller amounts

        emit Transfer(_recipient, _amount); // Add a Transfer event for traceability
    }
}
