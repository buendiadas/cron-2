# Cron

[![Build Status](https://travis-ci.com/carlos-buendia/cron-solidity.svg?token=DJeMzxJJncp3nRaEUuxH&branch=develop)](https://travis-ci.com/carlos-buendia/cron-solidity)
[![codecov](https://codecov.io/gh/Frontier-project/cron/branch/master/graph/badge.svg?token=BGbU5Q6IRV)](https://codecov.io/gh/Frontier-project/cron)



## About

The project adds a library to easily divide the time spectrum in epochs, enabling to schedule state changes on Ethereum. 

## Motivation

An interface simmilar to Cron in Ethereum would have the following benefits: 

 * **Interoperability**: By decoupling the scheduling logic, Smart Contracts and external services (oracles) can easily sync their clocks.
 * **Programability**: Most Smart Contracts develop their own arithmetic rules every time they want to schedule periodic changes. The complexity of coding an arbitrarily complex rule may prevent the developer to include it
 * **Security**: Relaying all programable logic to a single trusted source.


## Install
In order to install the library, just run the following commands on your root solidity directory

```bash
npm init -y
npm i -E solidity-cron
```

## How to use

The rationale of the project is to make it easy for developers to deploy and use their cron signal and can be done in two easy steps: 

### 1. Deploying a new cron
  `npm run deploy`
  
### 2. Include the Periodic Interface

```javascript
import "@frontier-token-research/contracts/Period.sol";
```

### 3. Use it in your project

```javascript
Period MyDAppPeriod = new Period(T)
uint256 currentPeriod =  myDappPeriod.getCurrentPeriod();
```


## Testing

You can always use the truffle package to test and contribute to the library. The package needs from a running Ethereum rpc instance in `localhost`, port `8545`. You can run a [ganache-cli](https://github.com/trufflesuite/ganache-cli) instance or run [geth](https://github.com/ethereum/go-ethereum). You can run the tests by just running:

```bash
truffle test
```


## Contributing

If you want to contribute, just open a PR making sure your commits follow Angular [Git Commit guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines), to follow `semantic-release`versioning.

