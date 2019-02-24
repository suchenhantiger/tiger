import AppHeader from '../../../../components/common/appheader/AppHeader';
import HeaderIcon from '../../../../components/common/appheader/HeaderIcon';

import styles from './css/mePage.less';

/********我的主页*********/
class MePage extends PageComponent {

    constructor(props, context) {
        super(props, context);
    }
    //获取页面名称
    getPageName() { return "我的主页"; }

    settingClick = ()=>{

    }

    msgClick = ()=>{

    }

    renderIcons(){
        return [
            <HeaderIcon iconCls={styles.setting} onClick={this.settingClick}/>,
            <HeaderIcon iconCls={styles.msg} onClick={this.msgClick}/>
        ]
    }

    render() {
        systemApi.log("MePage render");

        return (
            <div>
                <AppHeader headerName="我的" theme="transparent" iconRight={this.renderIcons()} />
                <Content coverHeader={true} coverBottom={false}>
                    <div className={styles.header}></div>
                    <div>
                        <div className={styles.blank}></div>
                        <div className={this.mergeClassName(styles.optional_detail)}>
                            <div className={styles.head_portrait}><img src="./images/me/img03.png" alt="" /></div>
                            <div className={styles.currency_name}>
                                <p className={this.mergeClassName(styles.c3, styles.text)}>LEIMS</p>
                                <p>
                                    <span className={this.mergeClassName("blue", "left")}>体验金账号</span>
                                    <span className={this.mergeClassName("c9", "left")}>(自主交易)</span>
                                    <i className={this.mergeClassName(styles.icon_select, "mg-tp-0")}></i>
                                </p>
                            </div>
                            <div className={"right"}>
                                <div className={styles.icon_account}>账号管理</div>
                            </div>
                            <div className={"clear"}></div>
                            <div className={styles.account_dt}>
                                <ul>
                                    <li>
                                        <p className="font32">$1888.00</p>
                                        <p className={this.mergeClassName("c9", "mg-tp-10")}>浮动盈亏</p>
                                    </li>
                                    <li>
                                        <p className="font32">$688.00</p>
                                        <p className={this.mergeClassName("c9", "mg-tp-10")}>账户净值</p>
                                    </li>
                                    <li>
                                        <p className="font32">1.00%</p>
                                        <p className={this.mergeClassName("c9", "mg-tp-10")}>保证金比例</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={this.mergeClassName(styles.optional_detail, styles.mt3)}>
                        <ul className={styles.account_icons}>
                            <li>
                                <p><img src="./images/me/icon-recharge.png" /></p>
                                <p>充值</p>
                            </li>
                            <li>
                                <p><img src="./images/me/icon-recharge.png" /></p>
                                <p>提现</p>
                            </li>
                            <li>
                                <p><img src="./images/me/icon-recharge.png" /></p>
                                <p>银行卡</p>
                            </li>
                            <li>
                                <p><img src="./images/me/icon-recharge.png" /></p>
                                <p>钱包</p>
                            </li>
                        </ul>
                    </div>
                    <div className={this.mergeClassName(styles.ht_gray, styles.mt3)}></div>
                    <div className={styles.icon_list}>
                        <ul>
                            <li>
                                <div className={styles.list_icon}><img src="./images/me/icon-list01.png" /> </div>
                                <div className={styles.list_text}>我的钱包<i className={"red"}></i></div>
                            </li>
                            <li>
                                <div className={styles.list_icon}><img src="./images/me/icon-list02.png" /> </div>
                                <div className={styles.list_text}>邀请好友</div>
                            </li>
                            <li>
                                <div className={styles.list_icon}><img src="./images/me/icon-list03.png" /> </div>
                                <div className={styles.list_text}>每日汇评</div>
                            </li>
                            <li>
                                <div className={styles.list_icon}><img src="./images/me/icon-list04.png" /> </div>
                                <div className={styles.list_text}>财经日历</div>
                            </li>
                            <li>
                                <div className={styles.list_icon}><img src="./images/me/icon-list05.png" /> </div>
                                <div className={styles.list_text}>帮助中心</div>
                            </li>
                            <li>
                                <div className={styles.list_icon}><img src="./images/me/icon-list06.png" /> </div>
                                <div className={styles.list_text}>联系客服</div>
                            </li>
                        </ul>
                    </div>
                </Content>
                {this.props.children}
            </div>
        );
    }

}


module.exports = MePage;
