import styles from './css/loginForm.less';
import {connect} from 'react-redux';
import {saveAccMt4,getEmailPwd,updateUserInfo} from '../../actions/login/loginAction';
import {checkEmail} from '../../../../utils/util';
class ImproveForm extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            nickname: "",
            email: "",
            emailCode: "",
            country: "",
            city: "",
            address: "",
            errMsg:"",
            restTime:60,
            showBtn:true
        }

        this._interval;
    }

    nicknameChange = (e) => {
        var { value } = e.target;
        this.setState({ nickname: value });
    }

    emailChange = (e) => {
        var { value } = e.target;
        this.setState({ email: value });
    }

    emailCodeChange = (e) => {
        var { value } = e.target;
        this.setState({ emailCode: value });
    }

    addressChange = (e) => {
        var { value } = e.target;
        this.setState({ address: value });
    }

    passwordChange = (e) => {
        var { value } = e.target;
        this.setState({ password: value });
    }

    submit =()=>{
        var {
            nickname="",
            email="",
            emailCode="",
            country="",
            city= "",
            address= ""
        } =this.state;

        if(nickname.length==0){
            this.setState({errMsg:"请输入昵称"});
        }else if( checkEmail(email)==false){
            this.setState({errMsg:"请输入正确的邮箱"});
        }else if( emailCode.length==0){
            this.setState({errMsg:"请输入邮箱验证码"});
        }
        // else if( address.length==0){
        //     this.setState({errMsg:"请输入地址信息"});
        // }
        else{
          //  console.log(encodeURIComponent(encodeURIComponent(nickname)));
            this.props.saveAccMt4(this,{nickname:nickname,email,emailCode,country:"china",address:address},()=>{
                this.props.updateUserInfo(this,()=>{
                    hashHistory.goBack();
                });
       
            });

        }
    }

    componentWillUnmount(){
        super.componentWillUnmount();
        clearInterval(this._interval);

    }

    getMessage=()=>{
        var {email}=this.state;
        if(checkEmail(email)==false){
            this.setState({errMsg:"请输入正确的邮箱"});
            return ;
        }
        this.props.getEmailPwd(this,this.state.email,(msg)=>{
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



    nextClick = ()=>{
        
    }

    uploadAddress=()=>{
       var {uploadAddress} = this.props;
       uploadAddress && uploadAddress();
    }
        
    //渲染函数
    render() {

        var { nickname="",errMsg,restTime,showBtn,
        email="",
        emailCode="",
        country="",
        city= "",
        address= "",
        password= ""} = this.state;
        var phone = systemApi.getValue("tel");

        return (
            <div className={styles.login_form}>
                <div className={styles.login_item}>
                    <input className={styles.phoneInput} placeholder="请设置账户昵称" value={nickname} onChange={this.nicknameChange} />
                </div>

                <div className={styles.login_item}>
                    <input className={styles.phoneInput} placeholder="请输入您的邮箱" value={email} onChange={this.emailChange} />
                </div>


                <div className={styles.login_item}>
                    <input placeholder="验证邮箱" value={emailCode} onChange={this.emailCodeChange} />
                    {showBtn?<div className={styles.text_code} style={email.length>0?{color:"#333"}:{color:"#aaa"}} onClick={this.getMessage}>获取验证码</div>
                    :<div className={styles.text_code} >{restTime}</div>}
       
                </div>
                <div className={styles.login_item}>
                    <span className={styles.area_code}>+86</span>
                    <i className={styles.arrow_select}></i>
                    <div className={styles.line_02}></div>
                    <input  value={phone}  disabled="disabled"/>
                </div>
                {/* <div className={styles.login_item}>
                          <input type="text" value={country} onChange={this.countryChange} placeholder="请输入您的国家" />
                </div> */}
                <div className={styles.form_input}>
                          <input type="text" value={address} onChange={this.addressChange} placeholder={McIntl.message("address")}/>
                </div>
                {/* <p className={"right pd-tp-20 pd-bt-20 blue"} onClick={this.uploadAddress}>上传地址凭证</p> */}
                {errMsg.length?(
                    <div style={{marginTop:"0.1rem"}}>
                        <div className={this.mergeClassName(styles.pro_error, "red")} >{errMsg}</div>
                    </div>
                ):null}
 
                    <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}><button onClick={this.submit}>{McIntl.message("save")}</button></div>
        
            </div>
        );
    }

}
function injectProps(state){
    return {};
}
function injectAction(){
    return {saveAccMt4,getEmailPwd,updateUserInfo};
}

module.exports = connect(null,injectAction())(ImproveForm);

