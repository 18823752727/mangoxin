const db = require("./mongo.js")(),
    mongoskin = require('mongoskin'); 

class CRUB {
    constructor(collection){
        this.collection = collection;
    }

    create(model){
        let _this = this;
        return new Promise ((resolve,reject)=>{
            db.bind(_this.collection);
            db[_this.collection].save(model,(err,item)=>{
                if(err){
                    reject(err);
                }else{
                    item.status = "SUCCESS",
                    item.message = "插入成功"
                    resolve(item);
                }
            })
        })
    }


}

module.exports = CRUB;