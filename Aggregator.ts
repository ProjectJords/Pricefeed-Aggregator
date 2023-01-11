

//imports

// import {start} from "./v3_getter";
const v2 = require("/mnt/c/Users/canma/Desktop/Code/priceTool/Getters/v2_getter.js");
const v3 = require("/mnt/c/Users/canma/Desktop/Code/priceTool/Getters/v3_getter.ts");
const sushi = require("/mnt/c/Users/canma/Desktop/Code/priceTool/Getters/sushi_getter.js");


//Uniswap v2 states
const v2_usdc_eth_state = v2.v2_usdc_eth_state;
const v2_dai_eth_state = v2.v2_dai_eth_state;
const v2_eth_usdt_state = v2.v2_eth_usdt_state;

//Sushiswap states
const sushi_usdc_eth_state = sushi.sushi_usdc_eth_state;
const sushi_dai_eth_state = sushi.sushi_dai_eth_state;
const sushi_eth_usdt_state = sushi.sushi_eth_usdt_state;

//Uniswap v3 states
const v3_usdc_eth_price = v3.usdc_eth_price;
const v3_dai_eth_price = v3.dai_eth_price;
const v3_usdt_eth_price = v3.usdt_eth_price;

//Bancor states

//Balancer states

//Kyber Network states

//Position Size
let amountIn = 5000; //set in the front end

//Comparision logic will be handled by the bellmanford algo

//presents the data
const data = async() => {

    await console.log(
        "Uniswap v2 Usdc/Eth: " + v2_usdc_eth_state + "\n",
        "Uniswap v2 Dai/Eth: " + v2_dai_eth_state + "\n",
        "Uniswap v2 Eth/Usdt: " + v2_eth_usdt_state + "\n",
        "Sushi Usdc/Eth: " + sushi_usdc_eth_state + "\n",
        "Sushi Dai/Eth: " + sushi_dai_eth_state + "\n",
        "Sushi Eth/Usdt: " + sushi_eth_usdt_state + "\n",
        "Uniswap v3 Usdc/Eth: " + v3_usdc_eth_price + "\n",
        "Uniswap v3 Dai/Eth: " + v3_dai_eth_price + "\n",
        "Uniswap v3 Eth/Usdt: " + v3_usdt_eth_price + "\n",
    )

}

//starts getter contracts
const start = async() => {
    while(true) {
        await sushi.start();
        await v2.start();
        await v3.start();
        //await bancor.start()
        //await kyber.start()
        //await balancer.start()
        await data();

        
    };
};

module.exports = {amountIn}

start();

/*
[x] uniswap v2
[x] uniswap v3
[x] sushi swap
[] bancor
[] balancer
[] kyber network
*/