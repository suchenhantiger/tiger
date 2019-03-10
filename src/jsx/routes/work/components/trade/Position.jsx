import { connect } from 'react-redux';
import { getPositionInfo, getPositionAllOrder, flatOrder, updateOrder } from "../../actions/trade/tradeAction";
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';
import PositionAllList from "./PositionAllList";
import HangList from "./HangList";

import styles from './css/position.less';

class Position extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            subIndex: 0,
            allList: {},
            mt4Info: {},
            fixTabs: false
        }
    }

    componentDidMount() {
        //持仓详情
        var mt4Id = systemApi.getValue("mt4Id");
        if (mt4Id == null || mt4Id.length == 0) {
            //没有账号或者账号异常

            return;
        }

        this.props.getPositionInfo(this, { mt4Id, queryType: 2 }, true, (mt4Info) => {
            this.setState({ mt4Info });
            this.props.getPositionAllOrder(this, { mt4Id }, (data) => {
                this.setState({ allList: data });
            });
        });

    }

    componentDidUpdate() {
        var { iscroll } = this.refs;
        iscroll && iscroll.refresh()
    }


    tabClick = (subIndex) => () => {
        this.setState({ subIndex });
    }

    clickOrder = (data) => {


        // var {orderId,
        //     marketPrice,
        //     mt4Id,
        //     marketTime
        //     } =data;
        // this.props.updateOrder(this,{openType:0,mt4Id,orderId,stopPrice:"119.881"},()=>{

        // });
        // return;




        // console.log();
        // var {orderId,
        //     marketPrice,
        //     mt4Id,
        //     marketTime
        //     } =data;
        // this.props.flatOrder(this,{tradeType:0,mt4Id,orderId,tradeTime:marketTime,tradePrice:marketPrice},()=>{

        // });
        // return;

        hashHistory.push({
            pathname: "/work/trade/flatdetail",
            query: { prodInfo: JSON.stringify(data) }
        });

    }

    clickHang = (data) => {
        var { orderId,
            marketPrice,
            mt4Id,
            marketTime
        } = data;
        this.props.flatOrder(this, { tradeType: 1, mt4Id, orderId, tradeTime: marketTime, tradePrice: marketPrice }, () => {

        });
        return;

        hashHistory.push({
            pathname: "/work/trade/flatdetail",
            query: { prodInfo: JSON.stringify(data) }
        });

    }

    getScrollStyle() {
        return styles.frame;
    }

    reloadData = () => {
        console.log("reload");
    }

    scroll = (x, y) => {
        var yRem = this.calculateRem(0, y);
        console.log(yRem < -4.5);
        this.setState({ fixTabs: yRem < -4.5 });
    }

    renderTabs() {
        var { subIndex } = this.state;
        return (
            <div className={this.mergeClassName("center", styles.hd_tabs, "mg-tp-20")}>
                <span className={subIndex == 0 ? styles.on : ""} onClick={this.tabClick(0)}>自主持仓<i></i></span>
                <span className={subIndex == 1 ? styles.on : ""} onClick={this.tabClick(1)}>挂单交易<i></i></span>
                <span className={subIndex == 2 ? styles.on : ""} onClick={this.tabClick(2)}>跟单<i></i></span>
            </div>
        )
    }

    //渲染函数
    render() {

        var { subIndex, allList, mt4Info, fixTabs } = this.state;
        var { hanglist = [], couplist = [], orderlist = [] } = allList;
        var { equity = "--",
            floatPL = "--",
            freeMargin = "--",
            ratioMargin = "--",
            usedMargin = "--" } = mt4Info;

        return (
            <div>
                <IScrollView className={this.getScrollStyle()}
                    canUpFresh={true} upFresh={this.reloadData}
                    onScroll={this.scroll} ref="iscroll">

                    <div>
                        <div className={styles.optional_detail}>
                            <div className={styles.currency_name}>
                                <p>
                                    <span className={this.mergeClassName("blue", "left")}>体验金账号</span>
                                    <span className={this.mergeClassName("c9", "left")}>(自主交易)</span>
                                    <i className={this.mergeClassName(styles.icon_select, "mg-tp-0")}></i>
                                </p>
                                <p className={this.mergeClassName("c3", "font48", "mg-tp-42", styles.c3)}>${floatPL}</p>
                            </div>
                            <div className={"right"}>
                                <div className={styles.icon_account}>切换</div>
                            </div>
                            <div className={"clear"}></div>
                            <div className={"mg-lr-30"}>
                                <span className={this.mergeClassName("left", "c9")}>浮动盈亏</span>
                                <span className={this.mergeClassName("right", "blue")}>充值/提现</span>
                            </div>
                            <div className={"clear"}></div>
                            <div className={styles.account_dt}>
                                <ul>
                                    <li>
                                        <p className={"font32"}>${freeMargin}</p>
                                        <p className={this.mergeClassName("c9", "mg-tp-10")}>可用保证金</p>
                                    </li>
                                    <li>
                                        <p className={"font32"}>${usedMargin}</p>
                                        <p className={this.mergeClassName("c9", "mg-tp-10")}>已用保证金</p>
                                    </li>
                                    <li>
                                        <p className={"font32"}>{ratioMargin}%</p>
                                        <p className={this.mergeClassName("c9", "mg-tp-10")}>保证金比例</p>
                                    </li>
                                    <li>
                                        <p className={"font32"}>{equity}</p>
                                        <p className={this.mergeClassName("c9", "mg-tp-10")}>账户净值</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.detail_info}>
                            {this.renderTabs()}
                            <LazyLoad index={subIndex}>
                                <PositionAllList data={orderlist} onItemClick={this.clickOrder} />
                                <HangList data={hanglist} onItemClick={this.clickHang} />
                                <PositionAllList data={couplist} />
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
    return { getPositionInfo, getPositionAllOrder, flatOrder, updateOrder }
}

module.exports = connect(null, injectAction())(Position);
