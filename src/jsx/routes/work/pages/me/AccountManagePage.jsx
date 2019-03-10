import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';

import styles from './css/accountManagePage.less';

/********我的主页*********/
class AccountManagePage extends PageComponent {

    constructor(props, context) {
        super(props, context);
    }
    //获取页面名称
    getPageName() { return "账号管理页面"; }

    render() {
        systemApi.log("AccountManagePage render");

        return (
            <FullScreenView>
                <AppHeader headerName="交易账户管理" theme="transparent" />
                <Content coverHeader={true}>
                    <div className={styles.header}></div>
                    <div className={styles.account_manage}>
                        <div className={"white"}>
                            <p className={this.mergeClassName("text-al-center", "font48")}>&amp;1000.00</p>
                            <p className={this.mergeClassName("text-al-center", "mg-tp-10")}>账户总额</p>
                        </div>
                        <div className={this.mergeClassName(styles.account_dt, styles.account_list)}>
                            <ul>
                                <li>
                                    <p className={"font32"}>1999</p>
                                    <p className={"mg-tp-10"}>交易手数</p>
                                </li>
                                <li>
                                    <p className={"font32"}>$688.00</p>
                                    <p className={"mg-tp-10"}>总收益</p>
                                </li>
                                <li>
                                    <p className={"font32"}>1.00%</p>
                                    <p className={"mg-tp-10"}>总收益率</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.optional_detail}>
                        <div className={this.mergeClassName("pd-tp-20", "mg-lr-30")}>体验金账号</div>
                        <div className={this.mergeClassName(styles.account_dt, "mg-tp-20")}>
                            <ul>
                                <li>
                                    <p className={"font32"}>$1888.00</p>
                                    <p className={this.mergeClassName("c9", "mg-tp-10")}>浮动盈亏</p>
                                </li>
                                <li>
                                    <p className={"font32"}>$688.00</p>
                                    <p className={this.mergeClassName("c9", "mg-tp-10")}>账户净值</p>
                                </li>
                                <li>
                                    <p className={"font32"}>1.00%</p>
                                    <p className={this.mergeClassName("c9", "mg-tp-10")}>保证金比例</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.bottom_btn_fixed}>
                        <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}><button>升级到真实账户</button></div>
                    </div>
                </Content>
                {this.props.children}
            </FullScreenView>
        );
    }

}


module.exports = AccountManagePage;
