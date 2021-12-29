const ethers = require('ethers');
const { url } = require('../../secrets.json');

// The Contract interface
let abi = [{"constant":false,"inputs":[{"name":"n","type":"uint8"}],"name":"guess","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"isComplete","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"}];

// Using async in order to have the await functionality
(async () => {
	//Seting up the Infura provider
	const provider = new ethers.providers.JsonRpcProvider(url);
	
	// Getting a signer
	const signer = await hre.ethers.getSigner();

	// Contract address of the challenge
	const contractAddress = "0x9a25A648F5678CA2192eb91a7f31c681aD2A8652";

	// Finding the number from contract memory
	const numberHex = await provider.getStorageAt(contractAddress, 0);

	// Parsing the hex number to decimal
	const randomNumber = parseInt(numberHex, 16);

	const guessTheRandomNumber = new ethers.Contract(contractAddress, abi, provider);
	const guessTheRandomNumberWithSigner = guessTheRandomNumber.connect(signer);
	let tx = await guessTheRandomNumberWithSigner.guess(randomNumber, {value: ethers.utils.parseEther("1.0")});
    console.log(tx);
})();
