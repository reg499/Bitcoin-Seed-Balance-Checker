// npm i bitcoinjs-lib@4.0.5
// npm i bip39@3.0.4

const bitcoin = require("bitcoinjs-lib");
const bip39 = require("bip39");
const axios = require("axios");

const mnemonic = "12 MNEMONIC";

const seed = bip39.mnemonicToSeedSync(mnemonic);
const root = bitcoin.bip32.fromSeed(seed);

const p2pkhPath = "m/44'/0'/0'/0/0";
const keyPairP2PKH = root.derivePath(p2pkhPath);
const { address: p2pkhAddress } = bitcoin.payments.p2pkh({
  pubkey: keyPairP2PKH.publicKey,
});

const p2shPath = "m/49'/0'/0'/0/0";
const keyPairP2SH = root.derivePath(p2shPath);
const { address: p2shAddress } = bitcoin.payments.p2sh({
  redeem: bitcoin.payments.p2wpkh({ pubkey: keyPairP2SH.publicKey }),
});

const bech32Path = "m/84'/0'/0'/0/0";
const keyPairBech32 = root.derivePath(bech32Path);
const { address: bech32Address } = bitcoin.payments.p2wpkh({
  pubkey: keyPairBech32.publicKey,
});

const privateKeyP2PKH = keyPairP2PKH.toWIF();
const privateKeyP2SH = keyPairP2SH.toWIF();
const privateKeyBech32 = keyPairBech32.toWIF();

console.log(`P2PKH Address: ${p2pkhAddress}`);
console.log(`P2SH Address: ${p2shAddress}`);
console.log(`Bech32 Address: ${bech32Address}`);

console.log(`P2PKH Private Key: ${privateKeyP2PKH}`);
console.log(`P2SH Private Key: ${privateKeyP2SH}`);
console.log(`Bech32 Private Key: ${privateKeyBech32}`);

// Balance Checker

// const getBalance = async (address) => {
//   try {
//     const response = await axios.get(
//       `https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`
//     );
//     return response.data.balance / 1e8; // Convert from satoshi to BTC
//   } catch (error) {
//     console.error(`Error fetching balance for address ${address}:`, error);
//     return null;
//   }
// };

// (async () => {
//   console.log(`P2PKH Address: ${p2pkhAddress}`);
//   console.log(`P2SH Address: ${p2shAddress}`);
//   console.log(`Bech32 Address: ${bech32Address}`);

//   console.log(`P2PKH Private Key: ${privateKeyP2PKH}`);
//   console.log(`P2SH Private Key: ${privateKeyP2SH}`);
//   console.log(`Bech32 Private Key: ${privateKeyBech32}`);

//   const balanceP2PKH = await getBalance(p2pkhAddress);
//   const balanceP2SH = await getBalance(p2shAddress);
//   const balanceBech32 = await getBalance(bech32Address);

//   console.log(`P2PKH Address Balance: ${balanceP2PKH} BTC`);
//   console.log(`P2SH Address Balance: ${balanceP2SH} BTC`);
//   console.log(`Bech32 Address Balance: ${balanceBech32} BTC`);
// })();
