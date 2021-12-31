const { url } = require('../../secrets.json');

// Using async in order to have the await functionality
(async () => {
	// Getting a signer
	const signer = await hre.ethers.getSigner();
				
	const challengeAddr = "0x70Aca5BD6D77599eFba84be8379A813ADd9416e4";

	const TokenSale = await ethers.getContractFactory("TokenSale");
	const tokenSale = await TokenSale.deploy(challengeAddr,
		{value: ethers.utils.parseEther("1.0")});

	await tokenSale.deployed();

	let tx = await tokenSale.attack();
	console.log(tx);
})();
