import styles from './css/loginForm.less';

class LoginForm extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
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

    saveClick = ()=>{
        
    }
        
    //渲染函数
    render() {

        var { pwd, conpwd } = this.state;

        return (
            <div className={styles.login_form}>
                <div className={styles.login_item}>
                    <input placeholder="请输入新密码" value={pwd} onChange={this.pwdChange} />
                </div>
                <div className={styles.login_item}>
                    <input placeholder="确认密码" value={conpwd} onChange={this.conpwdChange} />
                </div>
                <div className={styles.login_bt_text}>
                    <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}><button onClick={this.saveClick}>保存</button></div>
                </div>
            </div>
        );
    }

}

module.exports = LoginForm;
