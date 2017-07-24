exports.success = function (data) {
    return {
        return_code: 'SUCCESS',
        return_msg: data
    }
};

exports.fail = function (data) {
    return {
        return_code: 'FAIL',
        return_msg: data
    }
};