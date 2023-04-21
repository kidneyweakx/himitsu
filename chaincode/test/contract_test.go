package test

import (
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	contract "member"
	"os"
	"testing"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	"github.com/hyperledger/fabric-chaincode-go/shimtest"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
	"github.com/stretchr/testify/assert"
)

var Stub *shimtest.MockStub
var Scc *contractapi.ContractChaincode

func TestMain(m *testing.M) {
	setup()
	code := m.Run()
	os.Exit(code)
}

func setup() {
	log.SetOutput(ioutil.Discard)
}

func NewStub() {
	Scc, err := contractapi.NewChaincode(new(contract.SmartContract))
	if err != nil {
		log.Println("NewChaincode failed", err)
		os.Exit(0)
	}
	Stub = shimtest.NewMockStub("main", Scc)
	MockInitLedger()
}

func Test_Register(t *testing.T) {
	fmt.Println("Test_Register-----------------")
	NewStub()

	msg, err := MockRegister("Eth Event Log")
	if err != nil {
		fmt.Println("Register error", err)
	}
	assert.Equal(t, "From Fabric -> Eth Event Log", *msg)
}

func Test_ValidateId(t *testing.T) {
	fmt.Println("Test_ValidateId-----------------")
	NewStub()

	msg, err := MockValidateId("Eth Event Log")
	if err != nil {
		fmt.Println("ValidateId error", err)
	}
	assert.Equal(t, "Eth Event Log", *msg)
}

func MockInitLedger() error {
	res := Stub.MockInvoke("uuid",
		[][]byte{
			[]byte("InitLedger"),
		})
	if res.Status != shim.OK {
		fmt.Println("MockInitLedger failed", string(res.Message))
		return errors.New("MockInitLedger error")
	}
	return nil
}

func MockValidateId(message string) (*string, error) {
	res := Stub.MockInvoke("uuid",
		[][]byte{
			[]byte("ValidateId"),
			[]byte(message),
		})
	if res.Status != shim.OK {
		fmt.Println("Return failed", string(res.Message))
		return nil, errors.New("Return error")
	}

	result := string(res.Payload[:])
	return &result, nil
}

func MockRegister(message string) (*string, error) {
	res := Stub.MockInvoke("uuid",
		[][]byte{
			[]byte("Register"),
			[]byte(message),
		})
	if res.Status != shim.OK {
		fmt.Println("Return failed", string(res.Message))
		return nil, errors.New("Return error")
	}

	result := string(res.Payload[:])
	return &result, nil
}
