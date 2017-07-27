const express = require('express');
const router = express.Router();
const crub = require('../util/crub.js');
const Aes = require('../util/crypto');
const status = require('../util/status');

/* GET users listing. */
router.get('/', function (req, res, next) {
    let key = "6c548741723eb60d16d38cd6215007d5b3a6ef9f",
        data = "这是个秘钥";

    let encrypt = Aes.aesEncrypt(data, key);
    let decrypt = Aes.aesDecrypt(encrypt, key);

    console.log(data);
    console.log("加密" + encrypt);
    console.log("解密" + decrypt);
    res.send("dsad");

});

module.exports = router;