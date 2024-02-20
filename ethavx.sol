// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract OwnershipContract {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function onlyOwner() public view {
        require(msg.sender == owner, "OWNER CAN ONLY CALL THIS FUNCTION SORRY.");
    }

    function onwerHere() public view {
        if(msg.sender!= owner){
            revert("SORRY! THE CALLER IS NOT THE OWNER.");
        }
    }

    function Owner() public view {
        assert(msg.sender == owner);
    }
}
