var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/artica-list',(req,res)=>{
  res.send("这是个列表");
})

module.exports = router;
