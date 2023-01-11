import { Pool } from 'v3-sdk'
import { Token } from '@uniswap/sdk-core'
import { ethers } from 'ethers'
const QuoterABI = require("/mnt/c/Users/canma/Desktop/Code/priceTool/ABIs/Uniswap_V3_Quoter_ABI.js")
const IUniswapV3PoolABI = require("/mnt/c/Users/canma/Desktop/Code/priceTool/ABIs/Uniswap_V3_ABI.js")
const provider = require("/mnt/c/Users/canma/Desktop/Code/priceTool/contract_objects/v3_objects.js")
const calc = require("/mnt/c/Users/canma/Desktop/Code/priceTool/Calculations.js")

/* 

[x] custom amount input from calculation.js
[] usdt:eth pricing
[] fix dai:eth pricing
[] set pricing to export to calculator.js

*/


// stores pool address
let poolAddress : string

// stores pool contract object
let poolContract : any

// assign an input amount for the swap
let amountIn = calc.amountIn

const quoterAddress = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'

const quoterContract = new ethers.Contract(quoterAddress, QuoterABI.abi, provider.provider)

const INTERVAL = 1000

//price
let usdc_eth_price
let dai_eth_price
let usdt_eth_price

// Storage of pool immutable values
interface Immutables {
  factory: string
  token0: string
  token1: string
  fee: number
  tickSpacing: number
  maxLiquidityPerTick: ethers.BigNumber
}

// Storage of pool state
interface State {
  liquidity: ethers.BigNumber
  sqrtPriceX96: ethers.BigNumber
  tick: number
  observationIndex: number
  observationCardinality: number
  observationCardinalityNext: number
  feeProtocol: number
  unlocked: boolean
}

// Gets pool immutable values (token addresses, factory address, pool fees, tick spacing, max liquidity per tick)
async function getPoolImmutables() {
  let [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] = await Promise.all([
    poolContract.factory(),
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
    poolContract.tickSpacing(),
    poolContract.maxLiquidityPerTick(),
  ])

  let immutables: Immutables = {
    factory,
    token0,
    token1,
    fee,
    tickSpacing,
    maxLiquidityPerTick,
  }
  return immutables
}

// Gets pool state 
async function getPoolState() {
  // note that data here can be desynced if the call executes over the span of two or more blocks.
  let [liquidity, slot] = await Promise.all([poolContract.liquidity(), poolContract.slot0()])

  let PoolState: State = {
    liquidity,
    sqrtPriceX96: slot[0],
    tick: slot[1],
    observationIndex: slot[2],
    observationCardinality: slot[3],
    observationCardinalityNext: slot[4],
    feeProtocol: slot[5],
    unlocked: slot[6],
  }
  return PoolState
}

// Sleep time
const sleep = (timeInMs: number) => new Promise((resolve) => setTimeout(resolve, timeInMs));


async function usdc_eth() {

  // pool address
  poolAddress = "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640"

  // changes pool object to match pair pool address
  poolContract = new ethers.Contract(poolAddress, IUniswapV3PoolABI.abi, provider.provider)

  // query the state and immutable variables of the pool
  const [immutables, state] = await Promise.all([getPoolImmutables(), getPoolState()])

  // create instances of the Token object to represent the two tokens in the given pool
  const TokenA = new Token(1, immutables.token0, 6, 'USDC', 'USD Coin')

  const TokenB = new Token(1, immutables.token1, 18, 'WETH', 'Wrapped Ether')

  // create an instance of the pool object for the given pool
  const poolExample = new Pool(
    TokenA,
    TokenB,
    immutables.fee,
    state.sqrtPriceX96.toString(), //note the description discrepancy - sqrtPriceX96 and sqrtRatioX96 are interchangable values
    state.liquidity.toString(),
    state.tick
  )

  // call the quoter contract to determine the amount out of a swap, given an amount in
  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    immutables.token0,
    immutables.token1,
    immutables.fee,
    amountIn.toString(),
    0
  )

  usdc_eth_price = await quotedAmountOut.toString()

  // print the quote and the unchecked trade instance in the console
  //console.log('The quoted amount out for usdc:eth is', usdc_eth_price)

}

async function dai_eth() {

  // pool address
  poolAddress = "0x60594a405d53811d3bc4766596efd80fd545a270"

  // changes pool object to match pair pool address
  poolContract = new ethers.Contract(poolAddress, IUniswapV3PoolABI.abi, provider.provider)

  // query the state and immutable variables of the pool
  const [immutables, state] = await Promise.all([getPoolImmutables(), getPoolState()])

  // create instances of the Token object to represent the two tokens in the given pool
  const TokenA = new Token(1, immutables.token0, 18, 'DAI', 'DAI')

  const TokenB = new Token(1, immutables.token1, 18, 'WETH', 'Wrapped Ether')

  // create an instance of the pool object for the given pool
  const poolExample = new Pool(
    TokenA,
    TokenB,
    immutables.fee,
    state.sqrtPriceX96.toString(), //note the description discrepancy - sqrtPriceX96 and sqrtRatioX96 are interchangable values
    state.liquidity.toString(),
    state.tick
  )

  // call the quoter contract to determine the amount out of a swap, given an amount in
  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    immutables.token0,
    immutables.token1,
    immutables.fee,
    amountIn.toString(),
    0
  )

  dai_eth_price = await quotedAmountOut.toString()

  // print the quote and the unchecked trade instance in the console
  console.log('The quoted amount out for dai:eth is', dai_eth_price)

}

async function usdt_eth() {

  // pool address
  poolAddress = ""

  // changes pool object to match pair pool address
  poolContract = new ethers.Contract(poolAddress, IUniswapV3PoolABI.abi, provider.provider)

  // query the state and immutable variables of the pool
  const [immutables, state] = await Promise.all([getPoolImmutables(), getPoolState()])

  // create instances of the Token object to represent the two tokens in the given pool
  const TokenA = new Token(1, immutables.token0, 18, 'USDC', 'USDC')

  const TokenB = new Token(1, immutables.token1, 18, 'WETH', 'Wrapped Ether')

  // create an instance of the pool object for the given pool
  const poolExample = new Pool(
    TokenA,
    TokenB,
    immutables.fee,
    state.sqrtPriceX96.toString(), //note the description discrepancy - sqrtPriceX96 and sqrtRatioX96 are interchangable values
    state.liquidity.toString(),
    state.tick
  )

  // call the quoter contract to determine the amount out of a swap, given an amount in
  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    immutables.token0,
    immutables.token1,
    immutables.fee,
    amountIn.toString(),
    0
  )

  // print the quote and the unchecked trade instance in the console
  console.log('The quoted amount out for dai:eth is', quotedAmountOut.toString())

}

export const start = async() => {
    while (true) {
        usdc_eth();
        await sleep(INTERVAL);
        //dai_eth();
        await sleep(INTERVAL);
        //eth_usdt();
        await sleep(INTERVAL);
    };
};

module.exports = {usdc_eth_price, dai_eth_price, usdt_eth_price, start};