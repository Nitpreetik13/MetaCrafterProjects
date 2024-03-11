// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20{
    address public Owner;
    constructor() ERC20("ANDREToken", "DRE") {
        Owner =msg.sender;
        _mint(msg.sender, 10000);
    }

    function mint(address to, uint256 amount) public {
        require(msg.sender == Owner, "Only the owner can MINT TOKENS");
        _mint(to, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        _transfer(_msgSender(), to, amount);
        return true;
    }
}
