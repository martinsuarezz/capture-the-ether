const { url } = require('../../secrets.json');

// Using async in order to have the await functionality
(async () => {
	//Seting up the Infura provider
	const provider = new ethers.providers.JsonRpcProvider(url);
	
	// Getting a signer
	const signer = await hre.ethers.getSigner();

	// Contract address of the challenge
	const contractAddress = "0xF47169809fe29586565a40EFa64415CD66f6f18a";
	const PredictTheFuture = await ethers.getContractFactory("PredictTheFuture");
	
	const predictTheFuture = await PredictTheFuture.deploy(contractAddress, {
		gasLimit: 500000,
		value: ethers.utils.parseEther("1.0")
	});

	await predictTheFuture.deployed();

	while (true){
		try{
			let tx = await predictTheFuture.settle({
				gasLimit: 250000
			});
			const receipt = await tx.wait();
			console.log(receipt);
			break;
		}
		catch (error){
			continue;
		}
	}
})();
