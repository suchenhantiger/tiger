import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import K_Chart from '../../components/optional/detail/K_Chart';
import FlateDetail from '../../components/trade/detail/FlateDetail';
import styles from './css/tradeDetailPage.less';
import { connect } from 'react-redux';
import { flatOrder } from '../../actions/trade/tradeAction';
import FlateDialog from './../../components/trade/detail/FlateDialog';
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

    flatClick=()=>{


        // var {orderId,
        //     marketPrice,
        //     mt4Id,
        //     marketTime
        //     } =data;
        // this.props.updateOrder(this,{openType:0,mt4Id,orderId,stopPrice:"119.881"},()=>{

        // });
        // return;

        var {orderId,
            marketPrice,
            mt4Id,
            marketTime
            } =this._prodInfo ;



        this.props.flatOrder(this,{tradeType:0,mt4Id,orderId,tradeTime:marketTime,tradePrice:marketPrice},()=>{
            this.setState({showOpenSucc:true});
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
        hashHistory.push({
            pathname:"/work/trade/flatdetail/stopprofit",
            query:{}
        })
    }

    render() {
        systemApi.log("OptionalDetailPage render");

        var { index, fullscreen, price ,showOpenSucc} = this.state;
        var {prodName,prodCode,buySell} =this._prodInfo;
        console.log(this._prodInfo);
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
                        <div className={styles.bt_btn_50}><button onClick={this.stopClick}>止损/止盈</button></div>
                        <div className={styles.bt_btn_50}><button  onClick={this.flatClick} >平仓</button></div>
                    </div>
                </Content>

                {showOpenSucc?(
                    <FlateDialog onClose={this.closeOpenSucc} onSure={this.tradeDetail}/>
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
    return { flatOrder};
}

module.exports = connect(null, injectAction())(TradeDetailPage);


