import styles from './css/loginForm.less';

class LoginForm extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
    }

    forgetClick = ()=>{
        hashHistory.push("/login/forget");
    }

    //渲染函数
    render() {

        return (
            <div className={styles.login_form}>
                <div className={styles.login_item}>
                    <span className={styles.area_code}>+86</span>
                    <i className={styles.arrow_select}></i>
                    <div className={styles.line_02}></div>
                    <input placeholder="请输入手机号" />
                </div>
                <div className={styles.login_item}>
                    <input placeholder="请输入密码" />
                </div>
                <div className={styles.login_pro}>
                    <div className={this.mergeClassName(styles.pro_forget, "blue")} onClick={this.forgetClick}>忘记密码？</div>
                </div>
                <div className={styles.login_btn}><button>登 录</button></div>
            </div>
        );
    }

}

module.exports = LoginForm;
