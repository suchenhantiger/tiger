import AppHeader from '../../../../components/common/appheader/AppHeader';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';

import LoginForm from '../../components/login/LoginForm';
import MsgLogin from '../../components/login/MsgLogin';

import styles from './css/loginPage.less';
/********我的主页*********/
class LoginPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.logined = false;
        
        if(systemApi.getValue("tel")) 
            this.logined =true;         
        this.state = {
            index: this.logined?0:1,
            focus :false,
        }
    }
    componentDidMount(){
        document.addEventListener("backbutton", this.onBackKeyDown, false);
    }

    componentWillUnmount(){

        document.removeEventListener("backbutton", this.onBackKeyDown, false);
        super.componentWillUnmount();
    }


    onBackKeyDown = ()=>{
        var hash = this.getHashPath();
        
        if(hash != '/login'){
            hashHistory.goBack();
        }
        else{
            if(systemApi.getDeviceMessage().isAndroid){
                Client.backForAndroid();
            }
        }
    }

    onBackKeyDown=()=>{
        var {index} = this.state;
        if(index==0){
            if(systemApi.getDeviceMessage().isAndroid){
                Client.backForAndroid();
            }
        }else{
            this.setState({index:0});
        }

        
    
    }

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
    setFocusState=(focus_state)=>{
        this.setState({focus:focus_state});
   }

    agreementClick = (title,code)=>()=>{
      

        hashHistory.push({
            pathname:"/login/agreement",
            query:{
                title,code
            }

        });
    }

    render() {
        systemApi.log("LoginPage render");

        var {focus , index } = this.state;

        //console.log(focus);

        return (
            <div>
                <AppHeader showBack={false} />
                <Content>
                    {this.logined?
                        <ul className={styles.login_tab}>
                            <li className={index == 0 ? styles.on : ""} onClick={this.tabClick(0)}>{McIntl.message("pwd_login")}</li>
                            <li className={index == 1 ? styles.on : ""} onClick={this.tabClick(1)}>{McIntl.message("fast_login")}</li>
                            
                        </ul>:
                        <ul className={styles.login_tab}>
                           <li className={index == 1 ? styles.on : ""} onClick={this.tabClick(1)}>{McIntl.message("fast_login")}</li>
                            <li className={index == 0 ? styles.on : ""} onClick={this.tabClick(0)}>{McIntl.message("pwd_login")}</li>
                         
                        </ul>
                    }
                    
                    <div className={styles.login_int}><p >未注册的用户，请使用短信登录。</p><p>登录后由系统自动注册。</p></div>

                    <LazyLoad index={index}>
                        <LoginForm setFocusState={this.setFocusState}/> 
                        <MsgLogin setFocusState={this.setFocusState}/> 
                    </LazyLoad>
                    {focus?null:
                    <div className={styles.login_bt_text}>
                    <p className={"c9"}>提交注册代表您已阅读并同意</p>
                    <p className={"blue"} ><span onClick={this.agreementClick("客户协议","CUSTOMER_AGREEMENT")} >客户协议/</span><span onClick={this.agreementClick("风险披露声明","RISK_STATEMENT")}>风险披露声明/</span><span onClick={this.agreementClick("隐私政策","PRIVACY_POLICY")}>隐私政策及其他法律声明</span></p>
                </div>}
                    
                </Content>
                {this.props.children}
            </div>
        );
    }

}


module.exports = LoginPage;
