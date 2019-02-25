import AppHeader from '../../../../components/common/appheader/AppHeader';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';

import LoginForm from '../../components/login/LoginForm';
import MsgLogin from '../../components/login/MsgLogin';

import styles from './css/loginPage.less';

/********我的主页*********/
class LoginPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            index: 0
        }
    }
    //获取页面名称
    getPageName() { return "我的主页"; }

    renderIcons() {
        return [
            <div className={styles.right_country} onClick={this.areaClick}><span>中国</span><i></i></div>
        ]
    }

    areaClick = ()=>{
        hashHistory.push("/login/area");
    }

    tabClick = (index)=>()=>{
        this.setState({index});
    }

    agreementClick = ()=>{
        hashHistory.push("/login/agreement");
    }

    render() {
        systemApi.log("LoginPage render");

        var { index } = this.state;

        return (
            <div>
                <AppHeader showBack={false} iconRight={this.renderIcons()} />
                <Content>
                    <ul className={styles.login_tab}>
                        <li className={index == 0 ? styles.on : ""} onClick={this.tabClick(0)}>快捷登录</li>
                        <li className={index == 1 ? styles.on : ""} onClick={this.tabClick(1)}>密码登录</li>
                    </ul>
                    <div className={styles.login_int}>未注册的用户，登录时将自动注册</div>

                    <LazyLoad index={index}>
                        <MsgLogin/> 
                        <LoginForm/> 
                      
                    </LazyLoad>

                    <div className={styles.login_bt_text}>
                        <p className={"c9"}>提交注册代表您已阅读并同意</p>
                        <p className={"blue"} onClick={this.agreementClick}><span>客户协议/</span><span>风险披露声明/</span><span>隐私政策及其他法律声明</span></p>
                    </div>
                </Content>
                {this.props.children}
            </div>
        );
    }

}


module.exports = LoginPage;
