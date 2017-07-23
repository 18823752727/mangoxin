var express = require('express');
var router = express.Router();
var crub = require("../util/crub.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/artica-list',(req,res)=>{
  console.log(crub);

  let aa = new crub("list");

  aa.create({
    name:"我是用过借口过来的"
  }).then((item)=>{
    console.log(item);
    res.send(item);
  })
})

module.exports = router;
