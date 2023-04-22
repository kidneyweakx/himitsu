// SPDX-License-Identifier: LGPL-3.0
pragma solidity ^0.8.0;
contract Membership {
    
    struct memberInfo {  
        string name;
        bool isActive;
    } 

    mapping (address => memberInfo) public memberDB;

    event NewMember(address memberAddress, memberInfo member);    
    
    function register(address _memberAddress, string memory _name) public {
      //TODO: add hashiQ check
        memberDB[_memberAddress].name = _name;
        memberDB[_memberAddress].isActive = true;
        emit NewMember(_memberAddress, memberDB[_memberAddress]);
    }

    function checkMember(address _memberAddress) public view returns(bool){
        return memberDB[_memberAddress].isActive;
    }
}
