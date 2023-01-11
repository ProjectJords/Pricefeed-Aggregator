//object imports
const sushi_address = require("/mnt/c/Users/canma/Desktop/Code/priceTool/contract_objects/sushi_objects.js");

//library imports
const Web3 = require("web3");
const Big = require("bignumber.js");

//sleep time amount ms
const INTERVAL = 500;

//states
const sushi_usdc_eth_state = {
    blocknumber: undefined,
    price: undefined
};

const sushi_dai_eth_state = {
    blocknumber: undefined,
    price: undefined
};

const sushi_eth_usdt_state = {
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

//main functions
const usdc_eth = async () => {

        contractObj = sushi_address.usdc_eth_sushi;
        
        //get reserves
        [_reserve0, _reserve1, _blockTimestampLast] = await getreserves(contractObj);

        //calculate price
        block_price = (_reserve0/_reserve1) * 10**18; //adjust***

        //update state
        sushi_usdc_eth_state.blocknumber = _blockTimestampLast;
        sushi_usdc_eth_state.price = block_price;

        await sleep(INTERVAL);
    
};

const dai_eth = async () => {
        contractObj = sushi_address.dai_eth_sushi;
        
        //get reserves
        [_reserve0, _reserve1, _blockTimestampLast] = await getreserves(contractObj);

        //calculate price
        block_price = (_reserve0/_reserve1) * 10**18; //adjust***

        //update state
        sushi_dai_eth_state.blocknumber = _blockTimestampLast;
        sushi_dai_eth_state.price = block_price;
        await sleep(INTERVAL);
};

const eth_usdt = async () => {

        contractObj = sushi_address.eth_usdt_sushi;
        
        //get reserves
        [_reserve0, _reserve1, _blockTimestampLast] = await getreserves(contractObj);

        //calculate price
        block_price = (_reserve1/_reserve0) * 10**18; //adjust***

        //update state
        sushi_eth_usdt_state.blocknumber = _blockTimestampLast;
        sushi_eth_usdt_state.price = block_price;
        await sleep(INTERVAL);
};

//start function
const start = async () =>{
        usdc_eth();
        dai_eth();
        eth_usdt();
        //console.log(sushi_usdc_eth_state, sushi_dai_eth_state, sushi_eth_usdt_state);
        await sleep(INTERVAL);
};

module.exports = {sushi_usdc_eth_state, sushi_dai_eth_state, sushi_eth_usdt_state, start}; 