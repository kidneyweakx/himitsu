// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.0;

import "./OracleAdapter.sol";

contract EasyOracleAdapter is OracleAdapter {
  struct Payload {
    uint256 blockNumber;
    bytes32 hash;
  }
  function blockHash(uint256 chainId, Payload memory payload) external {
    _storeHash(uint256(chainId), payload.blockNumber, payload.hash);
  }
}