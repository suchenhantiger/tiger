import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import K_Chart from '../../components/optional/detail/K_Chart';
import FlateDetail from '../../components/trade/detail/FlateDetail';
import styles from './css/tradeDetailPage.less';
import { connect } from 'react-redux';
import { flatOrder,updateOrder } from '../../actions/trade/tradeAction';
import { showMessage} from '../../../../store/actions';
import FlateDialog from './../../components/trade/detail/FlateDialog';
import ConfirmFlate from './../../components/trade/detail/ConfirmFlate';
import RefreshDialog from './../../components/trade/detail/RefreshDialog';

import StopProfitPage from './StopProfitPage'
/********自选-简单*********/
class TradeDetailPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        var { prodInfo } = this.props.location.query;
        this._prodInfo = JSON.parse(prodInfo);
        this.state = {
            index: 0,
            fullscreen: false,
            showOpenSucc:false,
            editProfit:false,
            showConfirm:false,
            refreshFlag:false,
            price:{},
            newInfo:{}

        }
        this._widthCut = this.calculatePx(0.8,0);
        this._heightCut = this.calculatePx(1.98,0);
    }

    componentDidMount() {
        //

        
    }


    componentWillUnmount(){
        //触发列表页的websocket
        Event.fire("ws_trade_list");
        
    }

    openSucc = ()=>{
        this.setState({showOpenSucc:true});
    }

    closeOpenSucc = ()=>{
        Event.fire("refresh_order_list");
        hashHistory.goBack();
    }
    tabChange = (index) => () => {
        this.setState({ index });
    }

    updatePrice = (price) => {
      //  console.log("sch********************");
        if(typeof(price)=="string")
        {
            price = JSON.parse(price);
        }

        this.setState({ price });
    }

    fullScreenToggle = () => {

        this.setState({ fullscreen: true }, () => {
            window.screen.orientation.lock('landscape');
        });
    }
    closeFullScreen = () => {
        this.setState({ fullscreen: false }, () => {
            window.screen.orientation.lock('portrait');
        });
    }

    flateSure=()=>{
        Event.fire("refresh_order_list");
        hashHistory.goBack();
    }

    showConfirm = ()=>{
        var { price } = this.state;
        var {isClose=false}=price;
        if(isClose){
            this.props.showMessage("error","闭市中");
            return;
        }
        this.setState({showConfirm:true});
    }

    closeConfirm = ()=>{
        this.setState({showConfirm:false});
    }

    flatClick=(tradeType)=>()=>{
        this.setState({showConfirm:false});
        var {orderId,
            marketPrice,
            mt4Id,
            marketTime
            } =this._prodInfo ;
        this.props.flatOrder(this,{tradeType,mt4Id,orderId,tradeTime:marketTime,tradePrice:marketPrice},()=>{
            this.setState({showOpenSucc:true});
            
        });

    }

    updateInfo=(data)=>{
        var dataArr = data;
        if(typeof(data)=="string")
        {
           dataArr = JSON.parse(dataArr);
        }

        
        var newInfo = {};
        if(dataArr && dataArr.length>0)
            newInfo=dataArr[0];

        this.setState({newInfo})
    }
        

    stopClick = ()=>{
        var { price } = this.state;
        var {isClose=false}=price;
        if(isClose){
            this.props.showMessage("error","闭市中");
            return;
        }
        this.setState({editProfit:true});
        // hashHistory.push({
        //     pathname:"/work/trade/flatdetail/stopprofit",
        //     query:{}
        // })
    }

    closeEdit=()=>{
        this.setState({editProfit:false});
    } 
    commitEdit=(stopPrice,profitPrice)=>{

        

        var {orderId,
            mt4Id
            } =this._prodInfo;
        var  params={};
        params.orderId= orderId;
        params.mt4Id=mt4Id;
        params.openType=0;
        if(profitPrice) params.profitPrice =profitPrice;
        if(stopPrice) params.stopPrice =stopPrice;
        this.props.updateOrder(this,params,()=>{
           // this.setState({editProfit:false});
            Event.fire("refresh_order_list");
            hashHistory.goBack();

        });
        // return;


    }

    updateDetail =()=>{
        var {showOpenSucc,showConfirm} = this.state;
        if(showOpenSucc ==false && showConfirm ==false){
            this.setState({refreshFlag:true});
        }

    }

    render() {
        systemApi.log("OptionalDetailPage render");

        var { index, fullscreen, price ,showOpenSucc,editProfit,showConfirm,newInfo,refreshFlag} = this.state;
        var {prodName,prodCode,buySell,hangType,marketPrice,mt4Type,digits,ticket} =this._prodInfo;
        var devinfo = systemApi.getDeviceMessage();
        var {screenHeight,
            screenWidth} = devinfo;

        
        var chartWidth = screenWidth;
        var chartHeight = 210;
        if(fullscreen){
            chartWidth = screenHeight -this._widthCut;
            chartHeight = screenWidth - this._heightCut ;
        }
        // console.log("sch chartWidth:"+chartWidth);
        // console.log("sch chartHeight:"+chartHeight);

        var {isClose=false}=price;
        var newProInfo = Object.assign({}, this._prodInfo,newInfo);

        return (
            <FullScreenView>
                {fullscreen ? null : <AppHeader headerName={(buySell==0?"买 ":"卖 ")+prodName + " " + prodCode} theme="white" />}
                <Content >
                    <div className={fullscreen ? styles.kchatFull : styles.kchat} style={{marginTop:".2rem"}}>
                        <K_Chart 
                        ticket={ticket}
                        updateInfo={this.updateInfo}
                        updateDetail={this.updateDetail}
                        chartWidth = {chartWidth}
                        chartHeight = {chartHeight}
                        digits={digits}
                        updatePrice={this.updatePrice} fullscreen={fullscreen} prodCode={prodCode} />
                    </div>
                    {true  || fullscreen ? null : <div style={{ margin: "0.3rem", overflow: "hidden" }}>
                        <div className={styles.icon_full_screen} onClick={this.fullScreenToggle}></div>
                    </div>}
                    <FlateDetail price={price} data={newProInfo}/>
                    <div className={styles.bottom_btn_fixed}>
                    <div className={styles.bt_btn_50}><button  className={mt4Type==2||isClose?styles.btn_grey:styles.btn_blue} onClick={mt4Type==2?null:this.stopClick}>止损/止盈</button></div>
                    <div className={styles.bt_btn_50}><button  className={mt4Type==2||isClose?styles.btn_grey:styles.btn_blue} onClick={mt4Type==2?null:this.showConfirm} >平仓</button></div>
                       
                    </div>
                </Content>

                {showOpenSucc?(
                    <FlateDialog onClose={this.closeOpenSucc} onSure={this.flateSure} data={this._prodInfo}/>
                ):null}
                {showConfirm?(
                    <ConfirmFlate onCancel={this.closeConfirm} onSure={this.flatClick(0)} />
                ):null}

                {editProfit?(
                    <StopProfitPage price={price} prodInfo={this._prodInfo} onClose={this.closeEdit} onSure={this.commitEdit}/>
                ):null}
                {refreshFlag?(
                    <RefreshDialog onSure={this.flateSure} />
                ):null}


                {this.props.children}
            </FullScreenView>
        );
    }

}
function injectProps(state) {
    var { OptionalListData, ProductList } = state.base || {};
    return { OptionalListData, ProductList };
}
function injectAction() {
    return { flatOrder,updateOrder,showMessage};
}

module.exports = connect(null, injectAction())(TradeDetailPage);