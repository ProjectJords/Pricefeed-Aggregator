const Web3 = require("web3");

const v2abi = require("/mnt/c/Users/canma/Desktop/Code/priceTool/ABIs/Uniswap_V2_ABIs.json");
const v2address = require("/mnt/c/Users/canma/Desktop/Code/priceTool/pair_contract_addresses/v2_pair_contract_addresses.json");
const rpcUrl = require("/mnt/c/Users/canma/Desktop/Code/priceTool/env.js");

const web3 = new Web3(rpcUrl.w3http);

const usdc_eth_v2 = new web3.eth.Contract(v2abi.v2Abi, v2address.usdc_eth_v2_address);

const dai_eth_v2 = new web3.eth.Contract(v2abi.v2Abi, v2address.dai_eth_v2_address);

const eth_usdt_v2 = new web3.eth.Contract(v2abi.v2Abi, v2address.eth_usdt_v2_address);

const v2addresses = [usdc_eth_v2, dai_eth_v2, eth_usdt_v2];

module.exports = {usdc_eth_v2, dai_eth_v2, eth_usdt_v2};