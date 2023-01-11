"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var v3_sdk_1 = require("v3-sdk");
var sdk_core_1 = require("@uniswap/sdk-core");
var ethers_1 = require("ethers");
var QuoterABI = require("/mnt/c/Users/canma/Desktop/Code/priceTool/ABIs/Uniswap_V3_Quoter_ABI.js");
var IUniswapV3PoolABI = require("/mnt/c/Users/canma/Desktop/Code/priceTool/ABIs/Uniswap_V3_ABI.js");
var provider = require("/mnt/c/Users/canma/Desktop/Code/priceTool/contract_objects/v3_objects.js");
var calc = require("/mnt/c/Users/canma/Desktop/Code/priceTool/Calculations.js");
/*

[x] custom amount input from calculation.js
[] usdt:eth pricing
[] fix dai:eth pricing
[] set pricing to export to calculator.js

*/
// stores pool address
var poolAddress;
// stores pool contract object
var poolContract;
// assign an input amount for the swap
var amountIn = calc.amountIn;
var quoterAddress = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6';
var quoterContract = new ethers_1.ethers.Contract(quoterAddress, QuoterABI.abi, provider.provider);
var INTERVAL = 1000;
//price
var usdc_eth_price;
var dai_eth_price;
var usdt_eth_price;
// Gets pool immutable values (token addresses, factory address, pool fees, tick spacing, max liquidity per tick)
function getPoolImmutables() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick, immutables;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        poolContract.factory(),
                        poolContract.token0(),
                        poolContract.token1(),
                        poolContract.fee(),
                        poolContract.tickSpacing(),
                        poolContract.maxLiquidityPerTick(),
                    ])];
                case 1:
                    _a = _b.sent(), factory = _a[0], token0 = _a[1], token1 = _a[2], fee = _a[3], tickSpacing = _a[4], maxLiquidityPerTick = _a[5];
                    immutables = {
                        factory: factory,
                        token0: token0,
                        token1: token1,
                        fee: fee,
                        tickSpacing: tickSpacing,
                        maxLiquidityPerTick: maxLiquidityPerTick
                    };
                    return [2 /*return*/, immutables];
            }
        });
    });
}
// Gets pool state 
function getPoolState() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, liquidity, slot, PoolState;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([poolContract.liquidity(), poolContract.slot0()])];
                case 1:
                    _a = _b.sent(), liquidity = _a[0], slot = _a[1];
                    PoolState = {
                        liquidity: liquidity,
                        sqrtPriceX96: slot[0],
                        tick: slot[1],
                        observationIndex: slot[2],
                        observationCardinality: slot[3],
                        observationCardinalityNext: slot[4],
                        feeProtocol: slot[5],
                        unlocked: slot[6]
                    };
                    return [2 /*return*/, PoolState];
            }
        });
    });
}
// Sleep time
var sleep = function (timeInMs) { return new Promise(function (resolve) { return setTimeout(resolve, timeInMs); }); };
function usdc_eth() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, immutables, state, TokenA, TokenB, poolExample, quotedAmountOut;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // pool address
                    poolAddress = "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640";
                    // changes pool object to match pair pool address
                    poolContract = new ethers_1.ethers.Contract(poolAddress, IUniswapV3PoolABI.abi, provider.provider);
                    return [4 /*yield*/, Promise.all([getPoolImmutables(), getPoolState()])
                        // create instances of the Token object to represent the two tokens in the given pool
                    ];
                case 1:
                    _a = _b.sent(), immutables = _a[0], state = _a[1];
                    TokenA = new sdk_core_1.Token(1, immutables.token0, 6, 'USDC', 'USD Coin');
                    TokenB = new sdk_core_1.Token(1, immutables.token1, 18, 'WETH', 'Wrapped Ether');
                    poolExample = new v3_sdk_1.Pool(TokenA, TokenB, immutables.fee, state.sqrtPriceX96.toString(), //note the description discrepancy - sqrtPriceX96 and sqrtRatioX96 are interchangable values
                    state.liquidity.toString(), state.tick);
                    return [4 /*yield*/, quoterContract.callStatic.quoteExactInputSingle(immutables.token0, immutables.token1, immutables.fee, amountIn.toString(), 0)];
                case 2:
                    quotedAmountOut = _b.sent();
                    return [4 /*yield*/, quotedAmountOut.toString()
                        // print the quote and the unchecked trade instance in the console
                        //console.log('The quoted amount out for usdc:eth is', usdc_eth_price)
                    ];
                case 3:
                    usdc_eth_price = _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function dai_eth() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, immutables, state, TokenA, TokenB, poolExample, quotedAmountOut;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // pool address
                    poolAddress = "0x60594a405d53811d3bc4766596efd80fd545a270";
                    // changes pool object to match pair pool address
                    poolContract = new ethers_1.ethers.Contract(poolAddress, IUniswapV3PoolABI.abi, provider.provider);
                    return [4 /*yield*/, Promise.all([getPoolImmutables(), getPoolState()])
                        // create instances of the Token object to represent the two tokens in the given pool
                    ];
                case 1:
                    _a = _b.sent(), immutables = _a[0], state = _a[1];
                    TokenA = new sdk_core_1.Token(1, immutables.token0, 18, 'DAI', 'DAI');
                    TokenB = new sdk_core_1.Token(1, immutables.token1, 18, 'WETH', 'Wrapped Ether');
                    poolExample = new v3_sdk_1.Pool(TokenA, TokenB, immutables.fee, state.sqrtPriceX96.toString(), //note the description discrepancy - sqrtPriceX96 and sqrtRatioX96 are interchangable values
                    state.liquidity.toString(), state.tick);
                    return [4 /*yield*/, quoterContract.callStatic.quoteExactInputSingle(immutables.token0, immutables.token1, immutables.fee, amountIn.toString(), 0)];
                case 2:
                    quotedAmountOut = _b.sent();
                    return [4 /*yield*/, quotedAmountOut.toString()
                        // print the quote and the unchecked trade instance in the console
                    ];
                case 3:
                    dai_eth_price = _b.sent();
                    // print the quote and the unchecked trade instance in the console
                    console.log('The quoted amount out for dai:eth is', dai_eth_price);
                    return [2 /*return*/];
            }
        });
    });
}
function usdt_eth() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, immutables, state, TokenA, TokenB, poolExample, quotedAmountOut;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // pool address
                    poolAddress = "";
                    // changes pool object to match pair pool address
                    poolContract = new ethers_1.ethers.Contract(poolAddress, IUniswapV3PoolABI.abi, provider.provider);
                    return [4 /*yield*/, Promise.all([getPoolImmutables(), getPoolState()])
                        // create instances of the Token object to represent the two tokens in the given pool
                    ];
                case 1:
                    _a = _b.sent(), immutables = _a[0], state = _a[1];
                    TokenA = new sdk_core_1.Token(1, immutables.token0, 18, 'USDC', 'USDC');
                    TokenB = new sdk_core_1.Token(1, immutables.token1, 18, 'WETH', 'Wrapped Ether');
                    poolExample = new v3_sdk_1.Pool(TokenA, TokenB, immutables.fee, state.sqrtPriceX96.toString(), //note the description discrepancy - sqrtPriceX96 and sqrtRatioX96 are interchangable values
                    state.liquidity.toString(), state.tick);
                    return [4 /*yield*/, quoterContract.callStatic.quoteExactInputSingle(immutables.token0, immutables.token1, immutables.fee, amountIn.toString(), 0)
                        // print the quote and the unchecked trade instance in the console
                    ];
                case 2:
                    quotedAmountOut = _b.sent();
                    // print the quote and the unchecked trade instance in the console
                    console.log('The quoted amount out for dai:eth is', quotedAmountOut.toString());
                    return [2 /*return*/];
            }
        });
    });
}
var start = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!true) return [3 /*break*/, 4];
                usdc_eth();
                return [4 /*yield*/, sleep(INTERVAL)];
            case 1:
                _a.sent();
                //dai_eth();
                return [4 /*yield*/, sleep(INTERVAL)];
            case 2:
                //dai_eth();
                _a.sent();
                //eth_usdt();
                return [4 /*yield*/, sleep(INTERVAL)];
            case 3:
                //eth_usdt();
                _a.sent();
                return [3 /*break*/, 0];
            case 4:
                ;
                return [2 /*return*/];
        }
    });
}); };
module.exports = { usdc_eth_price: usdc_eth_price, dai_eth_price: dai_eth_price, usdt_eth_price: usdt_eth_price, start: start };
