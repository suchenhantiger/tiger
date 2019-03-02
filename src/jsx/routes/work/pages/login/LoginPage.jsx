import AppHeader from '../../../../components/common/appheader/AppHeader';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';

import LoginForm from '../../components/login/LoginForm';
import MsgLogin from '../../components/login/MsgLogin';

import styles from './css/loginPage.less';
import JSEncrypt from 'jsencrypt';
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
        // const encrypt = new JSEncrypt();
        // encrypt.setPrivateKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJ5bl4BX70dt6X0mH1nN4Od4mZgYOaq7Zzlz3c8Au/Jiar3nP7NRetI5UP8mHxn5xhbjM9sOD0dbr2j1TjV/6sa8xlHLYN8QMjc1SU3wskMYUEup+OT7+w01IHeN1hxCcSZ3mMOEV5nHiJw6nn7yXvox7G48SRLwsgOOPXFm/C7QIDAQAB');
        // encrypt.setPublicKey('-----BEGIN PUBLIC KEY-----' + 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJ5bl4BX70dt6X0mH1nN4Od4mZgYOaq7Zzlz3c8Au/Jiar3nP7NRetI5UP8mHxn5xhbjM9sOD0dbr2j1TjV/6sa8xlHLYN8QMjc1SU3wskMYUEup+OT7+w01IHeN1hxCcSZ3mMOEV5nHiJw6nn7yXvox7G48SRLwsgOOPXFm/C7QIDAQAB'+ '-----END PUBLIC KEY-----');
        
        var token="65928a6dfca54365a0353a2b1aad4f47";
        // token = new Base64().encode(token);
        // console.log(token);
        // var res = encrypt.decrypt(token);
        // console.log(res);
        // var res2 = encrypt.encrypt(res);
        // console.log(res);

          //公钥
           var PUBLIC_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJ5bl4BX70dt6X0mH1nN4Od4mZgYOaq7Zzlz3c8Au/Jiar3nP7NRetI5UP8mHxn5xhbjM9sOD0dbr2j1TjV/6sa8xlHLYN8QMjc1SU3wskMYUEup+OT7+w01IHeN1hxCcSZ3mMOEV5nHiJw6nn7yXvox7G48SRLwsgOOPXFm/C7QIDAQAB';
          //私钥
          var PRIVATE_KEY = 'MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAInluXgFfvR23pfSYfWc3g53iZmBg5qrtnOXPdzwC78mJqvec/s1F60jlQ/yYfGfnGFuMz2w4PR1uvaPVONX/qxrzGUctg3xAyNzVJTfCyQxhQS6n45Pv7DTUgd43WHEJxJneYw4RXmceInDqefvJe+jHsbjxJEvCyA449cWb8LtAgMBAAECgYAojXdKlYstR1vUmBkYyuX+qSa9Dvpt3PuN6LdXpvw9XXHX71Z6VLW+xA0NIIGvNfoeKPNGvCKboZe29JXJOdJ53egF18pIXDiEoXT5nhwowQqQ7842GK/GILOvNXC2gpWxPqlOYbjvQBOQbZsKeF9Ea6MDesAQ7x8TKhMtpYzZYQJBAPSE43ESyd/U3GsmLILLjx67P8CrbUdeXWvqtBFdMov25dpEgtlWuS1qj3Yc+wbmii6l9PzyI2BKH1fGLuZXG1UCQQCQXz8L1/hcj/zqAgdazbJ3M7163I2l1in+uWACD49bTifYQtmlLmqqmp95AXRmXyG6Ind5q3KxdxSnzyVXofk5AkASJNY3qrw+Fq5waPm+jtpE3oIhitbmB9OI0XahHzhD+IMfyhungu7kttaEXiwmW+7+/SOLrXAAkh93ROZwAyCtAkAArJEsyvtb40g5B31lTSSSLemqkzEOHyvfBpqOJ+hxcrH47ob5oHfbCBHKjNkwSS1tIxAPv18vuPCdv/faquTxAkBbT5rlNJRcZejsPuJErLla5nrf6AiWD/7QoFBVtp/PBGg9t0lxoXHxzCE5/EVSOvwQnTg3TE5jDRWaPdNjH+pQ';
        //   //使用公钥加密
           var encrypt = new JSEncrypt();
        //     //encrypt.setPrivateKey('-----BEGIN RSA PRIVATE KEY-----'+PRIVATE_KEY+'-----END RSA PRIVATE KEY-----');
           encrypt.setPublicKey(PUBLIC_KEY);
           var encrypted = encrypt.encrypt("schtest");
           console.log('加密后数据:%o',encrypted);
        //   //console.log('加密后数据:%o',new Base64().encode(encrypted) );
        //   //使用私钥解密
          var decrypt = new JSEncrypt();
          decrypt.setPublicKey( PUBLIC_KEY);
         // decrypt.setPrivateKey(PUBLIC_KEY);
          var encrypted="bwmVpVnBIPp145JAPVfgN29AE3d+3cPJsGW7/NwVps+RRt2tN5qbWhAiUX+HEyGgPiiUdqkNgxa4FMMzZ0ruDBj7lv91QBrCCYF41Yj79Vk/0f5qkmnta4CuImkhlARakoYUp6DviZbB/6MCeJkhwEJEJ8i9fD0MWT3EOfP5N/8=";
          
          var uncrypted = decrypt.decrypt(encrypted);
          console.log('解密后数据:%o', uncrypted);
  
       
       
       
       
       
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
