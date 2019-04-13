import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView'

import ModifyForm from '../../components/login/ModifyForm';
import TelModifyForm from '../../components/login/TelModifyForm';
import styles from './css/loginPage.less';

/********我的主页*********/
class ModifyPwdPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        var {telChangePwd} = this.props.location.query;
        this.telChangePwd = telChangePwd;
    }
    //获取页面名称
    getPageName() { return "我的主页"; }


    render() {
        systemApi.log("ModifyPwdPage render");

        return (
            <FullScreenView>
                <AppHeader showBack={true} backHash="/work"  />
                <Content>
                    <ul className={styles.login_tab}>
                        <li className={styles.on}>修改密码</li>
                    </ul>
                    {this.telChangePwd?<TelModifyForm />:<ModifyForm/>
                    }
                    
                </Content>
            </FullScreenView>
        );
    }

}


module.exports = ModifyPwdPage;
