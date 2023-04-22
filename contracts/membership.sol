// SPDX-License-Identifier: LGPL-3.0
pragma solidity ^0.8.0;

import "./interfaces/IHashVerifier.sol";

contract Membership{
    IHashVerifier public hashVerifier;

    event MessageDispatched(
        address indexed from,
        uint256 indexed toChainId, 
        uint data,
        bytes32 hash
    );

    struct memberInfo {  
        string name;
        bool isActive;
    } 
     struct ProofData {
        uint[2] a;
        uint[2][2] b;
        uint[2] c;
        uint[2] input;
    }
    constructor(address _hashVerifier) {
        hashVerifier = IHashVerifier(_hashVerifier);
    }
    mapping (address => memberInfo) public memberDB;
    mapping (address => uint) public hashDB;
    mapping (uint => bool) public hashValid;

    event NewMember(address memberAddress, memberInfo member);    
    
    function verifyProof(ProofData memory proofData) public view returns (bool) {
        return hashVerifier.verifyProof(
            proofData.a,
            proofData.b,
            proofData.c,
            proofData.input
        );
    }

    function register(address _memberAddress, string memory _name) public {
      //TODO: add hashiQ check
        memberDB[_memberAddress].name = _name;
        memberDB[_memberAddress].isActive = true;
        emit NewMember(_memberAddress, memberDB[_memberAddress]);
    }

    function zkRegister(ProofData memory proofData) external{
        require(verifyProof(proofData), "Verification Failed");
        hashDB[msg.sender] = proofData.input[0];
        memberDB[msg.sender].name = 'test';
        memberDB[msg.sender].isActive = true;
         emit NewMember(msg.sender, memberDB[msg.sender]);
    }

    function checkRegister(uint hash, uint256 chainId, bytes32 blockHash) external{
        emit MessageDispatched(
            msg.sender,
            chainId,
            hash,
            blockHash
        );
    }
    function setHashValid(uint hash) external {
        hashValid[hash]= true;
    }
    function checkMember(address _memberAddress) public view returns(bool){
        return memberDB[_memberAddress].isActive;
    }

    // function checkNoDupulate(uint256 _msgId, bytes32 hash) external {
    //      emit newHashiQ(msg.sender, _msgId, hash);
    // }
}
