const Web3 = require("web3");
const ethers = require("ethers");

const abi = require("/mnt/c/Users/canma/Desktop/Code/priceTool/ABIs/Uniswap_V3_ABI.json");
const quoterAbi = require("/mnt/c/Users/canma/Desktop/Code/priceTool/ABIs/Uniswap_V3_Quoter_ABI.json");
const address = require("/mnt/c/Users/canma/Desktop/Code/priceTool/pair_contract_addresses/v3_pair_addresses.json");
const rpcUrl = require("/mnt/c/Users/canma/Desktop/Code/priceTool/env.js");

const web3 = new Web3(rpcUrl.w3http);
const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/49c9e554db9e4d93bdeb941b7c471d63");

/*
const ethers = Ethers.providers.InfuraProvider("mainnet", 
    {projectId: "49c9e554db9e4d93bdeb941b7c471d63", 
    projectSecret: "4b38eddbda4c489a8e7a696e32bd7648"
    });
*/


//web3.js objects
const usdc_eth_v3 = new web3.eth.Contract(abi.Abi, address.usdc_eth_v3_address);

const dai_eth_v3 = new web3.eth.Contract(abi.Abi, address.dai_eth_v3_address);

const eth_usdt_v3 = new web3.eth.Contract(abi.Abi, address.eth_usdt_v3_address);

const quoter = new web3.eth.Contract(quoterAbi.abi, address.quoter);

//ethers.js objects
const usdc_eth_ethers = new ethers.Contract(address.usdc_eth_v3_address, abi.Abi, provider);

const quoter_ethers =  new ethers.Contract(address.quoter, quoterAbi.abi, provider);

module.exports = {usdc_eth_v3, dai_eth_v3, eth_usdt_v3, quoter, usdc_eth_ethers, quoter_ethers, provider};