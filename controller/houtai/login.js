/**
 * 后台登陆控制器
 */
const crub = require("../../util/crub");
const crypto = require('crypto');
const status = require('../../util/status');
const config = require('../../config/index.json');
const ObjectId = require('mongodb').ObjectId; // mongodb ID 转换

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

    // 设置token
    setToken() {
        let _this = this,
            collection = new crub("user"),
            token = crypto.createHmac('sha256', config.key).digest('hex'),
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

    /**
     * 退出操作
     * @param id 用户ID
     */
    layout(id) {
        let _this = this,
            res = _this.res, // 返回
            collection = new crub("user"); // 用户数据表

        collection.update({
            _id: ObjectId(id)
        },{
            token: ''
        }).then(()=>{
            res.send(status.success('退出成功'));
        }).catch(()=>{
            res.send(status.fail('退出失败，请稍后重试'));
        });
    }
}

// exports.loginController = loginController;
module.exports = loginController;