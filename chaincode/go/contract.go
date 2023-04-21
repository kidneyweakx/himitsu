package member

import (
	"encoding/json"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing archives
type SmartContract struct {
	contractapi.Contract
}

// Event Data struct
type EventLog struct {
	BlockNumber     string `json:"block_number"`
	BlockHash       string `json:"block_hash"`
	TransactionHash string `json:"transaction_hash"`
	Event           string `json:"event"`
	Message         string `json:"message"`
}

func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	var event EventLog
	log, err := json.Marshal(event)
	if err != nil {
		return err
	}
	if log == nil {
	}
	return nil
}

func (s *SmartContract) Register(ctx contractapi.TransactionContextInterface, message string) (string, error) {
	ctx.GetStub().SetEvent("VerifyMemberRequest", []byte(message))
	return "From Fabric -> " + message, nil
}

func (s *SmartContract) ValidateId(ctx contractapi.TransactionContextInterface, message string) (string, error) {
	return message, nil
}

func (s *SmartContract) InvokeTest(ctx contractapi.TransactionContextInterface, message string) (string, error) {
	return message, nil
}

func (s *SmartContract) QueryTest(ctx contractapi.TransactionContextInterface, message string) (string, error) {
	return message, nil
}
