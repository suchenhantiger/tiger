import { connect } from 'react-redux';
import { getHistoryInfo, } from "../../actions/trade/tradeAction";

import LazyLoad from '../../../../components/common/subtabs/LazyLoad';
import HistoryList from './HistoryList';

import styles from './css/tradeHistory.less';

class TradeHistory extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            subIndex: 0,
            infoBalance: {},
            fixTabs: false
        }
        this.shouldFresh = false;
    }

    componentDidMount() {
        //持仓详情
        //持仓详情
        var mt4Id = systemApi.getValue("mt4Id");
        if (mt4Id == null || mt4Id.length == 0) {
            //没有账号或者账号异常

            return;
        }
        this.props.getHistoryInfo(this, { mt4Id, queryType: 1 }, (infoBalance) => {
            this.setState({ infoBalance });
        });
    }

    componentWillUpdate(nextProps, nextState) {
        var { fixTabs, subIndex} = nextState;
        if (this.state.fixTabs == fixTabs || this.state.subIndex != subIndex) {
            this.shouldFresh = true;
        }
    }

    componentDidUpdate() {
        var { iscroll } = this.refs;
        if (this.shouldFresh) {
            setTimeout(function(){
                iscroll && iscroll.refresh()
            },50);
        }
        this.shouldFresh = false;
    }

    getScrollStyle() {
        return styles.frame;
    }

    reloadData = () => {
        console.log("reload");
    }

    scroll = (x, y) => {
        var yRem = this.calculateRem(0, y);
        this.setState({ fixTabs: yRem < -3.6 });
    }

    tabClick = (subIndex) => () => {
        this.setState({ subIndex });
    }

    renderTabs() {
        var { subIndex } = this.state;
        return (
            <div className={this.mergeClassName("center", styles.hd_tabs, "mg-tp-20")}>
                <span className={subIndex == 0 ? styles.on : ""} onClick={this.tabClick(0)}>平仓订单<i></i></span>
                <span className={subIndex == 1 ? styles.on : ""} onClick={this.tabClick(1)}>资金记录<i></i></span>
            </div>
        )
    }

    getNextPage = ()=>{
        var {subIndex} = this.state,
            {historyList} = this.refs;
        if(subIndex == 0){
            historyList && historyList.getWrappedInstance().getNextPage();
        }
    }

    //渲染函数
    render() {

        var { infoBalance, subIndex, fixTabs } = this.state;
        var { balance = "--",
            ratioPL = 0,
            totalPL = 0,
            totalQty = 0 } = infoBalance;

        return (
            <div>
                <IScrollView className={this.getScrollStyle()}
                    canUpFresh={true} canDownFresh={true} upFresh={this.reloadData} downFresh={this.getNextPage} probeType={3}
                    onScroll={this.scroll} onScrollEnd={this.scroll} ref="iscroll">

                    <div>
                        <div className={styles.optional_detail}>
                            <div className={styles.currency_name}>
                                <p>
                                    <span className={this.mergeClassName("blue", "left")}>体验金账号</span>
                                    <span className={this.mergeClassName("c9", "left")}>(自主交易)</span>
                                    <i className={this.mergeClassName(styles.icon_select, "mg-tp-0")}></i>
                                </p>
                                <p className={this.mergeClassName("c3", "font48", "mg-tp-42", styles.c3)}>${balance}</p>
                            </div>
                            <div className={"right"}>
                                <div className={styles.icon_account}>切换</div>
                            </div>
                            <div className={"clear"}></div>
                            <div className={"mg-lr-30"}>
                                <span className={this.mergeClassName("left", "c9")}>交易账户</span>
                            </div>
                            <div className={"clear"}></div>
                            <div className={styles.account_dt}>
                                <ul>
                                    <li>
                                        <p className={"font32"}>${totalPL}</p>
                                        <p className={this.mergeClassName("c9", "mg-tp-10")}>总收益</p>
                                    </li>
                                    <li>
                                        <p className={"font32"}>{totalQty}</p>
                                        <p className={this.mergeClassName("c9", "mg-tp-10")}>交易手数</p>
                                    </li>
                                    <li>
                                        <p className={"font32"}>{ratioPL}%</p>
                                        <p className={this.mergeClassName("c9", "mg-tp-10")}>收益率</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.detail_info}>
                            {this.renderTabs()}
                            <LazyLoad index={subIndex}>
                                <HistoryList ref="historyList"/>
                                <HistoryList />
                            </LazyLoad>
                        </div>
                    </div>
                </IScrollView>
                {fixTabs ? (
                    <div className={styles.fixed}>{this.renderTabs()}</div>
                ) : null}
            </div>
        );
    }

}

function injectProps(state) {
    var { accountArr } = state.base || {};
    return { accountArr };
}
function injectAction() {
    return { getHistoryInfo }
}

module.exports = connect(injectProps, injectAction())(TradeHistory);
