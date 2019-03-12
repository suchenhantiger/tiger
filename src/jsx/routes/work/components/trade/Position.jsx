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
            fixTabs: false
        }
        this.shouldFresh = false;
    }

    componentDidMount() {
        //持仓详情
        var mt4Id = systemApi.getValue("mt4Id");
        if (mt4Id == null || mt4Id.length == 0) {
            //没有账号或者账号异常

            return;
        }

        this.props.getPositionInfo(this, { mt4Id, queryType: 2 ,floatTrade:1,force:1}, true, () => {

            this.beginPolling();
            this.props.getPositionAllOrder(this, { mt4Id }, (data) => {
                this.setState({ allList: data });
            });
        },()=>{
            //失败回调，也需要轮巡
            this.beginPolling();
        });
        Event.register("refresh_order_list",this.refreshOrderList);
    }

    refreshOrderList=()=>{
           //持仓详情
           var mt4Id = systemApi.getValue("mt4Id");
           if (mt4Id == null || mt4Id.length == 0) {
               //没有账号或者账号异常
               return;
           }
        this.props.getPositionAllOrder(this, { mt4Id }, (data) => {
            this.setState({ allList: data });
        });
    }


    componentWillUnmount(){
        super.componentWillUnmount();
        clearInterval(this._interval);
        Event.unregister("refresh_order_list",this.refreshOrderList);
    }

    beginPolling = ()=>{

        this._interval = setInterval(()=>{
                        //持仓详情
            var mt4Id = systemApi.getValue("mt4Id");
            if (mt4Id == null || mt4Id.length == 0) {
                //没有账号或者账号异常
                return;
            }
            this.props.getPositionInfo(this, { mt4Id, queryType: 2 ,floatTrade:1,force:0}, false);


        },10000);
    }
    componentWillUpdate(nextProps, nextState){
        var {fixTabs} = nextState;
        if(this.state.fixTabs == fixTabs){
            this.shouldFresh = true;
        }
    }

    componentDidUpdate() {
        var { iscroll } = this.refs;
        if(this.shouldFresh){
            iscroll && iscroll.refresh()
        }
        this.shouldFresh = false;
    }


    tabClick = (subIndex) => () => {
        this.setState({ subIndex });
    }

    clickOrder = (data) => {

        hashHistory.push({
            pathname: "/work/trade/flatdetail",
            query: { prodInfo: JSON.stringify(data) }
        });

    }

    clickHang = (data) => {
 

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
        this.setState({ fixTabs: yRem < -4.6 });
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

        var { subIndex, allList, fixTabs } = this.state;
        var {infoEquity={},floatTrade=[]} =this.props;
        var { hanglist = [], couplist = [], orderlist = [] } = allList;
        var { equity = "--",
            floatPL = "--",
            freeMargin = "--",
            ratioMargin = "--",
            usedMargin = "--" } = infoEquity;


        return (
            <div>
                <IScrollView className={this.getScrollStyle()}
                    canUpFresh={true} upFresh={this.reloadData} probeType={3}
                    onScroll={this.scroll} onScrollEnd={this.scroll} ref="iscroll">

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
                                <PositionAllList floatTrade={floatTrade} data={orderlist} onItemClick={this.clickOrder} />
                                <HangList data={hanglist} onItemClick={this.clickHang} />
                                <PositionAllList floatTrade={floatTrade} data={couplist} />
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
    var { infoEquity ,floatTrade} = state.trade || {};
    return { infoEquity,floatTrade };
}
function injectAction() {
    return { getPositionInfo, getPositionAllOrder, flatOrder, updateOrder }
}

module.exports = connect(injectProps, injectAction())(Position);
