const ethers = require('ethers');
const keccak256 = require('keccak256');
const { url } = require('../../secrets.json');

// The Contract interface
let abi = [{"constant":false,"inputs":[{"name":"n","type":"uint8"}],"name":"guess","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"isComplete","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"}];

// Function to decode the hashed number
function decodeNumber(maxNumber, hashedNumber){
	for (let i = 0; i < maxNumber; i++){
		if (keccak256(i).toString('hex') == hashedNumber)
			return i;
	}
	return undefined;
}

// Using async in order to have the await functionality
(async () => {
	//Seting up the Infura provider
	const provider = new ethers.providers.JsonRpcProvider(url);
	
	// Getting a signer
	const signer = await hre.ethers.getSigner();

	// Contract address of the challenge
	let contractAddress = "0x2F18952Bc12e7b08fEdEF2580a62d8bf02199Dea";

	const guessTheSecretNumber = new ethers.Contract(contractAddress, abi, provider);
	const guessTheSecretNumberWithSigner = guessTheSecretNumber.connect(signer);
	const secretNumber = decodeNumber(2 ** 8, "db81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365")
	let tx = await guessTheSecretNumberWithSigner.guess(secretNumber, {value: ethers.utils.parseEther("1.0")});
    console.log(tx);
})();
