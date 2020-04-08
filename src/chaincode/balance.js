const Web3 = require("web3");
const config = require("./config.js");

var web3 = new Web3(config.provider);

const wallet = web3.eth.accounts.wallet;

wallet.add(config.privateKey1);
wallet.add(config.privateKey2);

const ChildERC20 = require("../../build/contracts/ChildERC20.json");
const ChildERC721 = require("../../build/contracts/ChildERC721.json");

const CHE = new web3.eth.Contract(ChildERC20.abi, config.erc20);
const NFT = new web3.eth.Contract(ChildERC721.abi, config.erc721);

async function displayBalance() {
  console.log("--- Acc1 balance ---");
  await CHE.methods
    .balanceOf(wallet[0].address)
    .call()
    .then((res) => {
      console.log("ERC 20 balance: \t\t" + wallet[0].address + ":\t" + res);
    });
  await NFT.methods
    .balanceOf(wallet[0].address)
    .call()
    .then((res) => {
      console.log("ERC 721 balance: \t\t" + wallet[0].address + ":\t" + res);
    });

  console.log("\n");
  console.log("--- Acc2 balance ---");
  await CHE.methods
    .balanceOf(wallet[1].address)
    .call()
    .then((res) => {
      console.log("ERC 20 balance: \t\t" + wallet[1].address + ":\t" + res);
    });
  await NFT.methods
    .balanceOf(wallet[1].address)
    .call()
    .then((res) => {
      console.log("ERC 721 balance: \t\t" + wallet[1].address + ":\t" + res);
    });

  console.log("\n");
  console.log("--- NFT " + config.tokenid + " owner ---");
  await NFT.methods
    .ownerOf(config.tokenid)
    .call()
    .then(
      (res) => {
        if (res)
          console.log("owner of token id " + config.tokenid + ":\t" + res);
      },
      (err) => {
        console.log(
          err
        );
      }
    );
}

displayBalance();
