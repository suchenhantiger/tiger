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
        this._prodCode = prodCode;
        this._digits = digits;
        this.state = {
            index:0,
            fullscreen:false,
            price:{}
            
        }
        this._proInfo = {
            digits,maxVolume,minVolume,minstDec,volumeStep,prodSize,marginPercentage
        };
    }

    componentDidMount(){
        //
  
    }

    tabChange = (index)=>()=>{
        this.setState({index});
    }

    updatePrice=(price)=>{
        // console.log(price);
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
                {fullscreen?null:<AppHeader headerName={this.renderHeader()} theme="transparent"/>}
                <Content coverHeader={true}>
                    {fullscreen?<ProdInfoFullscreen price={price} onClose={this.closeFullScreen}/>:<ProdInfo price={price} prodName={this._prodName} prodCode={this._prodCode} />}
                    <div className={fullscreen?styles.kchatFull:styles.kchat}>
                        <K_Chart 
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
                        <SimpleDetail price={price} 
                        proInfo={this._proInfo}
                        prodName={this._prodName} prodCode={this._prodCode} />
                        <ComplexDetail price={price} 
                        proInfo={this._proInfo}
                        prodName={this._prodName} prodCode={this._prodCode} />
                    </LazyLoad>}
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

module.exports = connect(null,injectAction())(OptionalDetailPage);
