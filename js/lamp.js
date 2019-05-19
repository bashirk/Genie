let provider;
let utils;
let accounts;
let signer;
let overrides;

let rubButton;
let _ethers
let _web3

let wishData = new Array();
let logoData = new Array();
let graphicData = new Array();


//click-listener

const GenieContractAddress = "0x2fa8ad469f74ad584c6c09996a3aedd99b61233c";
const GenieABI =[
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_genie",
				"type": "address"
			}
		],
		"name": "ApproveGenie",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_wisher",
				"type": "address"
			}
		],
		"name": "ApproveWisher",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_wishID",
				"type": "uint256"
			},
			{
				"name": "_claimID",
				"type": "uint256"
			}
		],
		"name": "ApproveWishFulfillment",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_genie",
				"type": "address"
			}
		],
		"name": "DisapproveGenie",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_wishID",
				"type": "uint256"
			},
			{
				"name": "_submission",
				"type": "string"
			}
		],
		"name": "fulfillWish",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_wishReward",
				"type": "uint256"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_description",
				"type": "string"
			}
		],
		"name": "GenieMakeWish",
		"outputs": [
			{
				"name": "wishID",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "wisher",
				"type": "address"
			},
			{
				"name": "nonce",
				"type": "uint256"
			},
			{
				"name": "signature",
				"type": "bytes"
			}
		],
		"name": "grantWish",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_wishReward",
				"type": "uint256"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_description",
				"type": "string"
			}
		],
		"name": "MakeWish",
		"outputs": [
			{
				"name": "wishID",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "rubLamp",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "from",
				"type": "address"
			},
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "reward",
				"type": "uint256"
			},
			{
				"name": "Industry",
				"type": "string"
			},
			{
				"name": "Usage",
				"type": "string"
			},
			{
				"name": "Dimensions",
				"type": "string"
			},
			{
				"name": "Notes",
				"type": "string"
			},
			{
				"name": "imageRef1",
				"type": "string"
			},
			{
				"name": "imageRef2",
				"type": "string"
			}
		],
		"name": "wishForGraphic",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "reward",
				"type": "uint256"
			},
			{
				"name": "BrandName",
				"type": "string"
			},
			{
				"name": "Industry",
				"type": "string"
			},
			{
				"name": "Competitors",
				"type": "string"
			},
			{
				"name": "Notes",
				"type": "string"
			},
			{
				"name": "imageRef1",
				"type": "string"
			},
			{
				"name": "imageRef2",
				"type": "string"
			},
			{
				"name": "color1",
				"type": "string"
			},
			{
				"name": "color2",
				"type": "string"
			}
		],
		"name": "wishForLogo",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "wisher",
				"type": "address"
			}
		],
		"name": "Granted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "_balances",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "_decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "_name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
		"name": "_nonces",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "_symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
		"name": "genies",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getGraphic",
		"outputs": [
			{
				"components": [
					{
						"name": "Industry",
						"type": "string"
					},
					{
						"name": "Usage",
						"type": "string"
					},
					{
						"name": "Dimensions",
						"type": "string"
					},
					{
						"name": "Notes",
						"type": "string"
					},
					{
						"name": "imageRef1",
						"type": "string"
					},
					{
						"name": "imageRef2",
						"type": "string"
					}
				],
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getLogo",
		"outputs": [
			{
				"components": [
					{
						"name": "BrandName",
						"type": "string"
					},
					{
						"name": "Industry",
						"type": "string"
					},
					{
						"name": "Competitors",
						"type": "string"
					},
					{
						"name": "Notes",
						"type": "string"
					},
					{
						"name": "imageRef1",
						"type": "string"
					},
					{
						"name": "imageRef2",
						"type": "string"
					},
					{
						"name": "color1",
						"type": "string"
					},
					{
						"name": "color2",
						"type": "string"
					}
				],
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "sender",
				"type": "address"
			}
		],
		"name": "getNonce",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numWishes",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "wisher",
				"type": "address"
			},
			{
				"name": "nonce",
				"type": "uint256"
			}
		],
		"name": "payloadToSign",
		"outputs": [
			{
				"name": "payload",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "wisher",
				"type": "address"
			},
			{
				"name": "payload",
				"type": "bytes32"
			},
			{
				"name": "signature",
				"type": "bytes"
			}
		],
		"name": "verifyApproval",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "pure",
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
		"name": "wishers",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "wishes",
		"outputs": [
			{
				"name": "wisher",
				"type": "address"
			},
			{
				"name": "reward",
				"type": "uint256"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "description",
				"type": "string"
			},
			{
				"name": "active",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
let GenieContract;

async function initialize(ethers,web3) {
	await ethereum.enable()
	_ethers = ethers;
	_web3 = web3;
	console.log(_ethers)
  provider = new _ethers.providers.Web3Provider(_web3.currentProvider);
  utils = _ethers.utils;
  accounts = await provider.listAccounts();

  signer = provider.getSigner(accounts[0]);

    GenieContract = new ethers.Contract(GenieContractAddress, GenieABI, signer);

    console.log(GenieContract)

    // rubButton.addEventListener('click', function() {
    //     rubLamp();
    //     console.log('clicked')
    // })
		console.log("aaa")
getWishes();
await readWishes()
    overrides = {
      gasLimit:2000000
    }
}

async function rubLamp(){
	await GenieContract.rubLamp();
}

async function getWishes(){
	console.log("bbb")
	let balance = await GenieContract.balanceOf(signer._address);
	balance = parseInt(balance,0);

	document.getElementById("wishId").innerHTML = balance;
}

async function rubLampSign() {

	console.log(_ethers)

  let nonce = await GenieContract.getNonce(signer._address);
	console.log(nonce)

  let payloadToSign = await GenieContract.payloadToSign(signer._address,nonce);

  let arrayifiedGameHash = _ethers.utils.arrayify(payloadToSign)
console.log(signer)
  let flatSig = await signer.signMessage(arrayifiedGameHash)
  console.log(nonce);

  await GenieContract.grantWish(signer._address,nonce,flatSig,overrides)

  //let verified = await WishContract.verifyApproval(signer._address,payloadToSign,flatSig);

  console.log(verified)

}
//ADMIN FUNCTIONS
async function ApproveGenie() {
	let address
	await GenieContract.ApproveGenie(address,overrides);
}

async function ApproveWisher(){
	let address

	await GenieContract.ApproveWisher(address,overrides);

}

async function DisapproveGenie() {
	let address

	await GenieContract.DisApproveGenie(address,overrides);

}

async function MakeWish() {
	let wishReward;
	let name;
	let description;
	await GenieContract.MakeWish(wishReward,name,description,overrides)
}

async function wishForLogo() {
		let reward = 1;
		let BrandName = document.getElementById("logo_BrandName").value;
		let Industry = document.getElementById("logo_Industry").value;
		let Competitors = document.getElementById("logo_KeyCompetitors").value;
		let Notes = document.getElementById("logo_Notes").value;
		let imageRef1 = document.getElementById("logo_WorkRef1").value;
		let imageRef2 = document.getElementById("logo_WorkRef2").value;
		let color1 = document.getElementById("logo_BrandColor1").value;
		let color2 = document.getElementById("logo_BrandColor2").value;

		await GenieContract.wishForLogo(reward,BrandName,Industry,Competitors,Notes,imageRef1,imageRef2,color1,color2);
}

async function wishForGraphic() {
		let reward = 1;
		let Industry = document.getElementById("graphic_Industry").value;
		let Usage = document.getElementById("graphic_Usage").value;
		let Dimensions = document.getElementById("graphic_Dimensions").value;
		let Notes = document.getElementById("graphic_Notes").value;
		let imageRef1 = document.getElementById("graphic_WorkRef1").value;
		let imageRef2 = document.getElementById("graphic_WorkRef2").value;

		await GenieContract.wishForGraphic(reward,Industry,Usage,Dimensions,Notes,imageRef1,imageRef2);

}

async function readWishes(){
	let numWishes = await GenieContract.numWishes();
	for(i=0;i<numWishes;i++){

			wishData[i]= await GenieContract.wishes(i)
			logoData[i] = await GenieContract.getLogo(i)
			graphicData[i] = await GenieContract.getGraphic(i)

	}
}

async function dispense() {
	let provider = ethers.getDefaultProvider('rinkeby');

	let address = signer._address;
	let key = ""
	let wallet = new ethers.Wallet(key,provider);
	let FaucetAddress = "0xab1db8b62b06255b0148ebe1dc167ee534051415";
	let FaucetABI =[
	{
		"constant": false,
		"inputs": [
			{
				"name": "a",
				"type": "address"
			}
		],
		"name": "dispense",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	}
]

	let FaucetContract = new _ethers.Contract(FaucetAddress,FaucetABI,wallet);

	await FaucetContract.dispense(address);

	window.alert("ether sent");

}
