import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';

import styles from './css/bankPage.less';

/********我的主页*********/
class BankPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
    }
    //获取页面名称
    getPageName() { return "银行账户"; }

    addAccount = () => {
        hashHistory.push("/work/me/bank/add");
    }

    renderBankItem(){
        
    }

    render() {
        systemApi.log("BankPage render");

        return (
            <FullScreenView>
                <AppHeader headerName="银行账户" />
                <Content>
                    <div className={this.mergeClassName("mg-lr-30", "mg-tp-30")}>
                        <div className={this.mergeClassName(styles.upload_box, styles.bank_box)} onClick={this.addAccount}>
                            <span>点此添加银行账户</span>
                        </div>
                        <div className={styles.bank_list}>
                            <ul>
                                <li className={styles.bk_zg}>
                                    <i className={styles.icon_zh}></i>
                                    <p className={styles.bank_name}>中国银行</p>
                                    <p><span>储蓄卡</span></p>
                                    <p>6222 **** **** 8888</p>
                                </li>
                                <li className={styles.bk_zh}>
                                    <i className={styles.icon_zh}></i>
                                    <p className={styles.bank_name}>招商银行</p>
                                    <p><span>储蓄卡</span></p>
                                    <p>6222 **** **** 8888</p>
                                </li>
                                <li className={styles.bk_zx}>
                                    <i className={styles.icon_zh}></i>
                                    <p className={styles.bank_name}>中信银行</p>
                                    <p><span>储蓄卡</span></p>
                                    <p>6222 **** **** 8888</p>
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


module.exports = BankPage;
