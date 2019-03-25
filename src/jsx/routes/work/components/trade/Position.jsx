import { connect } from 'react-redux';
import { getPositionInfo, updatePositionInfo,updatePositionList,getPositionAllOrder, flatOrder, updateOrder } from "../../actions/trade/tradeAction";
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';
import PositionAllList from "./PositionAllList";
import HangList from "./HangList";
import AccountSelect from '../../components/me/AccountSelect';
import styles from './css/position.less';

class Position extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            subIndex: 0,
            allList: {},
            fixTabs: false,
            showAccount:false
        }
        this.shouldFresh = false;
        this._mt4Id = systemApi.getValue("mt4Id");
        this._mt4AccType = systemApi.getValue("mt4AccType");
        this._prodsStr = "";
    }



    componentDidMount() {

        this.refreshAllData();
       
        Event.register("refresh_order_list",this.refreshOrderList);
        Event.register("ws_trade_list",this.wsPush);
        this._interval1 = setInterval(()=>{
            var {iscroll} = this.refs;
            if(iscroll){
                var {y} = iscroll.wrapper,
                    yRem = this.calculateRem(0, y);
                this.setState({ fixTabs: yRem < -3.34 });;
            }
        }, 50);
    }



    startWs =()=>{

        var reqStr = JSON.stringify({"funCode":"301003","mt4Id":this._mt4Id,prodCode:this._prodsStr});
        //重置回调函数
        WebSocketUtil.onClose=()=>{
            console.log("301003 close");
            };
        WebSocketUtil.onMessage=(wsData)=>{
            //    console.log("---onmessage");
            wsData = JSON.parse(wsData);
            // console.log(wsData);
            for(var i=0,l=wsData.length;i<l;i++){
                var {funCode,data} = wsData[i];
                if(funCode=="301003"){
                    this.updateFloat(data);
                }else if(funCode=="301002"){
                    this.updatePosition(data);
                }else if(funCode=="3010031"){
                    this.refreshOrderList();
                }
            }

        };
        WebSocketUtil.onError=(evt)=>{
            console.log("301003 Error");
        };

        if(!WebSocketUtil.send(reqStr)){
            //发送失败就重新创建一个
            WebSocketUtil.onOpen=()=>{
                console.log("301003 open ");
                WebSocketUtil.send(reqStr)
            };
            WebSocketUtil.creatWebSocket(systemApi.getValue("websocketUrl"));
        }
        
    
    }

    updatePosition = (data)=>{
        this.props.updatePositionInfo(data);
    }

    updateFloat = (data)=>{
        this.props.updatePositionList(data);
        
    }

    refreshAllData =()=>{

         //持仓详情
         var mt4Id = this._mt4Id;
         if (mt4Id == null || mt4Id.length == 0) {
             //没有账号或者账号异常
 
             return;
         }
 
         this.props.getPositionInfo(this, { mt4Id, queryType: 2 ,floatTrade:1,force:1}, false, () => {
 
            // this.beginPolling();
             this.props.getPositionAllOrder(this,false, { mt4Id }, (data) => {
                 this.setState({ allList: data },()=>{
                    // console.log(data);
                     var {hanglist = [], couplist = [], orderlist = [] } = data;
                     var prodList=[];
                     for(var i=0,l=orderlist.length;i<l;i++){
                         var {prodCode}=orderlist[i];
                         prodList.push(prodCode);
                     }
                     for(var i=0,l=hanglist.length;i<l;i++){
                         var {prodCode}=hanglist[i];
                         prodList.push(prodCode);
                     }
                     for(var i=0,l=couplist.length;i<l;i++){
                         var {prodCode}=couplist[i];
                         prodList.push(prodCode);
                     }
                     this._prodsStr = prodList.join(",");
                     this.startWs();
                 });
             });
         },()=>{
             //失败回调，也需要轮巡
          //   this.beginPolling();
         });

    }

    refreshOrderList=()=>{
           //持仓详情
        var mt4Id = this._mt4Id;
        if (mt4Id == null || mt4Id.length == 0) {
            //没有账号或者账号异常
            return;
        }
        this.props.getPositionAllOrder(this,true, { mt4Id }, (data) => {
            this.setState({ allList: data },()=>{
                var {hanglist = [], couplist = [], orderlist = [] } = data;
                var prodList=[];
                for(var i=0,l=orderlist.length;i<l;i++){
                    var {prodCode}=orderlist[i];
                    prodList.push(prodCode);
                }
                for(var i=0,l=hanglist.length;i<l;i++){
                    var {prodCode}=hanglist[i];
                    prodList.push(prodCode);
                }
                for(var i=0,l=couplist.length;i<l;i++){
                    var {prodCode}=couplist[i];
                    prodList.push(prodCode);
                }
                this._prodsStr = prodList.join(",");
                this.startWs();
            });
        });
    }


    componentWillUnmount(){
        super.componentWillUnmount();
        clearInterval(this._interval);
        clearInterval(this._interval1);
        Event.unregister("refresh_order_list",this.refreshOrderList);
        Event.unregister("ws_trade_list",this.wsPush);
    }

    wsPush = ()=>{
        if(this._mt4Id && this._prodsStr)
            this.startWs();
    }

    beginPolling = ()=>{

        this._interval = setInterval(()=>{
                        //持仓详情
            var mt4Id = this._mt4Id;
            if (mt4Id == null || mt4Id.length == 0) {
                //没有账号或者账号异常
                return;
            }
            this.props.getPositionInfo(this, { mt4Id, queryType: 2 ,floatTrade:1,force:0}, false);


        },5000);
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
        setTimeout(()=>{
            var {iscroll} = this.refs,
                yRem = this.calculateRem(0, iscroll.wrapper.y);
            this.setState({ fixTabs: yRem < -4.6 });
        },50);
    }

    clickOrder = (data) => {

        hashHistory.push({
            pathname: "/work/trade/flatdetail",
            query: { prodInfo: JSON.stringify(data) }
        });

    }

    clickHang = (data) => {
 

        hashHistory.push({
            pathname: "/work/trade/hangdetail",
            query: { prodInfo: JSON.stringify(data) }
        });

    }

    getScrollStyle() {
        return styles.frame;
    }

    reloadData = () => {
        console.log("reload");
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
//切换账号
    showAccount = ()=>{
        this.setState({showAccount:true});
    }

    closeAccount = ()=>{
        this.setState({showAccount:false});
    }

    selectAccount = (mt4AccType, mt4Id)=>{
        systemApi.setValue("mt4AccType", mt4AccType);
        systemApi.setValue("mt4Id", mt4Id);
        this._mt4Id =mt4Id;
        this._mt4AccType = mt4AccType;
        this.setState({showAccount:false});
        this.refreshAllData();
    }

    //渲染函数
    render() {

        var { subIndex, allList, fixTabs ,showAccount} = this.state;
        var {infoEquity={},floatTrade=[]} =this.props;
        var { hanglist = [], couplist = [], orderlist = [] } = allList;
        var { equity = "--",
            floatPL = "--",
            freeMargin = "--",
            ratioMargin = "--",
            usedMargin = "--" } = infoEquity;
        


        
        var accName = "--";
        if(this._mt4Id ==null || this._mt4Id.length==0 ){
            //没有账号或者账号异常

        }else if(this._mt4AccType =="0"){
            accName ="体验金账户";
        }else if(this._mt4AccType=="1"){
            accName ="交易账户";
        }else if(this._mt4AccType=="2"){
            accName ="跟单账户";
        }

        return (
            <div>
                <IScrollView className={this.getScrollStyle()}
                    canUpFresh={true} upFresh={this.reloadData} ref="iscroll">
                    <div>
                        <div className={styles.optional_detail}>
                            <div className={styles.currency_name}>
                                <p onClick={this.showAccount}>
                                    <span className={this.mergeClassName("blue", "left")} >{accName}</span>
                                    <span className={this.mergeClassName("c9", "left")}>({this._mt4Id?this._mt4Id:"--"})</span>
                                    <i className={this.mergeClassName(styles.icon_select, "mg-tp-0")}></i>
                                </p>
                                <p className={this.mergeClassName("c3", "font48", "mg-tp-42", styles.c3)}>${floatPL}</p>
                            </div>
                            <div className={"right"}>
                                <div className={styles.icon_account} onClick={this.showAccount}>切换</div>
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
                                <HangList floatTrade={floatTrade} data={hanglist} onItemClick={this.clickHang} />
                                <PositionAllList floatTrade={floatTrade} data={couplist} />
                            </LazyLoad>
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
    var { infoEquity ,floatTrade} = state.trade || {};
    return { infoEquity,floatTrade };
}
function injectAction() {
    return { getPositionInfo, getPositionAllOrder, flatOrder, updateOrder ,updatePositionInfo,updatePositionList}
}

module.exports = connect(injectProps, injectAction())(Position);
