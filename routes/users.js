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

router.post('/login', function (req, res) {
    let collection = new crub("user"),
        body = req.body,
        postData = {
            user: body.user,
            password: body.password
        };

    collection.find(postData).then((item) => {
        if (item.length > 0) {
            req.session.regenerate((err) => {
                if (err) {
                    res.send(status.fail("登陆失败,session保存失败"))
                }else {
                    req.session.userStatus = "sss";
                    res.send(status.success("登录成功"));
                }
            })

        } else {
            res.send(status.fail("登录失败，请重新输入"));
        }
    });

    console.log(req.session.userStatus);
});

module.exports = router;