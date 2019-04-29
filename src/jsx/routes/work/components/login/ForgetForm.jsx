import styles from './css/loginForm.less';
import {connect} from 'react-redux';
import {getMessagePwd,changePasswordByCode} from '../../actions/login/loginAction';
class ForgetForm extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            validCode: "",
            errMsg:"",
            restTime:60,
            canSend:false,
            showBtn:true,
            pwd: "",
            conpwd: ""
        }
    }
    pwdChange = (e) => {
        var { value } = e.target;
        this.setState({ pwd: value });
    }

    conpwdChange = (e) => {
        var { value } = e.target;
        this.setState({ conpwd: value });
    }
    phoneChange = (e)=>{
        var {value} = e.target;
        if(value.length>=11)
            this.setState({phone:value.substring(0,11),canSend:true});
        else
            this.setState({phone:value,canSend:false});
    }

    codeChange = (e) => {
        var { value } = e.target;
        this.setState({ validCode: value });
    }

    deleteClick = () => {
        this.setState({ phone: "" })
    }

    nextClick = ()=>{

        var {phone="",validCode="",pwd,conpwd} =this.state;
        if(phone.length != 11 ){
            this.setState({errMsg:"手机号格式不对"});
            return;
        }
        if(validCode.length==0){
            this.setState({errMsg:"验证码不能为空"});
            return;
        }

        if(pwd==null || pwd.length==0)
            this.setState({errMsg:"请输入密码"});
        else if(pwd.length<6 || pwd.length>12)
            this.setState({errMsg:"请设置6到12位密码"});
        else if(pwd!=conpwd)
            this.setState({errMsg:"两次输入的密码不一致"});
        else
            this.props.changePasswordByCode(this,phone,pwd,validCode,()=>{
                hashHistory.goBack();

            });
        
    }

    componentWillUnmount(){
        super.componentWillUnmount();
        clearInterval(this._interval);

    }

    getMessage=()=>{
        if(this.state.canSend)
        this.props.getMessagePwd(this,this.state.phone,1,(msg)=>{
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
        }, this,(msg)=>{
            this.setState({
              messageInfo:msg
            })
        });



    }
        
    //渲染函数
    render() {

        var { phone, validCode, errMsg,canSend,showBtn,restTime, pwd, conpwd  } = this.state;

        return (

                <div className={styles.login_form2} >
                    
                    <div className={styles.login_item} >
                        <div className={styles.phoneFrame} >
                            <span className={styles.area_code}>+86</span>
                            <i className={styles.arrow_select}></i>
                            <div className={styles.line_02}></div>
                        </div >
                        <div className={styles.phoneFrame2} >
                            <input className={styles.phoneInput} ref="phone_input" placeholder="请输入手机号" value={phone} onChange={this.phoneChange}/>
                            {phone.length?<i className={styles.search_delete} onClick={this.deleteClick}></i>:null}
                        </div>
                    </div>


                    <div className={styles.login_item}>
                        <input placeholder="请输入验证码" value={validCode} onChange={this.codeChange} />
                        {showBtn?<div className={styles.text_code} style={canSend?{color:"#333"}:{color:"#aaa"}} onClick={this.getMessage}>获取验证码</div>
                        :<div className={styles.text_code} >{restTime}</div>}
                    </div>
                    <div className={styles.login_item}>
                        <input type="password"  placeholder="请输入新密码" value={pwd} onChange={this.pwdChange} />
                    </div>
                    <div className={styles.login_item}>
                        <input type="password" placeholder="确认密码" value={conpwd} onChange={this.conpwdChange} />
                    </div>
                    {errMsg.length?(
                        <div className={styles.login_pro}>
                            <div className={this.mergeClassName(styles.pro_error, "red")} >{errMsg}</div>
                        </div>
                    ):null}


                    <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}><button onClick={this.nextClick}>立即修改</button></div>
                 
                    
                </div>
             

        );
    }

}
function injectProps(state){
    return {};
}
function injectAction(){
    return {getMessagePwd,changePasswordByCode};
}

module.exports = connect(null,injectAction())(ForgetForm);
