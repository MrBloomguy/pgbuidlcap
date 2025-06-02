// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract YouBuildRegistrar is Ownable, ReentrancyGuard {
    struct DomainInfo {
        string name;
        address owner;
        uint256 expiry;
        string extension;
    }

    uint256 public constant REGISTRATION_PERIOD = 365 days;
    uint256 public constant BASE_PRICE = 0.01 ether;
    
    mapping(string => DomainInfo) private domains;
    DomainInfo[] private registeredDomains;

    event DomainRegistered(string name, string extension, address owner, uint256 expiry);
    event DomainRenewed(string name, string extension, uint256 newExpiry);
    event PriceUpdated(uint256 newPrice);

    modifier validExtension(string memory extension) {
        require(
            keccak256(bytes(extension)) == keccak256(bytes(".youbuidl")) ||
            keccak256(bytes(extension)) == keccak256(bytes(".givestation")),
            "Invalid extension"
        );
        _;
    }

    constructor() Ownable(msg.sender) {}

    function register(string calldata fullName) external payable nonReentrant {
        // Extract name and extension
        (string memory name, string memory extension) = splitNameAndExtension(fullName);
        require(bytes(name).length >= 3, "Name too short");
        require(bytes(name).length <= 32, "Name too long");
        
        // Check extension validity
        require(
            keccak256(bytes(extension)) == keccak256(bytes(".youbuidl")) ||
            keccak256(bytes(extension)) == keccak256(bytes(".givestation")),
            "Invalid extension"
        );

        // Check availability
        require(isAvailable(fullName), "Domain not available");

        // Check payment
        uint256 price = getPrice(fullName);
        require(msg.value >= price, "Insufficient payment");

        // Register domain
        uint256 expiry = block.timestamp + REGISTRATION_PERIOD;
        domains[fullName] = DomainInfo({
            name: name,
            owner: msg.sender,
            expiry: expiry,
            extension: extension
        });
        registeredDomains.push(domains[fullName]);

        emit DomainRegistered(name, extension, msg.sender, expiry);

        // Return excess payment
        if (msg.value > price) {
            (bool success, ) = msg.sender.call{value: msg.value - price}("");
            require(success, "Failed to return excess payment");
        }
    }

    function isAvailable(string memory fullName) public view returns (bool) {
        if (domains[fullName].owner == address(0)) return true;
        return domains[fullName].expiry < block.timestamp;
    }

    function getRegisteredDomains() external view returns (DomainInfo[] memory) {
        return registeredDomains;
    }

    function getPrice(string memory /*fullName*/) public pure returns (uint256) {
        return BASE_PRICE;
    }

    function renew(string calldata fullName) external payable nonReentrant {
        require(domains[fullName].owner != address(0), "Domain not registered");
        require(domains[fullName].owner == msg.sender, "Not domain owner");

        uint256 price = getPrice(fullName);
        require(msg.value >= price, "Insufficient payment");

        uint256 newExpiry;
        if (domains[fullName].expiry > block.timestamp) {
            newExpiry = domains[fullName].expiry + REGISTRATION_PERIOD;
        } else {
            newExpiry = block.timestamp + REGISTRATION_PERIOD;
        }

        domains[fullName].expiry = newExpiry;
        
        // Update in registeredDomains array
        for(uint i = 0; i < registeredDomains.length; i++) {
            if (keccak256(bytes(registeredDomains[i].name)) == keccak256(bytes(domains[fullName].name)) &&
                keccak256(bytes(registeredDomains[i].extension)) == keccak256(bytes(domains[fullName].extension))) {
                registeredDomains[i].expiry = newExpiry;
                break;
            }
        }

        emit DomainRenewed(domains[fullName].name, domains[fullName].extension, newExpiry);

        if (msg.value > price) {
            (bool success, ) = msg.sender.call{value: msg.value - price}("");
            require(success, "Failed to return excess payment");
        }
    }

    function splitNameAndExtension(string memory fullName) internal pure returns (string memory name, string memory extension) {
        bytes memory fullNameBytes = bytes(fullName);
        uint dotIndex;
        bool foundDot = false;
        
        for (uint i = 0; i < fullNameBytes.length; i++) {
            if (fullNameBytes[i] == bytes1(".")) {
                dotIndex = i;
                foundDot = true;
                break;
            }
        }
        
        require(foundDot, "Invalid name format");

        bytes memory nameBytes = new bytes(dotIndex);
        bytes memory extensionBytes = new bytes(fullNameBytes.length - dotIndex);

        for (uint i = 0; i < dotIndex; i++) {
            nameBytes[i] = fullNameBytes[i];
        }

        for (uint i = dotIndex; i < fullNameBytes.length; i++) {
            extensionBytes[i - dotIndex] = fullNameBytes[i];
        }

        return (string(nameBytes), string(extensionBytes));
    }

    function withdraw() external onlyOwner {
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Failed to withdraw");
    }
}
