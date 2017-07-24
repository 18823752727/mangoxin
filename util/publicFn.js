/**
 * 时间格式转化
 * @param {String} fmt 需要的日期格式
 * @param {Date} date  时间对象
 * @returns {String}  返回转化后的日期字符串
 */
exports.formatDate = function(fmt, date) {
    let dateData = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'h+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        'S': date.getMilliseconds() //毫秒
    };

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    for (let dateItem in dateData) {
        if (new RegExp('(' + dateItem + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
                (dateData[dateItem]) : (('00' + dateData[dateItem]).substr(('' + dateData[dateItem]).length)));
        }
    }

    return fmt;
};