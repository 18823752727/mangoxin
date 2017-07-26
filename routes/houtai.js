const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const crub = require("../util/crub.js");
const status = require('../util/status');
const moment = require('moment');

// 请求拦截，如果当前的user为空，直接返回失败
router.get('*',(req,res,next)=>{
    console.log(req.session.userStatus);


    if(!req.session.userStatus){
        res.send(status.fail("guest"));
    }else{
        next();
    }
});

// 创建文章
router.post('/create-article', (req, res) => {
    let collection = new crub("list");

    let body = req.body,
        data = {
            title: body.title,
            type: body.type,
            tag: body.tag.split(","),
            content: body.content,
            isDelete: 0,
            startDate: moment().format('YYYY-MM-ss hh:mm:ss')
        };

    collection.create(data).then((item) => {
        res.send(status.success("创建成功"));
    }, (error) => {
        res.send(status.fail(error));
    }).catch((error) => {
        res.send(status.fail(error));
    })
});

// 编辑文章
router.post('/edit-article', (req, res) => {
    let collection = new crub("list");

    let body = req.body,
        articleId = body.articleId, // 文章Id
        data = {
            title: body.title,
            type: body.type,
            tag: body.tag.split(","),
            content: body.content,
            startDate: moment().format('YYYY-MM-ss hh:mm:ss')
        };


    if (articleId) {
        collection.update({"_id": ObjectId(articleId)}, data).then((item) => {
            res.send(status.success("编辑成功"));
        }, (error) => {
            res.send(status.fail(error));
        }).catch((error) => {
            res.send(status.fail(error));
        });
    } else {
        res.send(status.fail("参数错误，缺少articleId"));
    }

});

// 删除文章
router.get('/delete-article', (req, res) => {
    let collection = new crub("list"),
        articleId = req.query.articleId;

    if (articleId) {
        collection.update({_id: ObjectId(articleId)}, {'isDelete': 1}).then((item) => {
            res.send(status.success("删除成功"));
        }, (error) => {
            res.send(status.fail(error));
        }).catch((error) => {
            res.send(status.fail(error));
        })
    } else {
        res.send(status.fail("参数错误，缺少articleId"));
    }
});

// 获取文章数据
router.get('/get-article', (req, res) => {
    let collection = new crub("list"),
        articleId = req.query.articleId;

    if (articleId) {
        collection.find({_id: ObjectId(articleId)}).then((item) => {
            res.send(status.success(item[0]));
        }, (error) => {
            res.send(status.fail(error));
        }).catch((error) => {
            res.send(status.fail(error));
        });
    } else {
        res.send(status.fail("参数错误，缺少articleId"));
    }

});


// 获取文章列表
router.get("/get-article-list", (req, res) => {
    let collection = new crub("list"),
        page = req.query.page,
        pageSize = req.query.pageSize,
        query = {isDelete: 0};

    page = page ? page : 1;
    pageSize = pageSize ? parseInt(pageSize) : 10;
    // 获取分页数据
    collection.findByPage(query, page, pageSize).then((item) => {

        // 获取总数
        collection.findCount(query).then((count) => {
            let sendData = {
                articleList: item,
                count: count
            };

            res.send(status.success(sendData));
        }, (error) => {
            res.send(status.fail(error));
        }).catch((error) => {
            res.send(status.fail(error));
        });
    }, (error) => {
        res.send(status.fail(error));
    }).catch((error) => {
        res.send(status.fail(error));
    })
});

module.exports = router;