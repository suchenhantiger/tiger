import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import SubTabs from '../../../../components/common/subtabs/SubTabs';
import FlatTab from '../../../../components/common/subtabs/FlatTab';

import styles from './css/documentarDetailPage.less';

/********跟单主页*********/
class DocumentaryDetailPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        var {accuracy30d,
            downRate30d,
            followNmae,
            followerId,
            fowwerNumHis,
            incomeRate30d,
            lastDayPLRate,
            signature} = this.props.location.query;
            this._accuracy30d = accuracy30d;
            this._downRate30d = downRate30d;
            this._followNmae = followNmae;
            this._followerId = followerId;
            this._fowwerNumHis = fowwerNumHis;
            this._incomeRate30d = incomeRate30d;
            this._lastDayPLRate = lastDayPLRate;
            this._signature = signature;
        
        this.state = {
            index:0
        }
    }
    //获取页面名称
    getPageName() { return "跟单详情"; }

    render() {
        systemApi.log("DocumentaryDetailPage render");

        var {index} = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName="LEIMS" theme="transparent" />
                <Content coverHeader={true}>
                    <div className={styles.header}></div>
                    <div className={styles.optional_detail}>
                        <div className={styles.head_portrait}><img src="./images/documentary/img03.png" alt="" /></div>
                        <div className={styles.currency_name}>
                            <p className={this.mergeClassName("c3", styles.c3)}>
                                <span >{this._followNmae}</span>
                                {/* <i className={styles.icon_grade}>B</i> */}
                            </p>
                            <p><span className={this.mergeClassName("c9", "left")}>{this._signature}</span></p>
                        </div>
                        <div className={"clear"}></div>
                        <div className={styles.account_dt}>
                            <ul>
                                <li>
                                    <p className={this.mergeClassName("font32", "red")}>{this._incomeRate30d}%</p>
                                    <p className={this.mergeClassName("c9", "mg-tp-10")}>近30日收益率</p>
                                </li>
                                <li>
                                    <p className={this.mergeClassName("font32", "green")}>{this._downRate30d}%</p>
                                    <p className={this.mergeClassName("c9", "mg-tp-10")}>近30日最大跌幅</p>
                                </li>
                                <li>
                                    <p className={"font32"}>{this._lastDayPLRate}%</p>
                                    <p className={this.mergeClassName("c9", "mg-tp-10")}>上一交易日</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <SubTabs index={index} onTabChange={this.tabChange}>
                        <FlatTab text="数据统计"/>
                        <FlatTab text="当前交易"/>
                        <FlatTab text="历史交易"/>
                    </SubTabs>
                </Content>
                {this.props.children}
            </FullScreenView>
        );
    }

}


module.exports = DocumentaryDetailPage;
