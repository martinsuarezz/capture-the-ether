const ethers = require('ethers');
const { url } = require('../secrets.json');

// The Contract interface
let abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "nickname",
				"type": "bytes32"
			}
		],
		"name": "setNickname",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "nicknameOf",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
console.log(url);

// Using async in order to have the await functionality
(async () => {
	//Seting up the Infura provider
	const provider = new ethers.providers.JsonRpcProvider(url);
	
	// Getting a signer
	const signer = await hre.ethers.getSigner();

	// Contract address of the challenge
	let contractAddress = "0x71c46Ed333C35e4E6c62D32dc7C8F00D125b4fee";

	let nicknameChanger = new ethers.Contract(contractAddress, abi, provider);
	const nicknameChangerWithSinger = nicknameChanger.connect(signer);
	let tx = await nicknameChangerWithSinger.setNickname(ethers.utils.formatBytes32String("suasinator"));
})();
