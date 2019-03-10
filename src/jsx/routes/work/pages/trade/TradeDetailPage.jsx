import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import K_Chart from '../../components/optional/detail/K_Chart';
import FlateDetail from '../../components/trade/detail/FlateDetail';
import styles from './css/tradeDetailPage.less';
import { connect } from 'react-redux';
import { flatOrder,updateOrder } from '../../actions/trade/tradeAction';
import FlateDialog from './../../components/trade/detail/FlateDialog';
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
            editProfit:false

        }
    }

    componentDidMount() {
        //

    }
    openSucc = ()=>{
        this.setState({showOpenSucc:true});
    }

    closeOpenSucc = ()=>{
        this.setState({showOpenSucc:false});
    }
    tabChange = (index) => () => {
        this.setState({ index });
    }

    updatePrice = (price) => {

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

    flatClick=(tradeType)=>()=>{

        var {orderId,
            marketPrice,
            mt4Id,
            marketTime
            } =this._prodInfo ;
        this.props.flatOrder(this,{tradeType,mt4Id,orderId,tradeTime:marketTime,tradePrice:marketPrice},()=>{
            //this.setState({showOpenSucc:true});
            hashHistory.goBack();
        });

    }

    renderHeader() {
        var { index } = this.state;
        return (
            <div className={styles.tabs}>
                <span className={this.mergeClassName(styles.item, index == 0 ? styles.on : "")} onClick={this.tabChange(0)}>简单<i></i></span>
                <span className={this.mergeClassName(styles.item, index == 1 ? styles.on : "")} onClick={this.tabChange(1)}>高级<i></i></span>
            </div>
        )
    }

    stopClick = ()=>{

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
            hashHistory.goBack();

        });
        // return;


    }

    render() {
        systemApi.log("OptionalDetailPage render");

        var { index, fullscreen, price ,showOpenSucc,editProfit} = this.state;
        var {prodName,prodCode,buySell,hangType,marketPrice} =this._prodInfo;
        //hangType需要进一步判断
        var detailType = true;
        if(hangType == 2 ||hangType == 3  ||hangType == 4 ||hangType == 5 ) detailType=false;

        return (
            <FullScreenView>
                {fullscreen ? null : <AppHeader headerName={(buySell==0?"买 ":"卖 ")+prodName + " " + prodCode} theme="white" />}
                <Content >
                    <div className={fullscreen ? styles.kchatFull : styles.kchat}>
                        <K_Chart updatePrice={this.updatePrice} fullscreen={fullscreen} prodCode={prodCode} />
                    </div>
                    {fullscreen ? null : <div style={{ margin: "0.3rem", overflow: "hidden" }}>
                        <div className={styles.icon_full_screen} onClick={this.fullScreenToggle}></div>
                    </div>}
                    <FlateDetail data={this._prodInfo}/>
                    <div className={styles.bottom_btn_fixed}>
                    {detailType?
                        <div className={styles.bt_btn_50}><button onClick={this.stopClick}>止损/止盈</button></div>:
                        <div className={styles.bt_btn_50}> <span className={styles.nowprice} > 现价:{marketPrice}</span></div>
                    }
                       
                       {detailType?
                       <div className={styles.bt_btn_50}><button  onClick={this.flatClick(0)} >平仓</button></div>:
                       <div className={styles.bt_btn_50}><button  onClick={this.flatClick(1)} >删除</button></div>
                    } 
                    </div>
                </Content>

                {showOpenSucc?(
                    <FlateDialog onClose={this.closeOpenSucc} onSure={this.tradeDetail}/>
                ):null}

                {editProfit?(
                    <StopProfitPage prodInfo={this._prodInfo} onClose={this.closeEdit} onSure={this.commitEdit}/>
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
    return { flatOrder,updateOrder};
}

module.exports = connect(null, injectAction())(TradeDetailPage);


// var { orderId,
//     marketPrice,
//     mt4Id,
//     marketTime
// } = data;
// this.props.flatOrder(this, { tradeType: 1, mt4Id, orderId, tradeTime: marketTime, tradePrice: marketPrice }, () => {

// });
// return;