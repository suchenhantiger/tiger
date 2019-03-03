import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView'
// import LazyLoad from '../../../../components/common/subtabs/LazyLoad';

import ForgetForm from '../../components/login/ForgetForm';

import styles from './css/loginPage.less';

/********我的主页*********/
class ForgetPwdPage extends PageComponent {

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
        systemApi.log("ForgetPwdPage render");

        return (
            <FullScreenView>
                <AppHeader showBack={true} iconRight={this.renderIcons()} />
                <Content>
                    <ul className={styles.login_tab}>
                        <li className={styles.on}>找回密码</li>
                    </ul>
                    <ForgetForm/>
                </Content>
            </FullScreenView>
        );
    }

}


module.exports = ForgetPwdPage;
