/**
 * 后台登陆控制器
 */
const ObjectId = require('mongodb').ObjectId;
const crub = require("../../util/crub");
const getCrypto = require('../../util/crypto');
const status = require('../../util/status');
const moment = require('moment');


class loginController {
    /**
     * 登录
     * @param req 请求
     * @param res 返回
     * @param data 登录信息
     */
    constructor(req, res, data) {
        let _this = this;

        _this.req = req;
        _this.res = res;
        _this.data = data;
    }

    // 设置登录token
    setToken(callback) {
        let _this = this,
            token = new crub("login_token");

        token.find(_this.data.user).then((item)=>{
            if(item.length) {

            }
        })

        if((typeof callback).toLocaleLowerCase() === 'function') {
            callback();
        }
    }

    // 登录操作
    login() {
        let _this = this,
            collection = new crub("user");

        _this.setToken(()=>{

        })

        collection.find(_this.data).then((item) => {
            console.log(item);
        });
    }
}

// exports.loginController = loginController;
module.exports = loginController;