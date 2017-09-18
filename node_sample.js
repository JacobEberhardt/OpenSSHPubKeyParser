var parser = require('./parse');
var fs = require('fs');
var forge = require('node-forge');

const assert = require('assert');
const Window = require('window');

var pki = forge.pki;
var rsa = forge.pki.rsa;
var BigInteger = forge.jsbn.BigInteger;

// test: read key from file
global.window = new Window();

const openSshPubKeyFilePath = "PATH_TO_PRIVATE_KEY" // e.g. "~/.ssh/id_rsa.pub";
fs.readFile(openSshPubKeyFilePath, "utf8", function(err, pubKeyString) {
  if(err){
    console.log(err);
  } else {
    // this is how this library should be used:
    var pubKey = parser.parsePublicKey(pubKeyString);
    // create forge PubKey from n and e
    var forgePubKey = toForgePublicKey(pubKey);
    const message = "sample_message"
    // encrypt data with a public key using RSAES PKCS#1 v1.5
    var encrypted = forgePubKey.encrypt(message, 'RSAES-PKCS1-V1_5');
    fs.writeFile("OUTPUT_FILE_PATH", encrypted ,"binary"); // e.g. OUTPUT_FILE_PATH = ~/msg_encrypted

    // decrypt data with a private key (defaults to RSAES PKCS#1 v1.5) via command line:
    // openssl rsautl -decrypt -inkey PATH_TO_PRIVATE_KEY -pkcs -in ~/msg_encrypted
  }
});

function toForgePublicKey(pubKey){
  var n = charCodeArrayToHexString(pubKey.modulus)
  var e = charCodeArrayToHexString(pubKey.exponent)
  return pki.setRsaPublicKey(
    new BigInteger(n, 16),
    new BigInteger(e, 16));
}

// utitilty function
function charCodeArrayToHexString(charCodeArray) {
  return Array.from(charCodeArray, function(charCode) {
    return ('0' + charCode.toString(16)).slice(-2); // ensures padding is added correctly in hex encoding
  }).join('')
}
