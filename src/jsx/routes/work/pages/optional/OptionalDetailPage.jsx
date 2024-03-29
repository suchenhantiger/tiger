import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';
import K_Chart from '../../components/optional/detail/K_Chart';
import SimpleDetail from '../../components/optional/detail/SimpleDetail';
import ProdInfo from '../../components/optional/detail/ProdInfo';
import ProdInfoFullscreen from '../../components/optional/detail/ProdInfoFullscreen';
import ComplexDetail from '../../components/optional/detail/ComplexDetail';
import styles from './css/optionalDetailPage.less';
import {connect} from 'react-redux';
import {getRealKline} from '../../actions/optional/optionalAction';
/********自选-简单*********/
class OptionalDetailPage extends PageComponent{

    constructor(props,context) {
        super(props,context);
        var {prodName,prodCode,
            digits,maxVolume,minVolume,minstDec,volumeStep,prodSize,marginPercentage,
            ask="--",bid="--",status=true} = this.props.location.query; 
        this._prodName = prodName;
        this._prodCode = prodCode;//encodeURIComponent(
        this._digits = digits;
        this.state = {
            index:0,
            fullscreen:false,
            price:{}
            
        }
        this._proInfo = {
            digits,maxVolume,minVolume,minstDec,volumeStep,prodSize,marginPercentage
        };
        this._widthCut = this.calculatePx(0.8,0);
        this._heightCut = this.calculatePx(1.98,0);
        // console.log(this._widthCut + "width sch height"+ this._heightCut);
    }
    componentDidMount(){
       // document.addEventListener("backbutton", this.onBackKeyDown, false);
    }

    componentWillUnmount(){

    //    document.removeEventListener("backbutton", this.onBackKeyDown, false);
        Event.fire("ws_optional_list");
        super.componentWillUnmount();
    }

    onBackKeyDown=()=>{
        var {fullscreen} =this.state;
        if(fullscreen){
            this.closeFullScreen();
        }else{
            hashHistory.goBack();
        }

    
    }

    tabChange = (index)=>()=>{
        this.setState({index});
    }

    updatePrice=(price)=>{
        if(typeof(price)=="string")
        {
            price = JSON.parse(price);
        }
        console.log(price);
        console.log("-----------------");
         this.setState({price});
    }
    
    fullScreenToggle =()=>{
        window.screen.orientation.lock('landscape');
        document.addEventListener("backbutton", this.onBackKeyDown, false);        
        setTimeout(()=>{
            this.setState({fullscreen:true});
        },500);
        
    }
    closeFullScreen =()=>{
        window.screen.orientation.lock('portrait');
        document.removeEventListener("backbutton", this.onBackKeyDown, false);
        setTimeout(()=>{
            this.setState({fullscreen:false});
        },500);
    }

    renderHeader(){
        var {index} = this.state;
        return (
            <div className={styles.tabs}>
                <span className={this.mergeClassName(styles.item, index==0?styles.on:"")} onClick={this.tabChange(0)}>{McIntl.message("fast_trade")}<i></i></span>
                <span className={this.mergeClassName(styles.item, index==1?styles.on:"")} onClick={this.tabChange(1)}>{McIntl.message("advanced")}<i></i></span>
            </div>
        )
    }

    render(){
        systemApi.log("OptionalDetailPage render");

        var {index,fullscreen,price} = this.state;
        var devinfo = systemApi.getDeviceMessage();
        var {screenHeight,
            screenWidth} = devinfo;

        
        var chartWidth = screenWidth;
        var chartHeight = 210;
        if(fullscreen){
            chartWidth = screenHeight -this._widthCut;
            chartHeight = screenWidth - this._heightCut ;
        }

        
        
        return (
            <FullScreenView>
                {fullscreen?null:<AppHeader headerName={this.renderHeader()} theme="optial"/>}
                <Content coverHeader={true}>
                    {fullscreen?
                    <ProdInfoFullscreen digit={this._digits} prodName={this._prodName} prodCode={this._prodCode}  price={price} onClose={this.closeFullScreen}/>:
                    <ProdInfo digit={this._digits} price={price} prodName={this._prodName} prodCode={this._prodCode} />}
                    <div className={fullscreen?styles.kchatFull:styles.kchat}>
                        <K_Chart
                        chartWidth = {chartWidth}
                        chartHeight = {chartHeight}
                        digits={this._digits}
                        updatePrice={this.updatePrice} 
                        fullscreen={fullscreen} 
                        prodCode={this._prodCode}/>
                    </div>
                    {fullscreen?null:<div style={{margin:"0.3rem", overflow: "hidden"}}>
                        <div className={styles.icon_full_screen} onClick={this.fullScreenToggle}></div>
                    </div>}
                    {fullscreen?null:
                    <LazyLoad index={index} >
                        <SimpleDetail price={price} digit={this._digits}
                        proInfo={this._proInfo}
                        prodName={this._prodName} prodCode={this._prodCode} />
                        <ComplexDetail price={price} digit={this._digits}
                        proInfo={this._proInfo}
                        prodName={this._prodName} prodCode={this._prodCode} />
                    </LazyLoad>}
                </Content>
                {this.props.children}
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

module.exports = connect(null,injectAction())(OptionalDetailPage);
