
var format = {
    /**
	 * 处理数字转化,保留pos位小数
	 * 默认保留2位小数
	 * @param {} ntxt
	 * @param {} pos
	 * @return {}
	 */
	formatNumber:function(ntxt,pos){
		pos = pos ||2;
		ntxt = ntxt+"";
		ntxt = ntxt.replace(/,/g,'');
		return Math.round(parseFloat(ntxt)*Math.pow(10, pos))/Math.pow(10, pos);
	},
    /**
	 * 强制保留2位小数，如：2，会在2后面补上00.即2.00
	 * @param {} x
	 * @return {string}	字符串
	 */
    toDecimal2Str:function (x, pos) {
    	pos = pos || 2;
    	x = x+"";
    	x = x.replace(/,/g,'');		//逗号处理
        if (isNaN(parseFloat(x))) {
            return false;
        }
//        var f = Math.round(parseFloat(x)*100)/100;
        var f = this.formatNumber(x,pos);

        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + pos) {
            s += '0';
        }
        return s;
    }
}

module.exports = format;
