import styles from './css/certificationForm.less';
import {connect} from 'react-redux';
import {getEmailPwd} from '../../actions/login/loginAction';
import { DatePicker } from 'antd-mobile';
import {checkIDNO} from '../../../../utils/util';
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


class CertificationForm extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            femail:0,
            idType: "",
            idNO:"",
            birthday:null,
            errMsg:""

           
        };
        this._minDate = new Date(1949,0,1);


    }

    nicknameChange = (e) => {
        var { value } = e.target;
        this.setState({ name: value });
    }

    idNOChange = (e) => {
        var { value } = e.target;
        this.setState({ idNO: value });
    }

    nextClick = ()=>{
        var {next} = this.props;
        var { 
            name= "",
            femail=0,
            idType="",
            idNO="",
            birthday
        }=this.state;

        if(name.length==0){
            this.setState({errMsg:"请输入姓名"});
        }else if( checkIDNO(idNO)==false){
            this.setState({errMsg:"请输入正确的证件号码"});
        }else if(birthday==null){
            this.setState({errMsg:"请选择出生日期"});
        }else{
            next && next({trueName:name,sex:femail,cardType:0,cardNO:idNO,birthday:birthday.Format('yyyy-MM-dd')});
        }
     
        
    }
        
    clickFemail=(value)=>()=>{
        this.setState({femail:value});
    }

    onChangeDate=(data)=>{
        //console.log(data);
        this.setState({ birthday:data })
    }

    //渲染函数
    render() {

        var { name= "",
        femail=1,errMsg="",
        idType="",
        idNO=""} = this.state;

        var {birthday}=this.state;
        var selectdate = null;
        if(birthday!=null)
            selectdate = birthday.Format('yyyy-MM-dd');
      
//placeholder="请选择出生日期" value=  
        return (
            <div>
        

                {/* <div className={styles.form_tabs}>
                    <ul>
                        <li className={femail==0?styles.on:null} onClick={this.clickFemail(0)}><span>男</span></li>
                        <li className={femail==1?styles.on:null} onClick={this.clickFemail(1)}><span>女</span></li>
                    </ul>
                </div> */}
            <div style={{height:"0.2rem"}}/>
           
            <div className={styles.login_form}>
                 

                <div className={styles.login_item}>
                    <input className={styles.phoneInput} placeholder="姓名" value={name} onChange={this.nicknameChange} />
                </div>

                {/* <div className={styles.login_item}>
                    <input placeholder="证件类型" value={"身份证"} disabled="disabled" />
                </div> */}

                <div className={styles.login_item}>
                    <input  className={styles.phoneInput} placeholder="身份证" value={idNO} onChange={this.idNOChange} />
                </div>

                <div className={styles.login_item}>
                <DatePicker
                            value={this.state.birthday}
                            onChange={this.onChangeDate}
                            minDate={this._minDate}
                            maxDate={new Date()}
                            mode="date">
                   
                              <div  className={selectdate?"":"c9"} >{selectdate?selectdate:"请选择出生日期"}</div>
                </DatePicker>
                    
                </div>
                

                {errMsg.length?(
                    <div style={{marginTop:"0.1rem"}}>
                        <div className={this.mergeClassName(styles.pro_error, "red")} >{errMsg}</div>
                    </div>
                ):null}
   
                    <div onClick={this.nextClick} className={this.mergeClassName(styles.login_btn, "mg-lr-30")}><button >下一步</button></div>

            </div>
            </div>
        );
    }

}
function injectProps(state){
    return {};
}
function injectAction(){
    return {getEmailPwd};
}

module.exports = connect(null,injectAction())(CertificationForm);

