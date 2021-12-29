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
	let contractAddress = "0xDa4c00b339B326b7De9952E18967429E510c4A4D";

	const guessTheNumber = new ethers.Contract(contractAddress, abi, provider);
	const guessTheNumberWithSigner = guessTheNumber.connect(signer);
	let tx = await guessTheNumberWithSigner.guess(42, {value: ethers.utils.parseEther("1.0")});
    console.log(tx);
})();
