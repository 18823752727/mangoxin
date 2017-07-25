const db = require("./mongo.js")(),
    mongoskin = require('mongoskin');

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
                    item.status = "SUCCESS",
                        item.message = "插入成功"
                    resolve(item);
                }
            })
        })
    }

    /**
     * 查找数据
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