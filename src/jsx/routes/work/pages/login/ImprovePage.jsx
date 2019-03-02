import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView'
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';

import ImproveForm from '../../components/login/ImproveForm';

import styles from './css/improvePage.less';

/********我的主页*********/
class ImprovePage extends PageComponent {

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
                <AppHeader showBack={false} iconRight={this.renderIcons()} />
                <Content>
                    <ul className={styles.login_tab}>
                        <li className={styles.on}>完善信息</li>
                    </ul>
                    <ImproveForm/>
                </Content>
            </FullScreenView>
        );
    }

}


module.exports = ImprovePage;
