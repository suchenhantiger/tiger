import Confirm from '../../../../../components/common/popup/Confirm';

// import styles from './css/disclaimer.less';
import { DatePicker } from 'antd-mobile';
Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}


class MyDatePicker extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            deadline:null
        };
        var {minTime} =props;

        if(minTime)
            this._minDate = new Date(minTime*1000);
        else
            this._minDate = new Date();

       
    }

     //比较属性和状态是否改变
     shouldComponentUpdate(nextProps, nextState) {
        var {deadline} = this.state;
        var {deadline:newtime} = nextState;
        if(deadline!=newtime) 
            return true;
        else 
            return false;
    }


    onChangeDate=(data)=>{
        // console.log("sch"+data.getTime());
        this.setState({ deadline:data })

    }

    getTimeStamp = ()=>{
        var {deadline} = this.state;
        if(deadline)
            return deadline.getTime();
        else 
            return null;

    }

    //渲染函数
    render(){
        console.log("sch render datepicker");
        var {deadline}=this.state;
        if(deadline==null ){
            var selectdate="";
        }else
            var selectdate = deadline.Format('yyyy-MM-dd hh:mm');

        console.log(selectdate);

        return(
            <DatePicker
                            value={this.deadline}
                            onChange={this.onChangeDate}
                            minDate={this._minDate}
                            mode="datetime">
                   
                              <div >{selectdate.length>0?selectdate:McIntl.message("not_set")}</div>
                            </DatePicker>
        );
    }

}

module.exports = MyDatePicker;
