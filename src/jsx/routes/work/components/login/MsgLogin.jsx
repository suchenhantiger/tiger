import styles from './css/loginForm.less';
import {connect} from 'react-redux';
import {getMessagePwd,login} from '../../actions/login/loginAction';
import {checkPhone} from '../../../../utils/util';
class MsgLogin extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        var phone = systemApi.getValue("tel");
        var canSend = false;
        if(phone && phone.length==11) canSend = true;
        this.state = {
            phone:phone?phone:"",
            validCode:"",
            errMsg:"",
            restTime:60,
            canSend:canSend,
            showBtn:true
        }
        this._interval;
        this.sendFlag=false;
    }

    phoneChange = (e)=>{
        var {value} = e.target;
        if(value.length>=11)
            this.setState({phone:value.substring(0,11),canSend:true});
        else
            this.setState({phone:value,canSend:false});
    }

    codeChange = (e)=>{
        var {value} = e.target;
        this.setState({validCode:value});
    }

    deleteClick = ()=>{
        this.setState({phone:""})
    }

    loginClick = ()=>{
        var {phone="",validCode=""} =this.state;
        if(checkPhone(phone) ==false){
            this.setState({errMsg:"手机号格式错误"});
            return;
        }
        if(validCode.length==0){
            this.setState({errMsg:"验证码不能为空"});
            return;
        }
        this.props.login(this,{phone,securityCode:validCode},1,()=>{
        });
        
    }

    componentDidMount(){
        var g_deviceMessage=systemApi.getDeviceMessage();
        if(g_deviceMessage.isAndroid)
            window.addEventListener("resize", this.onResize);
    }

    componentWillUnmount(){
        
        var g_deviceMessage=systemApi.getDeviceMessage();
        if(g_deviceMessage.isAndroid)
            window.removeEventListener("resize", this.onResize);
        super.componentWillUnmount();
        clearInterval(this._interval);
    }

    //界面尺寸变化回调
    onResize = ()=>{
        var   {setFocusState}=this.props;
        this.refs.login_btn.scrollIntoViewIfNeeded(true);
        var {activeElement} = document,
            {tagName} = activeElement,
            {availHeight} = screen,
            {innerHeight} = window;

        if(availHeight-innerHeight > 100)
            setFocusState(true);
        else
            setFocusState(false);

        if(tagName=="INPUT" || tagName=="TEXTAREA") {
           window.setTimeout(function() {
               activeElement.scrollIntoViewIfNeeded(true);
           },0);
        }
    }

    getMessage=()=>{
        var {phone} =this.state;
        if(checkPhone(phone) ==false){
            this.setState({errMsg:"手机号格式错误"});
            return;
        }


        if(this.sendFlag==true)
            return;
        this.sendFlag =true;
        if(this.state.canSend ){
            
             this.props.getMessagePwd(this,phone,0,(msg)=>{
            this.sendFlag=false;
            this.setState({showBtn:false});
            var start = new Date().getTime();
            var {restTime} = this.state;
            this._interval = setInterval(()=>{
                var curTime = new Date().getTime(),
                    restTime = Math.round(60-(curTime-start)/1000);
                if(restTime>0)
                    this.setState({
                        restTime
                    });
                else{
                    this.setState({
                        showBtn:true,
                        restTime:60
                    });
                    clearInterval(this._interval);
                }

            },300);
        },(msg)=>{
            this.sendFlag = false;
            this.setState({
              messageInfo:msg
            })
        });
        }
       



    }

    //渲染函数
    render() {

        var {phone, validCode, errMsg,canSend,showBtn,restTime} = this.state;

        return (
            <div className={styles.login_form}>
                {/* <div className={styles.login_item}>
                    <span className={styles.area_code}>+86</span>
                    <i className={styles.arrow_select}></i>
                    <div className={styles.line_02}></div>
                    <input placeholder="请输入手机号" value={phone} onChange={this.phoneChange}/>
                    {phone.length?<i className={styles.search_delete} onClick={this.deleteClick}></i>:null}
                </div> */}
                <div className={styles.login_item} >
                    <div className={styles.phoneFrame} >
                        <span className={styles.area_code}>+86</span>
                        <i className={styles.arrow_select}></i>
                        <div className={styles.line_02}></div>
                    </div >
                    <div className={styles.phoneFrame2} >
                        <input className={styles.phoneInput} ref="phone_input" placeholder={McIntl.message("phone_no")} value={phone} onChange={this.phoneChange}/>
                        {phone.length?<i className={styles.search_delete} onClick={this.deleteClick}></i>:null}
                    </div>
                </div>
                <div className={styles.login_item}>
                    <input placeholder={McIntl.message("enter_vcode")} value={validCode} onChange={this.codeChange}/>
                    {showBtn?<div className={styles.text_code} style={canSend?{color:"#333"}:{color:"#aaa"}} onClick={this.getMessage}>{McIntl.message("send_code")}</div>
                    :<div className={styles.text_code} >{restTime}</div>}
                    
                </div>
                {errMsg.length?(
                    <div className={styles.login_pro}>
                        <div className={this.mergeClassName(styles.pro_error, "red")} >{errMsg}</div>
                    </div>
                ):null}
                
                <div ref="login_btn" className={styles.login_btn}><button onClick={this.loginClick}>{McIntl.message("login")}</button></div>
            </div>
        );
    }

}
function injectProps(state){
    return {};
}
function injectAction(){
    return {getMessagePwd,login};
}

module.exports = connect(null,injectAction())(MsgLogin);

