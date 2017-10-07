/**
 * 后台登陆控制器
 */
const crub = require("../../util/crub");
const crypto = require('crypto');
const status = require('../../util/status');
const config = require('../../config/index.json');

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

    // 校验登录token
    // settingToken(data) {
    //     let _this = this;
    //
    //     return new Promise((resolve, reject) => {
    //         // 如果token不存在或者token过期，就重新获取
    //         if (!data.token || Date.now() > data.endDate) {
    //             // 设置token
    //             _this.setToken().then((token) => {
    //                 resolve({
    //                     token
    //                 });
    //             }).catch((error) => {
    //                 console.log(error);
    //             });
    //         } else {
    //             resolve({
    //                 token: data.token
    //             });
    //         }
    //     })
    //
    // }

    // 设置token
    setToken() {
        let _this = this,
            collection = new crub("user"),
            token = crypto.createHmac('sha256', 'key')
                .update(config.key)
                .digest('hex'),
            updateData = {
                token,
                endDate: Date.now() + 30 * 60 * 1000
            };

        return new Promise((resolve, reject) => {
            collection.update(_this.data, updateData).then((item) => {
                resolve({
                    token
                });
            }, (error) => {
                reject(error + '设置token');
            }).catch((error) => {
                reject(error + '设置token');
            });
        });

    }

    // 登录操作
    login() {
        let _this = this,
            res = _this.res, // 返回
            collection = new crub("user"); // 用户数据表

        // 查询用户信息
        collection.find(_this.data).then((item) => {
            let userInfo = item[0];

            if (!item.length) {
                res.send(status.fail('登录失败，请输入正确的用户名或密码'));
            } else {
                // 设置token
                _this.setToken().then((result) => {
                    res.send(status.success({
                        token: result.token,
                        userId: userInfo._id,
                        userName: userInfo.user
                    }));
                },(error)=>{
                    res.send(status.fail('设置token失败，请稍后重试'));
                }).catch((error)=>{
                    res.send(status.fail('设置token失败，请稍后重试'));
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    }
}

// exports.loginController = loginController;
module.exports = loginController;