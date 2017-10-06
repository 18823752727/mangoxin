exports.success = function (data) {
    return {
        return_code: 'SUCCESS',
        return_msg: data
    }
};

exports.guest = function () {
    return {
        return_code: 'GUEST',
        return_msg: '登录过期，请重新登录'
    }
}

exports.fail = function (data) {
    return {
        return_code: 'FAIL',
        return_msg: data
    }
};