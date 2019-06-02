import styles from './css/loginForm.less';
import {connect} from 'react-redux';
import {login} from '../../actions/login/loginAction';
import {checkPhone} from '../../../../utils/util';
class LoginForm extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        var phone = systemApi.getValue("tel");
        this.state = {
            phone:phone?phone:"",
            validCode:"",
            errMsg:"",
            restTime:60,
            canSend:false,
            showBtn:true
        }
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

    forgetClick = ()=>{
        hashHistory.push("/login/forget");
    }

    deleteClick = ()=>{
        this.setState({phone:""})
    }
    loginfunc=()=>{
        
        var {phone="",validCode=""} =this.state;
        if(checkPhone(phone)==false){
            this.setState({errMsg:"手机号格式错误"});
            return;
        }
        if(validCode.length==0){
            this.setState({errMsg:"密码不能为空"});
            return;
        }
        this.setState({errMsg:""})
        
        this.props.login(this,{phone,password:validCode},2,()=>{
        });

    }

    //渲染函数
    render() {
        var {phone, validCode, errMsg,canSend,showBtn,restTime} = this.state;
        return (
            <div className={styles.login_form}>
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
                    <input  type="password" placeholder={McIntl.message("enter_pwd")} style={{width:"90%"}} value={validCode} onChange={this.codeChange}/>
                </div>
                {errMsg.length?(
                    <div className={styles.login_pro}>
                        <div className={this.mergeClassName(styles.pro_error, "red")} >{errMsg}</div>
                    </div>
                ):null}
                <div className={styles.login_pro}>
                    <div className={this.mergeClassName(styles.pro_forget, "blue")} onClick={this.forgetClick}>{McIntl.message("foget_pwd")}</div>
                </div>
                <div ref="login_btn"  className={styles.login_btn} onClick={this.loginfunc}><button>{McIntl.message("login")}</button></div>
            </div>
        );
    }

}

function injectProps(state){
    return {};
}
function injectAction(){
    return {login};
}

module.exports = connect(null,injectAction())(LoginForm);

