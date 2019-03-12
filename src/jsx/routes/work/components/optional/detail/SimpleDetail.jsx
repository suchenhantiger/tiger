import Intro from './Intro';
import OpenSucc from './OpenSucc';
import BuyDialog from './BuyDialog';
import {connect} from 'react-redux';
import {openOrder} from '../../../actions/optional/optionalAction';
import styles from './css/simpleDetail.less';
import {showMessage, ERROR, SUCCESS} from '../../../../../store/actions';
class SimpleDetail extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        var {proInfo}=this.props;
        var {volumeStep,maxVolume,minVolume}=proInfo;
        this._volumeStep = +volumeStep;
        this._minVolume=+minVolume;
        this._maxVolume =+maxVolume;
        this._volumeDigits=0;
        if(volumeStep.indexOf(".")>-1)
            this._volumeDigits = volumeStep.split(".")[1].length;

        this.state = {
            index:0,
            num:this._minVolume,
            tradeDirect:"", //0-买 1-卖
            showIntro:false,
            showOpenSucc:false,
            showBuyDialog:false
        }
       
    }

    countClick = (index,level)=>()=>{


        this.setState({num:level.toFixed(this._volumeDigits),index});
    }

    introClick = ()=>{
        this.setState({showIntro:true});
    }

    closeIntro = ()=>{
        this.setState({showIntro:false});
    }

    openSucc = ()=>{
        this.setState({showOpenSucc:true});
    }

    closeOpenSucc = ()=>{
        this.setState({showOpenSucc:false});
    }

    tradeDetail = ()=>{

    }

    plusClick = ()=>{
        var {num} = this.state;
        num =+num+this._volumeStep;
        if(num>=this._maxVolume) num =this._maxVolume;
        this.setState({num:num.toFixed(this._volumeDigits)});
    }

    minusClick = ()=>{
        var {num} = this.state;
        num = +num-this._volumeStep;
        if(num<=this._minVolume) num =this._minVolume;
        this.setState({num:num.toFixed(this._volumeDigits)});
    }

    buyClick = ()=>{
        this.setState({tradeDirect:0, showBuyDialog:true});
    }

    sellClick = ()=>{
        this.setState({tradeDirect:1, showBuyDialog:true});
    }

    tradeSubmit = (direction,isChoose)=>{
        var mt4Id = systemApi.getValue("mt4Id");

        console.log(mt4Id);
        if(mt4Id ==null || mt4Id.length==0 ){
            //没有账号或者账号异常
            this.props.showMessage(SUCCESS,"请选择交易账号");
             return;
        }


        this.setState({showBuyDialog:false});
        var {prodCode,price}=this.props;

        var {num} =this.state;
        var {ask,bid,ctm} = price;
        var tradePrice = direction==0?ask :bid;
        this.props.openOrder(this,{tradePrice,tradeTime:ctm,buySell:direction,prodCode,openType:0,totalQty:num,mt4Id},()=>{
            
        });
    }

    tradeCancel = ()=>{
        this.setState({showBuyDialog:false});
    }

    //渲染函数
    render(){

        var {index, showIntro, showOpenSucc, num, showBuyDialog, tradeDirect} = this.state;
        var {price} =this.props;
        var {ask="--",bid="--",isClose=false}=price;
        var level1 = 1.0,
            level2 = 2.0,
            level3 = 3.0,
            level4 = 4.0;
        if(this._volumeStep==0.1){
            level1 = 0.1;
            level2 = 0.2;
            level3 = 0.3;
            level4 = 0.4;
        }else if(this._volumeStep==0.01){
            level1 = 0.01;
            level2 = 0.1;
            level3 = 0.5;
            level4 = 1.0;
        }
        return(
            <div>

                <div className="mg-lr-30">
                    <div className={styles.tran_panel}>
                        <h1>交易手数</h1>
                        <div className={styles.tran_icon}>
                            <div className={styles.icon_minus} onClick={this.minusClick}></div>
                            <div className={styles.icon_num}>{num}</div>
                            <div className={styles.icon_plus} onClick={this.plusClick}></div>
                        </div>
                        <div className={styles.tran_total}>
                            <span className={styles.total_span}>
                                <span>合计：</span>
                                <span>$510.00</span>&nbsp;&nbsp;
                                <span>可用保证金：</span>
                                <span>$0.00</span>
                            </span>
                        </div>
                        <div className={styles.tran_tabs}>
                            <ul>
                                <li className={index==0?styles.on:""} onClick={this.countClick(0,level1)}><span>{level1}手</span><i></i></li>
                                <li className={index==1?styles.on:""} onClick={this.countClick(1,level2)}><span>{level2}手</span><i></i></li>
                                <li className={index==2?styles.on:""} onClick={this.countClick(2,level3)}><span>{level3}手</span><i></i></li>
                                <li className={index==3?styles.on:""} onClick={this.countClick(3,level4)}><span>{level4}手</span><i></i></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom_btn_fixed}>
                    <div className={styles.btn_buy_bottom} style={isClose?{backgroundColor:"#b6b6b6",boxShadow: "none"}:null} onClick={this.buyClick}>
                        <span>买</span>
                        <span className={"font-arial"}>{ask}</span>
                    </div>
                    <div className={styles.btn_sell_bottom} style={isClose?{backgroundColor:"#b6b6b6",boxShadow: "none"}:null} onClick={this.sellClick}>
                        <span>卖</span>
                        <span className={"font-arial"}>{bid}</span>
                    </div>
                </div>
                {showIntro?(
                    <Intro onClose={this.closeIntro}/>
                ):null}
                {showOpenSucc?(
                    <OpenSucc onClose={this.closeOpenSucc} onSure={this.tradeDetail}/>
                ):null}
                {showBuyDialog?(
                    <BuyDialog direction={tradeDirect} num={num} onSure={this.tradeSubmit} onCancel={this.tradeCancel}/>
                ):null}
            </div>
        );
    }

}

function injectProps(state){
    var {accountArr} =state.base ||{};
    return {accountArr};
}
function injectAction(){
    return {openOrder,showMessage};
}

module.exports = connect(injectProps,injectAction())(SimpleDetail);
