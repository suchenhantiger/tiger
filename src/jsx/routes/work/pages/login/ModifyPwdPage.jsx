import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView'

import ModifyForm from '../../components/login/ModifyForm';

import styles from './css/loginPage.less';

/********我的主页*********/
class ModifyPwdPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
    }
    //获取页面名称
    getPageName() { return "我的主页"; }

    renderIcons() {
        return [
            <div className={styles.right_country}><span>中国</span><i></i></div>
        ]
    }

    render() {
        systemApi.log("ModifyPwdPage render");

        return (
            <FullScreenView>
                <AppHeader showBack={false} iconRight={this.renderIcons()} />
                <Content>
                    <ul className={styles.login_tab}>
                        <li className={styles.on}>修改密码</li>
                    </ul>
                    <ModifyForm/>
                </Content>
            </FullScreenView>
        );
    }

}


module.exports = ModifyPwdPage;
