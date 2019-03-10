import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import K_Chart from '../../components/optional/detail/K_Chart';
import FlateHangDetail from '../../components/trade/detail/FlateHangDetail';
import styles from './css/tradeDetailPage.less';
import {connect} from 'react-redux';
import {getRealKline} from '../../actions/optional/optionalAction';
/********自选-简单*********/
class TradeDetailPage extends PageComponent{

    constructor(props,context) {
        super(props,context);
        var {prodInfo} = this.props.location.query;
        prodInfo = JSON.parse(prodInfo);
        var {prodCode,prodName} = prodInfo;
        this._prodCode = prodCode;
        this._prodName = prodName;
        this.state = {
            index:0,
            fullscreen:false,
            
        }
    }

    componentDidMount(){
        //
  
    }

    tabChange = (index)=>()=>{
        this.setState({index});
    }

    updatePrice=(price)=>{

         this.setState({price});
    }
    
    fullScreenToggle =()=>{

        this.setState({fullscreen:true},()=>{
            window.screen.orientation.lock('landscape');
        });
    }
    closeFullScreen =()=>{
        this.setState({fullscreen:false},()=>{
            window.screen.orientation.lock('portrait');
        });
    }

    renderHeader(){
        var {index} = this.state;
        return (
            <div className={styles.tabs}>
                <span className={this.mergeClassName(styles.item, index==0?styles.on:"")} onClick={this.tabChange(0)}>简单<i></i></span>
                <span className={this.mergeClassName(styles.item, index==1?styles.on:"")} onClick={this.tabChange(1)}>高级<i></i></span>
            </div>
        )
    }

    render(){
        systemApi.log("OptionalDetailPage render");

        var {index,fullscreen,price} = this.state;
        return (
            <FullScreenView>
                {fullscreen?null:<AppHeader headerName={this._prodName+" "+this._prodCode} theme="white"/>}
                <Content >
                    <div className={fullscreen?styles.kchatFull:styles.kchat}>
                        <K_Chart updatePrice={this.updatePrice} fullscreen={fullscreen} prodCode={this._prodCode}/>
                    </div>
                    {fullscreen?null:<div style={{margin:"0.3rem", overflow: "hidden"}}>
                        <div className={styles.icon_full_screen} onClick={this.fullScreenToggle}></div>
                    </div>}
                    <FlateHangDetail />

                </Content>
            </FullScreenView>
        );
    }

}
function injectProps(state){
    var {OptionalListData,ProductList} = state.base || {};
    return {OptionalListData,ProductList};
}
function injectAction(){
    return {getRealKline};
}

module.exports = connect(null,injectAction())(TradeDetailPage);