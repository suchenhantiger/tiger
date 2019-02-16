import styles from './css/loginForm.less';

class LoginForm extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            phone:"",
            validCode:"",
            errMsg:""
        }
    }

    phoneChange = (e)=>{
        var {value} = e.target;
        this.setState({phone:value});
    }

    codeChange = (e)=>{
        var {value} = e.target;
        this.setState({validCode:value});
    }

    deleteClick = ()=>{
        this.setState({phone:""})
    }

    loginClick = ()=>{
        
    }

    //渲染函数
    render() {

        var {phone, validCode, errMsg} = this.state;

        return (
            <div className={styles.login_form}>
                <div className={styles.login_item}>
                    <span className={styles.area_code}>+86</span>
                    <i className={styles.arrow_select}></i>
                    <div className={styles.line_02}></div>
                    <input placeholder="请输入手机号" value={phone} onChange={this.phoneChange}/>
                    {phone.length?<i className={styles.search_delete} onClick={this.deleteClick}></i>:null}
                </div>
                <div className={styles.login_item}>
                    <input placeholder="请输入验证码" value={validCode} onChange={this.codeChange}/>
                    <div className={styles.text_code}>获取验证码</div>
                </div>
                {errMsg.length?(
                    <div className={styles.login_pro}>
                        <div className={this.mergeClassName(styles.pro_error, "red")}>密码错误</div>
                    </div>
                ):null}
                
                <div className={styles.login_btn}><button onClick={this.loginClick}>登 录</button></div>
            </div>
        );
    }

}

module.exports = LoginForm;
