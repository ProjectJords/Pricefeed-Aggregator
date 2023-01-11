const Web3 = require("web3");

const abi = require("/mnt/c/Users/canma/Desktop/Code/priceTool/ABIs/BancorNetworkInfo_ABI.json");
const address = require("/mnt/c/Users/canma/Desktop/Code/priceTool/pair_contract_addresses/bancor_addresses.json");
const rpcUrl = require("/mnt/c/Users/canma/Desktop/Code/priceTool/env.js");

const web3 = new Web3(rpcUrl.w3http);

const usdc = new web3.eth.Contract(abi.Abi, address.usdc);

const dai = new web3.eth.Contract(abi.Abi, address.dai);

const weth = new web3.eth.Contract(abi.Abi, address.weth);

const network_info = new web3.eth.Contract(abi.Abi, address.network_info)

module.exports = {usdc, dai, weth, network_info};