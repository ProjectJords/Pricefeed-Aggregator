const Web3 = require("web3");
const abi = require("/mnt/c/Users/canma/Desktop/Code/priceTool/ABIs/Uniswap_V2_ABIs.json");
const sushi_address = require("/mnt/c/Users/canma/Desktop/Code/priceTool/pair_contract_addresses/sushi_pair_addresses.json");
const rpcUrl = require("/mnt/c/Users/canma/Desktop/Code/priceTool/env.js");

const web3 = new Web3(rpcUrl.w3http);

const usdc_eth_sushi = new web3.eth.Contract(abi.v2Abi, sushi_address.usdc_eth_address);

const dai_eth_sushi = new web3.eth.Contract(abi.v2Abi, sushi_address.dai_eth_address);

const eth_usdt_sushi = new web3.eth.Contract(abi.v2Abi, sushi_address.eth_usdt_address);

module.exports = {usdc_eth_sushi, dai_eth_sushi, eth_usdt_sushi};