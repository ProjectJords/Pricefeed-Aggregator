//object imports
const v2address = require("/mnt/c/Users/canma/Desktop/Code/priceTool/contract_objects/v2_objects.js");

//library imports
const Web3 = require("web3");
const Big = require("bignumber.js");

//sleep time amount ms
const INTERVAL = 500;

//states
const v2_usdc_eth_state = {
    blocknumber: undefined,
    price: undefined
};

const v2_dai_eth_state = {
    blocknumber: undefined,
    price: undefined
};

const v2_eth_usdt_state = {
    blocknumber: undefined,
    price: undefined
};

const isOn = true || false;


//rest function
const sleep = (timeInMs) => new Promise((resolve) => setTimeout(resolve, timeInMs));

//get reserves function
const getreserves = async(Obj) => {

    const _reserves = await Obj.methods.getReserves().call();

    return [_reserves._reserve0, _reserves._reserve1, _reserves._blockTimestampLast];
};

/*
Define getAmountOut function to calculate the token amount out for standardization across pools
Include in calculation:
    - fee
    - price * amountIn - fee
*/

//main functions
const usdc_eth = async () => {

        contractObj = v2address.usdc_eth_v2;
        
        //get reserves
        [_reserve0, _reserve1, _blockTimestampLast] = await getreserves(contractObj);

        //calculate price
        block_price = (_reserve0/_reserve1) * 10**18; //adjust***

        //update state
        v2_usdc_eth_state.blocknumber = _blockTimestampLast;
        v2_usdc_eth_state.price = block_price;

        await sleep(INTERVAL);

    
};

const dai_eth = async () => {
        contractObj = v2address.dai_eth_v2;
        
        //get reserves
        [_reserve0, _reserve1, _blockTimestampLast] = await getreserves(contractObj);

        //calculate price
        block_price = (_reserve0/_reserve1) * 10**18; //adjust***

        //update state
        v2_dai_eth_state.blocknumber = _blockTimestampLast;
        v2_dai_eth_state.price = block_price;
        await sleep(INTERVAL);
};

const eth_usdt = async () => {

        contractObj = v2address.eth_usdt_v2;
        
        //get reserves
        [_reserve0, _reserve1, _blockTimestampLast] = await getreserves(contractObj);

        //calculate price
        block_price = (_reserve1/_reserve0) * 10**18; //adjust***

        //update state
        v2_eth_usdt_state.blocknumber = _blockTimestampLast;
        v2_eth_usdt_state.price = block_price;
        await sleep(INTERVAL);
};

//start function
const start = async () =>{
    
        usdc_eth();
        dai_eth();
        eth_usdt();
        //console.log(v2_usdc_eth_state, v2_dai_eth_state, v2_eth_usdt_state);
        await sleep(INTERVAL);
    
};

module.exports = {v2_usdc_eth_state, v2_dai_eth_state, v2_eth_usdt_state, start};
