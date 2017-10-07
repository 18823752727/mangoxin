const ObjectId = require('mongodb').ObjectId;
const crub = require("../../util/crub"); // 连接数据库操作
const status = require('../../util/status');

module.exports = function (req, res, next) {
    let query = req.query,
        collection = new crub("user"), // 用户数据表
        token = query.token, // 用户token
        userId = query.userId;  // 用户ID

    // 如果是登录操作，直接next
    if(req.url === '/login') {
        next();
        return ;
    }

    // 如果用户的ID或者token不存在，就直接返回guest
    if(!token || !userId) {
        res.send(status.guest());
    }

    // 查询用户信息，看token是否正确
    collection.find({
        _id: ObjectId(userId)
    }).then((item) => {
        if (item.length) {
            let data = item[0];

            // 如果token校验正确&&没有过期，next
            if (data.token === token && Date.now() < data.endDate) {
                collection.update({
                    "_id": ObjectId(userId)
                },{
                    'endDate': 30 * 60 * 1000
                }).then(()=>{
                    next();
                });

            }else {
                res.send(status.guest());
            }
        } else {
            res.send(status.fail('用户ID异常，请稍后重试'));
        }
    });
}