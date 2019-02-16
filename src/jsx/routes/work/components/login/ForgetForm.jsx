import styles from './css/loginForm.less';

class LoginForm extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            validCode: ""
        }
    }

    phoneChange = (e) => {
        var { value } = e.target;
        this.setState({ phone: value });
    }

    codeChange = (e) => {
        var { value } = e.target;
        this.setState({ validCode: value });
    }

    deleteClick = () => {
        this.setState({ phone: "" })
    }

    nextClick = ()=>{
        
    }
        
    //渲染函数
    render() {

        var { phone, validCode } = this.state;

        return (
            <div className={styles.login_form}>
                <div className={styles.login_item}>
                    <span className={styles.area_code}>+86</span>
                    <i className={styles.arrow_select}></i>
                    <div className={styles.line_02}></div>
                    <input placeholder="请输入手机号" value={phone} onChange={this.phoneChange} />
                    {phone.length ? <i className={styles.search_delete} onClick={this.deleteClick}></i> : null}
                </div>
                <div className={styles.login_item}>
                    <input placeholder="请输入验证码" value={validCode} onChange={this.codeChange} />
                    <div className={styles.text_code}>获取验证码</div>
                </div>
                <div className={styles.login_bt_text}>
                    <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}><button onClick={this.nextClick}>下一步</button></div>
                </div>
            </div>
        );
    }

}

module.exports = LoginForm;
