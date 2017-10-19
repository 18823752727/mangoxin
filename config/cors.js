/**
 * 配置跨域白名单
 * @type {{}}
 */

// 跨域白名单
let whitelist = ['http://localhost:8081'];

// 跨域请求处理函数
let corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    }else{
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}



module.exports = corsOptionsDelegate;