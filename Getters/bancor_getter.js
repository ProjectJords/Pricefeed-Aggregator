//Bancor

const obj = require("/mnt/c/Users/canma/Desktop/Code/priceTool/contract_objects/bancor_objects.js");
const address = require("/mnt/c/Users/canma/Desktop/Code/priceTool/pair_contract_addresses/bancor_addresses.json");

//library imports
const Web3 = require("web3");
const Big = require("bignumber.js");
const math = require("mathjs");
const { network_info } = require("../contract_objects/bancor_objects");

//sleep time amount ms
const INTERVAL = 500;


const main = async() => {
    
    to = address.dai;
    from = address.eth;

    dai_eth = await network_info.methods.tradeOutputBySourceAmount(from, to, 1).call();

    console.log(dai_eth);
}

main();




// weth is only used in swaps to eth

//does it make more sense to compare the token prices or the token in/out amounts?



/*
Bancor uses a omnipool structure, because of this price information must be derived from BNT ratios.
The omnipool routes all pair swaps through BNT and determines the price by comparing all tokens to the BNT token.

e.g. 1 dai = 2 bnt, 1 eth = 2000 bnt, therefore 1 eth = 1000 dai

eth price in bnt divided by the dai price in bnt 
bETH / bDAI = eth , 2000 / 2 = 1000
*/