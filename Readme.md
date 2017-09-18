# OpenSSHPubKeyParser

This is a little utility, which parses OpenSSH RSA public keys in pure javascript and returns modulus `n` and exponent `e`.

It can be applied to parse public keys generated for example by the ssh-keygen command line tool:
```
ssh-keygen -t rsa -b 4096 -C "some comment"
```

The implementation is based on
http://blog.oddbit.com/2011/05/08/converting-openssh-public-keys/
and
https://github.com/PatrickRoumanoff/js-keygen

## Use as Node.js module
Simply install the npm package:
```
npm i opensshpubkeyparser
```
and require the module:
```
parseOpenSSHPubKey = require('parseOpenSSHPubKey');
```

An example can be found in `node_sample.js`.
Before running it, make sure to execute `npm install` in the root directory containing `package.json` to resolve required `devDependencies`.
To run the example, simply execute `npm start`.

## Use in Browser
For in-browser use, simply import the `parser.js` file from html and remove the first line from the `parser.js` file:
```
module.exports = {parsePublicKey};
```

An example can be found in `index.html`.
