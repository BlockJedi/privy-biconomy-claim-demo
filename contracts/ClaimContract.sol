// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract ClaimToken is ERC20, Ownable {
    using ECDSA for bytes32;
    mapping(bytes32 => bool) public usedHashes;

    constructor() ERC20("ClaimToken", "CLM") {}

    function claim(address to, uint256 amount, bytes calldata signature) external {
        bytes32 hash = keccak256(abi.encodePacked(to, amount));
        require(!usedHashes[hash], "Hash used");
        require(_verify(hash, signature), "Invalid sig");

        usedHashes[hash] = true;
        _mint(to, amount);
    }

    function _verify(bytes32 hash, bytes memory signature) internal view returns (bool) {
        return hash.toEthSignedMessageHash().recover(signature) == owner();
    }
}
