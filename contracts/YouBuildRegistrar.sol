// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BuilderToken {
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    address public owner;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(string memory _name, string memory _symbol, uint256 _supply, address _creator) {
        name = _name;
        symbol = _symbol;
        totalSupply = _supply;
        owner = _creator;
        balanceOf[_creator] = _supply;
        emit Transfer(address(0), _creator, _supply);
    }

    function transfer(address to, uint256 value) public returns (bool) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) public returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        require(balanceOf[from] >= value, "Insufficient balance");
        require(allowance[from][msg.sender] >= value, "Allowance exceeded");
        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;
        emit Transfer(from, to, value);
        return true;
    }
}

contract BuilderLaunchpad {
    address[] public allTokens;
    event TokenCreated(address indexed token, address indexed creator, string name, string symbol, uint256 supply);

    function createToken(string memory name, string memory symbol, uint256 supply) external returns (address) {
        BuilderToken token = new BuilderToken(name, symbol, supply, msg.sender);
        allTokens.push(address(token));
        emit TokenCreated(address(token), msg.sender, name, symbol, supply);
        return address(token);
    }

    function getAllTokens() external view returns (address[] memory) {
        return allTokens;
    }
}
