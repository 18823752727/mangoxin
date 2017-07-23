var express = require('express');
var router = express.Router();
var crub = require("../util/crub.js");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 写入列表
router.get('/set-article-list', (req, res) => {

  let collection = new crub("list");

  collection.create({
    name: "我是用过借口过来的"
  }).then((item) => {
    console.log(item);
    res.send(item);
  })
})

// 查找列表
router.get("/get-article-list", (req, res) => {
  let collection = new crub("list");

  collection.find().then((item) => {
    console.log(item);
    res.send(item);
  })
})

router.get("/update-article", (req, res) => {
  let collection = new crub("list");

  collection.update({
    "name": "hello mongo"
  }, {
    "name": "这是更新后的数据"
  }).then(() => {
    res.send("更新成功");
  })
})

router.get("/delete-article", (req, res) => {
  let collection = new crub("list");

  collection.delete({
    "name" : "我是用过借口过来的"
  }).then(() => {
    res.send("删除成功");
  })
})

module.exports = router;