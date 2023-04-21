// SPDX-License-Identifier: LGPL-3.0
pragma solidity ^0.8.0;

contract hashiQ {
  event newHashiQ(address indexed _from, string _hashiQ);
  function hashiQuery(string memory _msgId) public {
    emit newHashiQ(msg.sender, _msgId);
  }
}