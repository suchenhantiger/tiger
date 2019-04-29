import { connect } from 'react-redux';
import { getHistoryInfo, } from "../../actions/trade/tradeAction";

import LazyLoad from '../../../../components/common/subtabs/LazyLoad';
import HistoryList from './HistoryList';
import HistoryCopyList from './HistoryCopyList';

import AccFundRecordList from './AccFundRecordList';
import AccountSelect from '../../components/me/AccountSelect';
import styles from './css/tradeHistory.less';
import NoMt4Frame from "../me/NoMt4Frame";
class TradeHistory extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            subIndex: 0,
            infoBalance: {},
            fixTabs: false,
            showAccount:false
        }
        this.shouldFresh = false;
        this._mt4Id = systemApi.getValue("mt4Id");
        this._mt4AccType = systemApi.getValue("mt4AccType");
        this._mt4NickName = systemApi.getValue("mt4NickName");
    }

    componentDidMount() {
        //持仓详情
        //持仓详情
        this.refreshAllData();
        Event.register("chanege_mt4id",this.refreshAllData);
       
    }

    componentWillUnmount(){
        super.componentWillUnmount();
        Event.unregister("chanege_mt4id",this.refreshAllData);
    }

    refreshAllData=()=>{
        this._mt4Id = systemApi.getValue("mt4Id");
        this._mt4AccType = systemApi.getValue("mt4AccType");
        this._mt4NickName = systemApi.getValue("mt4NickName");
        if (this._mt4Id == null || this._mt4Id.length == 0) {
            //没有账号或者账号异常
            return;
        }
        this.props.getHistoryInfo(this, { mt4Id:this._mt4Id, queryType: 1 }, (infoBalance) => {
            this.setState({ infoBalance });
        });
    }

    componentWillUpdate(nextProps, nextState) {
        var { fixTabs, subIndex} = nextState;
        if (this.state.fixTabs == fixTabs || this.state.subIndex != subIndex) {
            this.shouldFresh = true;
        }
    }

    refreshScroll=(hasMore)=>{
        var { iscroll } = this.refs;
        setTimeout(function(){
            iscroll && iscroll.refresh();
            iscroll.setHasMore(hasMore);
        },50);

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
     
        var {subIndex} = this.state,
        {historyList,historyCopyList,moneyList} = this.refs;
        if(this._mt4AccType==2){//跟单账号需特殊处理
            if(subIndex == 0){
                
                  historyList && historyList.getWrappedInstance().reload();
            }else if(subIndex == 1){
                
                  historyCopyList && historyCopyList.getWrappedInstance().reload();
            }else if(subIndex == 2){
                
                moneyList && moneyList.getWrappedInstance().reload();
            }
        }else{
            if(subIndex == 0){
                
                  historyList && historyList.getWrappedInstance().reload();
            }else if(subIndex == 1){
                
                moneyList && moneyList.getWrappedInstance().reload();
            }

        }
        this.refreshAllData();
        
    }

    scrolling=()=>{
        
        var {iscroll} = this.refs;
        if(iscroll){
            var {y} = iscroll.wrapper,
                yRem = this.calculateRem(0, y);
                //  console.log(yRem);
            this.setState({ fixTabs: yRem < -3.9 });;
        }
    }

    tabClick = (subIndex) => () => {
        this.setState({ subIndex });
    }

    renderTabs() {
        var { subIndex } = this.state;
        if(this._mt4AccType==2){
            return (<div className={this.mergeClassName("center", styles.hd_tabs, "mg-tp-20")}>
                <span className={subIndex == 0 ? styles.on : ""} onClick={this.tabClick(0)}>平仓订单<i></i></span>
                <span className={subIndex == 1 ? styles.on : ""} onClick={this.tabClick(1)}>历史跟随<i></i></span>
                <span className={subIndex == 2 ? styles.on : ""} onClick={this.tabClick(2)}>资金记录<i></i></span>
            </div>)

        }else{
            if(subIndex>1)  subIndex=1;
            
            return (
                <div className={this.mergeClassName("center", styles.hd_tabs, "mg-tp-20")}>
                    <span className={subIndex == 0 ? styles.on : ""} onClick={this.tabClick(0)}>平仓订单<i></i></span>
                    <span className={subIndex == 1 ? styles.on : ""} onClick={this.tabClick(1)}>资金记录<i></i></span>
                </div>
            )
        }
        
    }

    getNextPage = ()=>{
        var {subIndex} = this.state,
        {historyList,historyCopyList,moneyList} = this.refs;
        if(this._mt4AccType==2){//跟单账号需特殊处理
            if(subIndex == 0){
                
                  historyList && historyList.getWrappedInstance().getNextPage();
            }else if(subIndex == 1){
                
                historyCopyList && historyCopyList.getWrappedInstance().getNextPage();
            }else if(subIndex == 2){
                
                moneyList && moneyList.getWrappedInstance().getNextPage();
            }
        }else{
            if(subIndex == 0){
                
                  historyList && historyList.getWrappedInstance().getNextPage();
            }else if(subIndex == 1){
                
                moneyList && moneyList.getWrappedInstance().getNextPage();
            }

        }
    }

    closeAccount = ()=>{
        this.setState({showAccount:false});
    }

    selectAccount = (mt4AccType, mt4Id,mt4NickName)=>{
        systemApi.setValue("mt4AccType", mt4AccType);
        systemApi.setValue("mt4Id", mt4Id);
        systemApi.setValue("mt4NickName", mt4NickName);
        this._mt4Id =mt4Id;
        this._mt4AccType = mt4AccType;
        this._mt4NickName = mt4NickName;
        this.setState({showAccount:false});
        Event.fire("chanege_mt4id");
    }
    showAccount = ()=>{
        this.setState({showAccount:true});
    }
    gotoCharge =()=>{
        hashHistory.push("/work/me/recharge");
    }
    //渲染函数
    render() {
        var {emailIsActive,isReal} =this.props;
        var { infoBalance, subIndex, fixTabs,showAccount } = this.state;
        var { balance = "--",
            ratioPL = 0,
            totalPL = 0,
            totalQty = 0 } = infoBalance;

            var accName = "--";
            var typeName = "";
            if(this._mt4Id ==null || this._mt4Id.length==0 ){
                //没有账号或者账号异常
    
            }else if(this._mt4AccType ==0){
                accName ="体验金账户";
                typeName = "体验账户"
            }else if(this._mt4AccType==1){
                accName ="交易账户";
                typeName = "自主交易"
            }else if(this._mt4AccType==2){
                accName ="跟单账户";
                typeName = "跟随账户"
            }else if(this._mt4AccType==3){
                accName ="高手账户";
                typeName = "高手账户"
            }
            if(this._mt4NickName!="" && this._mt4NickName!=null && this._mt4NickName!=undefined && this._mt4NickName !="null" && this._mt4NickName !="undefined"){
                
    
                accName =this._mt4NickName;
            }
    
            var loadMore = !(this._mt4AccType==2 && subIndex==1);
        return (
            <div>
                <IScrollView className={this.getScrollStyle()}
                    canUpFresh={loadMore} canDownFresh={loadMore} upFresh={this.reloadData} downFresh={this.getNextPage} 
                    onScroll={this.scrolling} onStep={this.scrolling}  ref="iscroll">

                    <div>
                    {emailIsActive==0?
                        <NoMt4Frame />:
                        <div className={styles.optional_detail}>
                            <div className={styles.currency_name}>
                                <p style={{height:".26rem"}} onClick={this.showAccount}>
                                    <span className={this.mergeClassName("blue", "left","font26","font_bold")}>{accName}</span>
                                    {/* <span className={this.mergeClassName("c9", "left")}>(自主交易)</span> */}
                                    <span className={this.mergeClassName("c9", "left")}>({typeName})</span>

                                    <i className={this.mergeClassName(styles.icon_select, "mg-tp-0")}></i>
                                </p>
                                <p className={this.mergeClassName("c3", "font48", "mg-tp-30", styles.c3)}>${balance}</p>
                            </div>
                            <div className={"right"} onClick={this.showAccount}>
                                <div className={styles.icon_account}>切换</div>
                            </div>
                            
                            <div className={"clear"}></div>
                            <div className={"mg-lr-30"}>
                            <span className={"left c9 pd-tp-20"}>交易账户</span>
                            {isReal==3?<span className={"right pd-tp-20 pd-lt-50"} onClick={this.gotoCharge}>充值/提现</span>:null}
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
                        </div>}
                        <div className={styles.detail_info}>
                            {this.renderTabs()}
                            {this._mt4AccType==2?
                            <LazyLoad key={this._mt4AccType} index={subIndex}>
                                <HistoryList ref="historyList" mt4Id={this._mt4Id} refreshScroll={this.refreshScroll}/>
                                <HistoryCopyList type={2} fowMt4Id={this._mt4Id}  ref="historyCopyList" refreshScroll={this.refreshScroll}/>
                                <AccFundRecordList mt4Id={this._mt4Id} ref="moneyList" refreshScroll={this.refreshScroll}/>
                            </LazyLoad>
                            :
                            <LazyLoad key={this._mt4AccType}  index={subIndex}>    
                                <HistoryList ref="historyList" mt4Id={this._mt4Id} refreshScroll={this.refreshScroll}/>
                                <AccFundRecordList mt4Id={this._mt4Id} ref="moneyList" refreshScroll={this.refreshScroll}/>
                            </LazyLoad>}  
                            
                        </div>
                    </div>
                </IScrollView>
                {fixTabs ? (
                    <div className={styles.fixed}>{this.renderTabs()}</div>
                ) : null}
                {showAccount?<AccountSelect onSelect={this.selectAccount} onClose={this.closeAccount}/>:null}

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
