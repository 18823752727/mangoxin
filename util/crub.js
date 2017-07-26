const db = require("./mongo.js")();

class CRUB {
    constructor(collection) {
        this.collection = collection;
    }

    /**
     * 添加数据
     * @param model 需要添加的数据 json格式
     * return promise
     */
    create(model) {
        let collection = this.collection;

        db.bind(collection);

        return new Promise((resolve, reject) => {
            // 关闭数据库
            db.close();

            db[collection].save(model, (err, item) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(item);
                }
            })
        })
    }

    /**
     * 查找全部数据
     * @param query 需要查找的数据
     * return promise
     */
    find(query) {
        let collection = this.collection;

        db.bind(collection);

        return new Promise((resolve, reject) => {
            db[collection].find(query).toArray((err, item) => {
                // 关闭数据库
                db.close();

                if (err) {
                    reject(err);
                } else {
                    resolve(item);
                }
            })
        })
    }

    /**
     * 分页查找数据
     * @param query 需要查找的数据
     * @param page 当前分页
     * @param onePage 分页数
     * return promise
     */
    findByPage(query, page, onePage) {
        let collection = this.collection,
            skipNumber = (page - 1) * onePage;

        db.bind(collection);

        return new Promise((resolve, reject) => {
            db[collection].find(query).skip(skipNumber).limit(onePage).toArray((err, item) => {
                // 关闭数据库
                db.close();

                if (err) {
                    reject(err);
                } else {
                    resolve(item);
                }
            })
        })
    }

    /**
     * 查找总数
     * @param query
     * @returns {Promise}
     */
    findCount(query){
        let collection = this.collection;

        db.bind(collection);

        return new Promise((resolve, reject) => {
            db[collection].find(query).count((err,item)=>{
                // 关闭数据库
                db.close();

                if(err){
                    reject(err);
                }else{
                    resolve(item);
                }
            })
        })
    }

    /**
     * 更新数据
     * @param query 查询条件
     * @param updateModel 需要更新的数据
     * return promise
     */
    update(query, updateModel) {
        let collection = this.collection;

        db.bind(collection);

        return new Promise((resolve, reject) => {
            let set = {
                $set: updateModel
            };

            db[collection].update(query, set, (err) => {
                // 关闭数据库
                db.close();

                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        })
    }

    /**
     * 删除数据
     * @param query 查询条件，Mongo查询的JSON字面量
     * return promise
     */
    delete(query) {
        let collection = this.collection;

        db.bind(collection);

        return new Promise((resolve, reject) => {
            db[collection].remove(query, (err) => {
                db.close();

                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        })
    }

}

module.exports = CRUB;