import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';

import styles from './css/documentarDetailPage.less';

/********跟单主页*********/
class DocumentaryDetailPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
    }
    //获取页面名称
    getPageName() { return "跟单详情"; }

    render() {
        systemApi.log("DocumentaryDetailPage render");

        return (
            <FullScreenView>
                <AppHeader headerName="LEIMS" theme="transparent" />
                <Content coverHeader={true}>
                    <div className={styles.header}></div>
                    <div className={styles.optional_detail}>
                        <div className={styles.head_portrait}><img src="./images/documentary/img03.png" alt="" /></div>
                        <div className={styles.currency_name}>
                            <p className={this.mergeClassName("c3", styles.c3)}>
                                <span className={"left"}>LEIMS</span>
                                <i className={styles.icon_grade}>B</i>
                            </p>
                            <p><span className={this.mergeClassName("c9", "left")}>机会准，持单短</span></p>
                        </div>
                        <div className={"clear"}></div>
                        <div className={styles.account_dt}>
                            <ul>
                                <li>
                                    <p className={this.mergeClassName("font32", "red")}>1.00%</p>
                                    <p className={this.mergeClassName("c9", "mg-tp-10")}>近30日收益率</p>
                                </li>
                                <li>
                                    <p className={this.mergeClassName("font32", "green")}>1.00%</p>
                                    <p className={this.mergeClassName("c9", "mg-tp-10")}>近30日最大跌幅</p>
                                </li>
                                <li>
                                    <p className={"font32"}>1.00%</p>
                                    <p className={this.mergeClassName("c9", "mg-tp-10")}>上一交易日</p>
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


module.exports = DocumentaryDetailPage;
