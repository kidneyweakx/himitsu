#! /bin/bash
bdk fabric network create --test-network
bdk fabric orderer up -i # a 
bdk fabric peer up -i # a
bdk fabric chaincode package -i 

# Org0 的 peer0 建立新的 channel
export BDK_ORG_NAME='Org1'
export BDK_ORG_DOMAIN='org1.example.com'
export BDK_HOSTNAME='peer0'

bdk fabric channel create -i
bdk fabric channel join -i

export BDK_ORG_NAME='Org2'
export BDK_ORG_DOMAIN='org2.example.com'
export BDK_HOSTNAME='peer0'
bdk fabric channel join -i

# 更新 Org0 的 anchor peer
export BDK_ORG_NAME='Org1'
export BDK_ORG_DOMAIN='org1.example.com'
export BDK_HOSTNAME='peer0'

bdk fabric channel update-anchorpeer -i

# Org0 的 peer0 安裝、同意 Chaincode
export BDK_ORG_NAME='Org2'
export BDK_ORG_DOMAIN='org2.example.com'
export BDK_HOSTNAME='peer0'
bdk fabric channel update-anchorpeer -i


bdk fabric chaincode package -i
bdk fabric chaincode install -i
bdk fabric chaincode approve -i


export BDK_ORG_NAME='Org1'
export BDK_ORG_DOMAIN='org1.example.com'
export BDK_HOSTNAME='peer0'
bdk fabric chaincode install -i
bdk fabric chaincode approve -i