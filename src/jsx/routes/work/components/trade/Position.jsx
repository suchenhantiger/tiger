import { connect } from 'react-redux';
import { getPositionInfo, updatePositionInfo,synMt4List,synMt4Info,
    updatePositionList,getPositionAllOrder,
     flatOrder } from "../../actions/trade/tradeAction";
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';
import PositionAllList from "./PositionAllList";
import HangList from "./HangList";
import AccountSelect from '../../components/me/AccountSelect';
import CopyAllList from "./CopyAllList";
import CurrFowList from "./CurrFowList";
import MyCurrFowList from "./MyCurrFowList";
import NoMt4Frame from "../me/NoMt4Frame";


import styles from './css/position.less';

class Position extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            subIndex: 0,
            fixTabs: false,
            showAccount:false
        }
        this.shouldFresh = false;
        this._mt4Id = systemApi.getValue("mt4Id");
        this._mt4AccType = systemApi.getValue("mt4AccType");
        this._mt4NickName = systemApi.getValue("mt4NickName");
       
        this._prodsStr = "";
        this._ver=0;
    }



    componentDidMount() {

        this.refreshAllData();
        Event.register("refresh_order_list",this.refreshAllData);
        Event.register("ws_trade_list",this.wsPush);
        Event.register("chanege_mt4id",this.refreshAllData);
    
    }

    

    scrolling=()=>{
        
        var {iscroll} = this.refs;
        if(iscroll){
            var {y} = iscroll.wrapper,
                yRem = this.calculateRem(0, y);
                // console.log(yRem);
            this.setState({ fixTabs: yRem < -5.2 });;
        }
    }



    startWs =(str)=>{
        //测试代码
        // this._interval1 = setInterval(()=>{
        //     var ttt={"symbol":"XAUUSD.","ask":1285.14,"bid":1284.74,"ctm":1558706099,"exchangeRate":1.0,"isClose":true};
        //     this.updateFloat(ttt);
        // }, 1000);


        if(str)
            var reqStr = str;
        else
            var reqStr = JSON.stringify({"funCode":"301003","mt4Id":this._mt4Id,prodCode:this._prodsStr,"ver":this._ver});

        // if(!WebSocketUtil.isValid()){


        //     return;
        // }
        //重置回调函数
        WebSocketUtil.onClose=()=>{
          //  console.log("301003 close");
            };
        WebSocketUtil.onMessage=(wsData)=>{
            wsData = JSON.parse(wsData);
            // console.log(wsData);
            
            for(var i=0,l=wsData.length;i<l;i++){
                var {funCode,data,ver} = wsData[i];
                if(funCode=="301003"){
                    this.updateFloat(data);
                }else if(funCode=="301002"){
                    if(ver && ver>=this._ver){
                         this.updatePosition(data);
                    }
                   
                }else if(funCode=="3010031"){
                    this.refreshAllData();
                }else if(funCode=="3010032"){
                    if(ver && ver>=this._ver){
                        this.synMt4List(data);
                   }
                }else if(funCode=="3010022"){
                    if(ver && ver>=this._ver){
                        this.synMt4Info(data);
                   }
                }
            }

        };
        WebSocketUtil.onError=(evt)=>{
        };

        if(!WebSocketUtil.send(reqStr)){
            //发送失败就重新创建一个
            WebSocketUtil.onOpen=()=>{
                WebSocketUtil.send(reqStr)
            };
            WebSocketUtil.creatWebSocket(systemApi.getValue("websocketUrl"));
        }
        
    
    }

    synMt4List = (data)=>{
        this.props.synMt4List(data);
    }
    synMt4Info = (data)=>{
        this.props.synMt4Info(data);
    }

    updatePosition = (data)=>{
        this.props.updatePositionInfo(data);
    }

    updateFloat = (data)=>{
        this.props.updatePositionList(data);
        
    }

    refreshAllData =()=>{
        var {infoEquity}=this.props,
        {balance}=infoEquity;
        
        var showloading = false;
        if(balance ==null)
            showloading=true;
   
        this._mt4Id = systemApi.getValue("mt4Id");
        this._mt4AccType = systemApi.getValue("mt4AccType");
        this._mt4NickName = systemApi.getValue("mt4NickName");
         if (this._mt4Id  == null || this._mt4Id .length == 0) {
             //没有账号或者账号异常
 
             return;
         }
         this._ver++;
         this.props.getPositionInfo(this, { mt4Id:this._mt4Id , queryType: 2 ,floatTrade:1,force:0}, false, () => {
            // this.beginPolling();

         },()=>{
             //失败回调，也需要轮巡
          //   this.beginPolling();
         });

         this.props.getPositionAllOrder(this,showloading, { mt4Id:this._mt4Id }, (prodList) => {
            this._prodsStr = prodList.join(",");
            this.startWs();
        });

    }

    refreshOrderList=()=>{
           //持仓详情
        var mt4Id = this._mt4Id;
        if (mt4Id == null || mt4Id.length == 0) {
            //没有账号或者账号异常
            return;
        }
        this.props.getPositionAllOrder(this,true, { mt4Id }, (prodList) => {
                this._prodsStr = prodList.join(",");
                this.startWs();
        });
    }


    componentWillUnmount(){
        super.componentWillUnmount();
        clearInterval(this._interval);
        //clearInterval(this._interval1);
        Event.unregister("refresh_order_list",this.refreshOrderList);
        Event.unregister("ws_trade_list",this.wsPush);
        Event.unregister("chanege_mt4id",this.refreshAllData);

        this.startWs("0");
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
            var {y} = iscroll.wrapper;
            var {showfresh} = this.props;
            // systemApi.log("sch up 1 : "+this.oldShowfresh);
            // systemApi.log("sch up 2 : "+showfresh);
            if(this.oldShowfresh != showfresh){
                iscroll && iscroll.refresh();
            //    console.log("sch refresh:");
            }
          
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
        this.refreshAllData();
    }

    renderTabs() {
        var { subIndex } = this.state;
        if(this._mt4AccType==2){
            return (
                <div className={this.mergeClassName("center", styles.hd_tabs, "mg-tp-20")}>
                    
                    <span className={subIndex == 0 ? styles.on : ""} onClick={this.tabClick(0)}>全部订单<i></i></span>
                    <span className={subIndex == 1 ? styles.on : ""} onClick={this.tabClick(1)}>正在跟随<i></i></span>
                </div>
            )

        }else if(this._mt4AccType==3){
            return (
                <div className={this.mergeClassName("center", styles.hd_tabs, "mg-tp-20")}>
                    <span className={subIndex == 0 ? styles.on : ""} onClick={this.tabClick(0)}>自主持仓<i></i></span>
                    <span className={subIndex == 1 ? styles.on : ""} onClick={this.tabClick(1)}>挂单交易<i></i></span>
                    <span className={subIndex == 2 ? styles.on : ""} onClick={this.tabClick(2)}>正在跟随<i></i></span>
                </div>
            )

        }else{
            return (
                <div className={this.mergeClassName("center", styles.hd_tabs, "mg-tp-20")}>
                    <span className={subIndex == 0 ? styles.on : ""} onClick={this.tabClick(0)}>自主持仓<i></i></span>
                    <span className={subIndex == 1 ? styles.on : ""} onClick={this.tabClick(1)}>挂单交易<i></i></span>
                </div>
            )

        }
        
    }
//切换账号
    showAccount = ()=>{
        this.setState({showAccount:true});
    }

    closeAccount = ()=>{
        this.setState({showAccount:false});
    }

    refreshScroll=()=>{
        var { iscroll } = this.refs;
        iscroll && iscroll.refresh()
        
    }

    selectAccount = (mt4AccType, mt4Id,mt4NickName)=>{
        systemApi.setValue("mt4AccType", mt4AccType);
        systemApi.setValue("mt4Id", mt4Id);
        systemApi.setValue("mt4NickName",mt4NickName);
        this._mt4Id =mt4Id;
        this._mt4AccType = mt4AccType;
        this._mt4NickName = mt4NickName;
        this.setState({showAccount:false,subIndex:0});
       // this.refreshAllData();
        Event.fire("chanege_mt4id");
    }


    gotoCharge =()=>{

        hashHistory.push("/work/me/recharge");
    }


    componentWillReceiveProps(nextProps){
        this.oldShowfresh =this.props.showfresh;
        systemApi.log("sch oldShowfresh : "+this.oldShowfresh);
    }

    //渲染函数
    render() {

        var {hanglist,couplist,orderlist,emailIsActive,isReal,
            infoEquity={},floatPL,f_floatPL} = this.props;
        var { subIndex, fixTabs ,showAccount} = this.state;

        var { equity = "--",
            freeMargin = "--",
            ratioMargin = "--",
            usedMargin = "--" } = infoEquity;
    
        
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

        // if(orderlist[0])
        // console.log("sch :"+JSON.stringify(orderlist[0].ask));
        var tmpfloatPL = floatPL;
        if(this._mt4AccType==2)
            tmpfloatPL = f_floatPL
        tmpfloatPL =(+tmpfloatPL).toFixed(2);
      console.log("sch111 "+this._mt4AccType+" "+accName);
        return (
            <div>
                <IScrollView onScroll={this.scrolling}  onStep={this.scrolling} className={this.getScrollStyle()}
                upFresh={this.reloadData}
                    canUpFresh={true}  ref="iscroll">
                    <div>
                        {emailIsActive==0?
                        <NoMt4Frame />:
                        <div className={styles.optional_detail}>
                        <div className={styles.currency_name}>
                            <p style={{height:".26rem"}} onClick={this.showAccount}>
                                <span className={this.mergeClassName("blue", "left","font26","font_bold")} >{accName}</span>
                                <span className={this.mergeClassName("c9", "left")}>({typeName})</span>
                                <i className={this.mergeClassName(styles.icon_select, "mg-tp-0")}></i>
                            </p>
                            <p className={this.mergeClassName("c3", "font48", "mg-tp-30", styles.c3)}>${tmpfloatPL}</p>
                        </div>
                        <div className={"right"}>
                            <div className={styles.icon_account} onClick={this.showAccount}>{McIntl.message("switch")}</div>
                        </div>
                        <div className={"clear"}></div>
                        <div className={"mg-lr-30"}>
                            <span className={"left c9 pd-tp-20"}>浮动盈亏</span>
                            {isReal==3?<span className={"right pd-tp-20 pd-lt-50"} onClick={this.gotoCharge}>充值/提现</span>:null}
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
                        
                    }
                        
                        <div className={styles.detail_info}>
                            {this.renderTabs()}
                            {this._mt4AccType==2?<LazyLoad index={subIndex}>
                                <CopyAllList  data={couplist} onItemClick={this.clickOrder} />
                                <CurrFowList refreshScroll={this.refreshScroll} couplist={couplist} fowMt4Id={this._mt4Id}   onItemClick={this.clickOrder} />
                                
                            </LazyLoad>
                            :null}
                            {this._mt4AccType==3?<LazyLoad index={subIndex}>
           
                                <PositionAllList  data={orderlist} onItemClick={this.clickOrder} />
                                <HangList  data={hanglist} onItemClick={this.clickHang} />
                                <MyCurrFowList fowMt4Id={this._mt4Id}   onItemClick={this.clickHang} />
                                
                            </LazyLoad>:null}
                            {this._mt4AccType!=3 && this._mt4AccType!=2?<LazyLoad index={subIndex}>
           
                                <PositionAllList  data={orderlist} onItemClick={this.clickOrder} />
                                <HangList  data={hanglist} onItemClick={this.clickHang} />
                                <MyCurrFowList fowMt4Id={this._mt4Id}   onItemClick={this.clickHang} />
                                
                            </LazyLoad>:null}
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
    var {infoEquity,floatPL,f_floatPL ,hanglist,couplist,orderlist,showfresh} = state.base || {};
    return { infoEquity,floatPL,f_floatPL,hanglist,couplist,orderlist,showfresh };
}
function injectAction() {
    return { getPositionInfo, getPositionAllOrder, flatOrder ,updatePositionInfo,updatePositionList,synMt4List,synMt4Info}
}

module.exports = connect(injectProps, injectAction())(Position);
