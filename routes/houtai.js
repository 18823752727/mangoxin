const express = require('express');
const router = express.Router();
const crub = require("../util/crub.js");
const status = require('../util/status');
const publicFn = require('../util/publicFn');

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

    data.startDate = Date.now();

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

    data.startDate = Date.now();

    collection.update({"_id":articleId},data).then((item) => {
        res.send(status.success("编辑成功"));
    })
});

// 获取文章列表
router.get("/get-article-list",(req,res) =>{
    let collection = new crub("list");

    collection.find().then((item)=>{
        res.send(status.success(item));
    })
});

module.exports = router;