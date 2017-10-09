const express = require('express');
const router = express.Router();
const crub = require("../util/crub.js");
const status = require('../util/status');
const moment = require('moment');
const checkLogin = require('../controller/houtai/checkLogin'); // 登录校验中间件
const loginController = require('../controller/houtai/login'); // 登录
const articleController = require('../controller/houtai/article'); // 文章操作
// 使用登录校验
router.use(checkLogin);

// 登录
router.post('/login', function (req, res) {
    let body = req.body,
        user = body.user,
        password = body.password,
        postData = {
            user: user,
            password: password
        };

    if (!user) {
        res.send(status.fail("请输入账号"));
    } else if (!password) {
        res.send(status.fail("请输入密码"));
    } else {
        // 调用登录方法
        new loginController(req, res, postData).login();
    }
});

// 退出登录
router.get('/layout', (req, res) => {
    new loginController(req, res).layout(req.query.userId);
});

// 创建文章
router.post('/create-article', (req, res) => {
    let body = req.body,
        data = {
            title: body.title,
            type: body.type,
            tag: body.tag.split(","),
            content: body.content,
            isDelete: 0,
            startDate: moment().format('YYYY-MM-ss hh:mm:ss')
        };

    new articleController(req,res).create(data);
});

// 编辑文章
router.post('/edit-article', (req, res) => {
    let body = req.body,
        articleId = body.articleId, // 文章Id
        data = {
            title: body.title,
            type: body.type,
            tag: body.tag.split(","),
            content: body.content,
            startDate: moment().format('YYYY-MM-ss hh:mm:ss')
        };

    new articleController(req,res,articleId).update(data);
});

// 删除文章
router.get('/delete-article', (req, res) => {
    let collection = new crub("list"),
        articleId = req.query.articleId;

    new articleController(req,res,articleId).deletedArticle();
});

// 获取文章数据
router.get('/get-article', (req, res) => {
    let articleId = req.query.articleId;

    new articleController(req,res,articleId).getArticleContent();
});


// 获取文章列表
router.get("/get-article-list", (req, res) => {
    let page = req.query.page,
        pageSize = req.query.pageSize,
        query = {
            isDelete: 0
        };

    page = page ? page : 1;
    pageSize = pageSize ? parseInt(pageSize) : 10;

    // 获取列表数据
    new articleController(req,res).getArticleList(query,page,pageSize);
});

module.exports = router;