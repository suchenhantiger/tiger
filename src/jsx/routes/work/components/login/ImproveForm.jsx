import styles from './css/loginForm.less';

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
            address: ""
        }
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
        var {nickname="",
        email="",
        emailCode="",
        country="",
        city= "",
        address= ""} =this.props;
    }




    nextClick = ()=>{
        
    }
        
    //渲染函数
    render() {

        var { nickname="",
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
                    <input placeholder="请设置账户昵称" value={nickname} onChange={this.nicknameChange} />
                </div>

                <div className={styles.login_item}>
                    <input placeholder="请输入您的邮箱" value={email} onChange={this.emailChange} />
                </div>


                <div className={styles.login_item}>
                    <input placeholder="验证邮箱" value={emailCode} onChange={this.emailCodeChange} />
                    <div className={styles.text_code}>获取验证码</div>
                </div>
                <div className={styles.login_item}>
                    <span className={styles.area_code}>+86</span>
                    <i className={styles.arrow_select}></i>
                    <div className={styles.line_02}></div>
                    <input  value={phone}  disabled="disabled"/>
                </div>
                <div className={styles.login_item}>
                          <input type="text" value={country} onChange={this.countryChange} placeholder="请输入您的国家" />
                </div>
                <div className={styles.form_input}>
                          <input type="text" value={address} onChange={this.addressChange} placeholder="请输入您的地址"/>
                </div>

                <div className={styles.login_bt_text} onClick={this.submit}>
                    <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}><button onClick={this.nextClick}>下一步</button></div>
                </div>
            </div>
        );
    }

}

module.exports = ImproveForm;
