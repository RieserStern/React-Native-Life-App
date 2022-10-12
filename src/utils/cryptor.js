var CryptoJS = require("crypto-js");

const crypto_key = CryptoJS.enc.Utf8.parse("-tM=Yn=7pEVXXGrd");

const crypto_iv = CryptoJS.enc.Utf8.parse("AypfS&2wGr59*_U%");

export const encrypt = (value) => {
  const enc = CryptoJS.AES.encrypt(value, crypto_key, { iv: crypto_iv });

  return enc.toString(CryptoJS.format.Hex);
};

export const decrypt = (value) => {
  const dec = CryptoJS.AES.decrypt(value, crypto_key, {
    iv: crypto_iv,
    format: CryptoJS.format.Hex,
  });

  return dec.toString(CryptoJS.enc.Utf8);
};

export const getmd5 = (data) => {
  return CryptoJS.MD5(data).toString();
};
