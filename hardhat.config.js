/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle")

const ALCHEMY_API_KEY = "PUcQY6uVXYFeP92DJEf_i7zfuI-XdipN";
const RINKEBY_PRIVATE_KEY = "ed538cbac95b60932674bed06b0a8fe7859221e0083481535ee792cf836cb745";
module.exports = {
  solidity: "0.8.9",

  networks:{
    rinkeby:{
      url:`https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts:[`${RINKEBY_PRIVATE_KEY}`],
    },
  }
};
