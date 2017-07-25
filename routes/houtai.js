const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const crub = require("../util/crub.js");
const status = require('../util/status');
const moment = require('moment');

// 创建文章
router.post('/create-article', (req, res) => {
    let collection = new crub("list");

    let body = req.body,
        data = {
            title: body.title,
            type: body.type,
            tag: body.tag.split(","),
            content: body.content
        };

    data.isDelete = 0;
    data.startDate = moment().format('YYYY-MM-ss hh:mm:ss');

    collection.create(data).then((item) => {
        res.send(status.success("创建成功"));
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
            content: body.content
        };

    data.startDate = moment().format('YYYY-MM-ss hh:mm:ss');

    if (articleId) {
        collection.update({"_id": ObjectId(articleId)}, data).then((item) => {
            res.send(status.success("编辑成功"));
        })
    } else {
        res.send(status.fail("参数错误，缺少articleId"));
    }

});

// 删除文章
router.get('/delete-article', (req, res) => {
    let collection = new crub("list"),
        articleId = req.query.articleId;

    if (articleId) {
        collection.update({_id: ObjectId(articleId)},{'isDelete': 1}).then((item) => {
            res.send(status.success("删除成功"));
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
        })
    } else {
        res.send(status.fail("参数错误，缺少articleId"));
    }

});


// 获取文章列表
router.get("/get-article-list", (req, res) => {
    let collection = new crub("list");

    collection.find({'isDelete':0}).then((item) => {
        res.send(status.success(item));
    })
});

module.exports = router;