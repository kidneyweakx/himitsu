// SPDX-License-Identifier: LGPL-3.0
pragma solidity ^0.8.0;

interface IHashiQ {
  event newHashiQ(address indexed _from, string _hashiQ);
  event newHashiI(address indexed _from, string _hashiI);
  function hashiQuery(string memory _msgId) external;
  function hashiInvoke(address _from, string memory _hashiQ) external;
}