pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";

template hash() {
  signal input address;
  signal input value;
  signal output id;

  component hasher = Poseidon(2);
  hasher.inputs[0] <== address;
  hasher.inputs[1] <== value;

  id <== hasher.out;
}

component main{public[address]} = hash();