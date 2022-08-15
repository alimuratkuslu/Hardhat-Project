// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.7;

contract Test2{

    address owner;

    constructor(){
        owner = msg.sender;
    }

    struct User {
        address payable walletAddress;
        string name;
        uint funds;
        uint releaseTime;
        bool isInvestor;
        bool canWithdraw;
    }

    User[] public users;
    User[] public kidsArray;
    mapping(address => User) public investors;
    mapping(address => User[]) public investorKidConnection;

    function addUser(address payable walletAddress, string memory name, uint funds, uint releaseTime, bool isInvestor, bool canWithdraw) public {
        users.push(User(walletAddress, name, funds, releaseTime, isInvestor, canWithdraw));
    }

    function addKidToInvestor(address investorAddress, address kidAddress) public {
        User memory kid = getUserByAddress(kidAddress);
        kidsArray.push(kid);

        investorKidConnection[investorAddress] = kidsArray;
    }

    function getUserByAddress(address walletAddress) public view returns(User memory user){
        for(uint i = 0; i < users.length; i++){
            if(users[i].walletAddress == walletAddress){
                return users[i];
            }
        }

        revert("Invalid Wallet Address");
    }

    function getKidsOfInvestorByIndex(address walletAddress, uint index) public view returns(string memory){
        
        User[] memory kids = investorKidConnection[walletAddress];

        return kids[index].name;
    }

    function balanceOf(address walletAddress) public view returns(uint){
        for(uint i = 0; i < users.length; i++){
            if(users[i].walletAddress == walletAddress){
                return users[i].funds;
            }
        }
        return 999;
    }

    function transfer(address kidAddress, uint amount) public payable {
        transferToAddress(kidAddress, amount);
    }

    function transferToAddress(address walletAddress, uint amount) private {
        for(uint i = 0; i < users.length; i++){
            if(users[i].walletAddress == walletAddress){
                users[i].funds += amount;
            }
        }
    }

    function getIndexOfUser(address walletAddress) private view returns(uint){
        for(uint i = 0; i < users.length; i++){
            if(users[i].walletAddress == walletAddress){
                return i;
            }
        }
        revert("User doest not exist");
    }
    
    function getKidsWithdrawStatus(address walletAddress) public view returns(bool){
        uint i = getIndexOfUser(walletAddress);

        return users[i].canWithdraw;
    }
    
    function availableToWithdraw(address walletAddress) public view returns(bool){
        uint i = getIndexOfUser(walletAddress);
        /*
        uint startDate = block.timestamp;
        uint paymentDate = users[i].releaseTime;

        uint daysLeft = (paymentDate - startDate) / 60 / 60 / 24;
        string memory message = string.concat("You have to wait ", Strings.toString(daysLeft), " days to withdraw");
        */

        require(block.timestamp > users[i].releaseTime, "ERROR");
        if(block.timestamp > users[i].releaseTime){
            users[i].canWithdraw == true;
            return true;
        }
        else{
            return false;
        }
    }

    function withdraw(address payable walletAddress) payable public {
        uint i = getIndexOfUser(walletAddress);        
        //require(msg.sender == users[i].walletAddress, "You must be the kid to withdraw");
        require(block.timestamp > users[i].releaseTime, "You can't withdraw yet");
        users[i].walletAddress.transfer(users[i].funds);
    } 

    function getBalance(address walletAddress) public view returns (uint) {
        return walletAddress.balance;
    }

    function reverseInvestment(address investorAddress, address kidAddress) payable public {
        uint kid = getIndexOfUser(kidAddress);
        uint investor = getIndexOfUser(investorAddress);

        require(block.timestamp > users[kid].releaseTime, "Investment is currently inactive");
        //require(users[kid].canWithdraw == true, "Kid can't withdraw investment");

        transfer(users[investor].walletAddress, users[kid].walletAddress.balance);
        users[investor].funds = users[investor].funds + users[kid].walletAddress.balance;
    }
}