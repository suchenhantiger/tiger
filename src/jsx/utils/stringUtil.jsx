var stringUtil = {
    getJsonp: function (data) {
        var startIndex = data.indexOf('(');
        var endIndex = data.lastIndexOf(')');

        if (startIndex < 0 || endIndex < 0 || startIndex > (endIndex - 2))
            return null;

        var jsonStr = data.substr(startIndex + 1, endIndex - startIndex - 1);
        return JSON.parse(jsonStr);
    },
}

module.exports = stringUtil;
