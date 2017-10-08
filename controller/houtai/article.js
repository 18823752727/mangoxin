const crub = require("../../util/crub.js");
const status = require('../../util/status');
const ObjectId = require('mongodb').ObjectId;

// 文章操作方法类
class article {
    /**
     * @param req 请求
     * @param res 返回
     * @param id 文章ID
     */
    constructor(req, res, articleId) {
        this.articleId = articleId; // 文章ID
        this.req = req;
        this.res = res;
        this.collection = new crub('list'); // 文章数据库表
    }

    /**
     * 创建文章
     * @param data 创建文章数据
     */
    create(data) {
        let _this = this,
            res = _this.res,
            collection = _this.collection;

        collection.create(data).then((item) => {
            res.send(status.success("创建成功"));
        }, (error) => {
            res.send(status.fail(error));
        }).catch((error) => {
            res.send(status.fail(error));
        });
    }

    /**
     * 修改文章
     * @param data 更新文章数据
     */
    update(data) {
        let _this = this,
            res = _this.res,
            articleId = _this.articleId,
            collection = _this.collection;

        if (articleId) {
            collection.update({
                "_id": ObjectId(articleId)
            }, data).then((item) => {
                res.send(status.success("编辑成功"));
            }, (error) => {
                res.send(status.fail('编辑成功'));
            }).catch((error) => {
                res.send(status.fail('编辑成功'));
            });
        } else {
            res.send(status.fail("参数错误，缺少articleId"));
        }
    }

    // 删除文章
    deletedArticle() {
        let _this = this,
            res = _this.res,
            articleId = _this.articleId,
            collection = _this.collection;

        if (articleId) {
            collection.update({
                "_id": ObjectId(articleId)
            }, {
                "isDelete": 1
            }).then((item) => {
                res.send(status.success("编辑成功"));
            }, (error) => {
                res.send(status.fail('删除失败'));
            }).catch((error) => {
                res.send(status.fail('删除失败'));
            });
        } else {
            res.send(status.fail("参数错误，缺少articleId"));
        }
    }

    /**
     * 获取文章列表
     * @param query 查询参数
     * @param page 页数
     * @param pageSize 每页大小
     */
    getArticleList(query,page,pageSize) {
        let _this = this,
            res = _this.res,
            collection = _this.collection;

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
        });
    }

    // 获取单篇文章数据
    getArticleContent() {
        let _this = this,
            res = _this.res,
            articleId = _this.articleId, // 文章ID
            collection = _this.collection;

        if (articleId) {
            collection.find({
                _id: ObjectId(articleId)
            }).then((item) => {
                res.send(status.success(item[0]));
            }, (error) => {
                res.send(status.fail(error));
            }).catch((error) => {
                res.send(status.fail(error));
            });
        } else {
            res.send(status.fail("参数错误，缺少articleId"));
        }
    }
}

module.exports = article;