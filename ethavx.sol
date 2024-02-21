//SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

contract OwnerisSAMEornot{

    address owner;
    string ownerName;
    uint256 desiredNumber;

    constructor(){
        owner = msg.sender;
        ownerName = "Nitpreet";}

    modifier AUTHOR() {
    require(msg.sender == owner, "This isnt authrised by the owner");
    _;
  }

  function setdesiredNumber(uint256 _desiredNumber) public AUTHOR {
    // Use require() for validation
    require(_desiredNumber > 0, "desired number must be greater than zero.");
    desiredNumber = _desiredNumber;
  }

  function getdesiredNumber() public view returns (uint256) {
    // Use assert() for internal checks
    assert(desiredNumber > 0); 
    return desiredNumber;
  }

  function getOwnerName() public view returns (string memory) {
        return ownerName;
    }

  function changeOwner(address newOwner) public AUTHOR {
    // Use revert() for unexpected conditions
    if (newOwner == address(0)) {
      revert("New owner cannot be zero address.");
    }
    owner = newOwner;
  }
}
