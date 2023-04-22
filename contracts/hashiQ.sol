// SPDX-License-Identifier: LGPL-3.0
pragma solidity ^0.8.0;

import "./interfaces/IHashiQ.sol";
contract HashiQ is IHashiQ{
  mapping (address => string) public hashiQDB;
  
  function hashiQuery(string memory _msgId) external{
    emit newHashiQ(msg.sender, _msgId);
  }

  function hashiInvoke(address  _from, string memory _hashiI) external override {
    hashiQDB[_from] = _hashiI;
    emit newHashiI(_from, _hashiI);
  }
}