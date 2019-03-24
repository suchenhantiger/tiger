import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';

import styles from './css/settingPage.less';

/********我的主页*********/
class SettingPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            tipFlag:false,
            fingerFlag:false
        }
    }
    //获取页面名称
    getPageName() { return "充值页面"; }

    fingerChange = ()=>{
        var {fingerFlag} = this.state;
        this.setState({fingerFlag:!fingerFlag});
    }

    tipChange = ()=>{
        var {tipFlag} = this.state;
        this.setState({tipFlag:!tipFlag});
    }

    exitClick = ()=>{
        //点击退出登录
        systemApi.removeValue("tigertoken");
        systemApi.removeValue("avatarUrl");
        systemApi.removeValue("email");
        systemApi.removeValue("emailIsActive");
        systemApi.removeValue("isFinger");
        systemApi.removeValue("isPushMsg");
        systemApi.removeValue("isReal");
        systemApi.removeValue("nickname");
        systemApi.removeValue("tel");
        systemApi.removeValue("telActive");
        systemApi.removeValue("mt4Id");
        systemApi.removeValue("mt4AccType");
        hashHistory.replace("/login");
    }

    personalClick = ()=>{
        hashHistory.push("/work/me/setting/personal");
    }

    render() {
        systemApi.log("SettingPage render");

        var {tipFlag, fingerFlag} = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName="" />
                <Content>
                    <div className={styles.login_box}>
                        <ul className={this.mergeClassName(styles.login_tab, "mg-tp-42")}>
                            <li className={styles.on}>设置</li>
                        </ul>
                        <div className={"clear"}></div>
                        <div className={styles.login_int}>定制您的个性化服务</div>
                        <div className={this.mergeClassName("mg-tp-42", "mg-lr-20")}>
                            <div className={this.mergeClassName(styles.text_arrow, styles.text_list3)}>
                                <ul>
                                    <li>
                                        <div className={this.mergeClassName("left", "font30")}><p>通行证账号</p></div>
                                        <div className={this.mergeClassName("right", "c9")}><p>3009000</p></div>
                                    </li>
                                    <li>
                                        <div className={this.mergeClassName("left", "font30")}><p>个人资料设置</p></div>
                                        <div className={this.mergeClassName("right", "c9")} onClick={this.personalClick}><p>头像、联系方式等设置</p></div>
                                    </li>
                                    <li>
                                        <div className={this.mergeClassName("left", "font30")}><p>密码设置</p></div>
                                        <div className={this.mergeClassName("right", "c9")}><p>修改密码</p></div>
                                    </li>
                                    <li>
                                        <div className={this.mergeClassName("left", "font30")}>
                                            <p>开仓弹窗提醒</p>
                                            <p className={this.mergeClassName("c9", "font24", "mg-tp-10")}>每次下单开仓时，系统弹窗提醒</p>
                                        </div>
                                        <div className={this.mergeClassName("right", "c9")}>
                                            <i className={this.mergeClassName(styles.icon_switch, tipFlag?styles.on:"")} onClick={this.tipChange}></i>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={this.mergeClassName("left", "font30")}>
                                            <p>指纹解锁</p>
                                        </div>
                                        <div className={this.mergeClassName("right", "c9")}>
                                            <i className={this.mergeClassName(styles.icon_switch, fingerFlag?styles.on:"")} onClick={this.fingerChange}></i>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={this.mergeClassName("left", "font30")}><p>多语言</p></div>
                                        <div className={this.mergeClassName("right", "c9")}><p></p></div>
                                    </li>
                                    <li>
                                        <div className={this.mergeClassName("left", "font30")}><p>系统版本</p></div>
                                        <div className={this.mergeClassName("right", "c9")}><p>3.1.1</p></div>
                                    </li>
                                    <li>
                                        <div className={this.mergeClassName("left", "font30")}><p>关于</p></div>
                                        <div className={this.mergeClassName("right", "c9")}><p>了解我们</p></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.bottom_btn_fixed}>
                            <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}><button onClick={this.exitClick}>退出登录</button></div>
                        </div>
                    </div>
                </Content>
                {this.props.children}
            </FullScreenView>
        );
    }

}


module.exports = SettingPage;
