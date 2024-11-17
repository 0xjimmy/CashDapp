// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "fhevm/lib/TFHE.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "fhevm/gateway/GatewayCaller.sol";

contract ConfidentialBalance is Ownable2Step, GatewayCaller {
    // Events for Transfer, Approval, Mint, and Decryption
    event Transfer(address indexed from, address indexed to);
    event Deposit(address indexed to, uint64 amount);
    event Withdraw(address indexed to, uint64 amount);

    uint64 public _totalSupply;
    string public _name;
    string public _symbol;
    uint8 public constant decimals = 2;

    // Mappings for balances and allowances
    mapping(address => euint64) internal balances;

    // Constructor to set the token name, symbol, and owner
    constructor() Ownable(msg.sender) {
        _name = "CashDapp USDC";
        _symbol = "cdUSDC";
    }

    // Mint function to create tokens and add to the owner's balance
    function deposit(address user, uint64 mintedAmount) public virtual onlyOwner {
        balances[user] = TFHE.add(balances[user], mintedAmount);
        TFHE.allow(balances[user], address(this));
        TFHE.allow(balances[user], user);
        _totalSupply = _totalSupply + mintedAmount;
        emit Deposit(user, mintedAmount);
    }

    // Overloaded _mint function to allow encrypted token minting
    function depositEnc(einput encryptedAmount, bytes calldata inputProof) public virtual onlyOwner {
        balances[msg.sender] = TFHE.add(balances[msg.sender], TFHE.asEuint64(encryptedAmount, inputProof));
        TFHE.allow(balances[msg.sender], address(this));
        TFHE.allow(balances[msg.sender], owner());
        TFHE.allow(balances[msg.sender], msg.sender);
    }

    // Transfer function for EOAs using encrypted inputs
    function transferEnc(address to, einput encryptedAmount, bytes calldata inputProof) public virtual returns (bool) {
        transfer(to, TFHE.asEuint64(encryptedAmount, inputProof));
        return true;
    }

    // Transfer function for contracts
    function transfer(address to, euint64 amount) public virtual returns (bool) {
        require(TFHE.isSenderAllowed(amount));
        ebool canTransfer = TFHE.le(amount, balances[msg.sender]);
        _transfer(msg.sender, to, amount, canTransfer);
        return true;
    }

    // Retrieves the balance handle of a specified wallet
    function balanceOf(address wallet) public view virtual returns (euint64) {
        return balances[wallet];
    }


    // Internal transfer function for encrypted token transfer
    function _transfer(address from, address to, euint64 amount, ebool isTransferable) internal virtual {
        euint64 transferValue = TFHE.select(isTransferable, amount, TFHE.asEuint64(0));
        euint64 newBalanceTo = TFHE.add(balances[to], transferValue);
        balances[to] = newBalanceTo;
        TFHE.allow(newBalanceTo, address(this));
        TFHE.allow(newBalanceTo, to);

        euint64 newBalanceFrom = TFHE.sub(balances[from], transferValue);
        balances[from] = newBalanceFrom;
        TFHE.allow(newBalanceFrom, address(this));
        TFHE.allow(newBalanceFrom, from);

        emit Transfer(from, to);
    }
}
