import { connect } from 'react-redux';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';

import styles from './css/personalInfoPage.less';

/********我的主页*********/
class PersonalInfoPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
    }
    //获取页面名称
    getPageName() { return "个人资料设置页面"; }

    render() {
        systemApi.log("PersonalInfoPage render");

        return (
            <FullScreenView>
                <AppHeader headerName="个人资料设置" />
                <Content>
                    <div className={this.mergeClassName("mg-tp-42", "mg-lr-50")}>
                        <div className={this.mergeClassName(styles.text_arrow, styles.text_list3)}>
                            <ul>
                                <li className={styles.item}>
                                    <div className={this.mergeClassName("left", "font26")}><p>头像</p></div>
                                    <div className={this.mergeClassName("right", "c9")}></div>
                                </li>
                                <li className={styles.item}>
                                    <div className={this.mergeClassName("left", "font26")}><p>昵称</p></div>
                                    <div className={this.mergeClassName("right", "c9")}><p>suchanhan</p></div>
                                </li>
                                <li className={styles.item}>
                                    <div className={this.mergeClassName("left", "font26")}><p>实名认证</p></div>
                                    <div className={this.mergeClassName("right", "c9")}><p>已认证</p></div>
                                </li>
                                <li className={styles.item}>
                                    <div className={this.mergeClassName("left", "font26")}><p>绑定手机</p></div>
                                    <div className={this.mergeClassName("right", "c9")}><p>186****0</p></div>
                                </li>
                                <li className={styles.item}>
                                    <div className={this.mergeClassName("left", "font26")}><p>绑定邮箱</p></div>
                                    <div className={this.mergeClassName("right", "c9")}><p>suchenhan*****.com</p></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Content>
                {this.props.children}
            </FullScreenView>
        );
    }

}

function injectAction() {
    return {};
}

module.exports = connect(null, injectAction())(PersonalInfoPage);
