// SPDX-License-Identifier: LGPL-3.0
contract Membership {
    
    struct memberInfo {  
        string name;
        bool isActive;
    } 

    bytes32 public merkleRoot;
    mapping (address => memberInfo) public memberDB;

    event NewMember(address memberAddress, memberInfo member, bytes32 merkleRoot);    
    
    function register(address _memberAddress, string memory _name, bytes32 _merkleRoot) public {
      //TODO: add hashiQ check
        memberDB[_memberAddress].name = _name;
        memberDB[_memberAddress].isActive = true;
        merkleRoot = _merkleRoot;
        emit NewMember(_memberAddress, memberDB[_memberAddress], merkleRoot);
    }

    function checkMember(address _memberAddress) public view returns(bool){
        return memberDB[_memberAddress].isActive;
    }
}
