module.exports = {parsePublicKey};

function parsePublicKey(s) {
  var split = s.split(" ");
  var prefix = split[0];
  if (prefix !== "ssh-rsa") {
    throw ("Unknown prefix:" + prefix);
  }
  var buffer = pemToArray(split[1]); // buffer is an array of unicode characters
  var nameLen = arrayToLen(buffer.splice(0, 4));
  var type = arrayToString(buffer.splice(0, nameLen));
  if (type !== "ssh-rsa") {
    throw ("Unknown key type:" + type);
  }
  var exponentLen = arrayToLen(buffer.splice(0, 4));
  var exponent = buffer.splice(0, exponentLen);
  var keyLen = arrayToLen(buffer.splice(0, 4));
  var key = buffer.splice(0, keyLen);
  return {type: type, exponent: exponent, modulus: key, name: split[2]};
}

// utitilty functions
function stringToArray(s) {
  return s.split('').map(function (c) {
    return c.charCodeAt(); // Returns the unicode point of the character (equals UTF-16). Codepoints are in range 0x00 to 0xFF, i.e. 1 byte
  });
}

function arrayToString(a) {
  return String.fromCharCode.apply(null, a);
}

function pemToArray(pem) {
  return stringToArray(window.atob(pem)); // atob Decodes a base-64 encoded string:
}

function arrayToLen(a) {
  var result = 0, i;
  for (i = 0; i < a.length; i += 1) {
    result = result * 256 + a[i];
  }
  return result;
}
