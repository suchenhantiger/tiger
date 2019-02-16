import AppHeader from '../../../../components/common/appheader/AppHeader';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';

import ForgetForm from '../../components/login/ForgetForm';

import styles from './css/loginPage.less';

/********我的主页*********/
class ForgetPwdPage extends PageComponent {

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
            <div className={styles.right_country}><span>中国</span><i></i></div>
        ]
    }

    render() {
        systemApi.log("MePage render");

        var { index } = this.state;

        return (
            <div>
                <AppHeader showBack={false} iconRight={this.renderIcons()} />
                <Content>
                    <ul className={styles.login_tab}>
                        <li className={styles.on}>找回密码</li>
                    </ul>
                    <ForgetForm/>
                </Content>
            </div>
        );
    }

}


module.exports = ForgetPwdPage;
