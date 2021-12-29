const { url } = require('../../secrets.json');

// Using async in order to have the await functionality
(async () => {
	//Seting up the Infura provider
	const provider = new ethers.providers.JsonRpcProvider(url);
	
	// Getting a signer
	const signer = await hre.ethers.getSigner();

	// Contract address of the challenge
	const contractAddress = "0xD32f20Db3018021f8870B5FAf5023506D91a9Adb";
	const GuessTheNewNumber = await ethers.getContractFactory("GuessTheNewNumber");
	const guessTheNewNumber = await GuessTheNewNumber.deploy(contractAddress, {
		gasLimit: 250000,
		value: ethers.utils.parseEther("1.0")
	});
	console.log(guessTheNewNumber);
})();
