import Intro from './Intro';
import OpenSucc from './OpenSucc';
import BuyDialog from './BuyDialog';
import {connect} from 'react-redux';
import {openOrder} from '../../../actions/optional/optionalAction';
import styles from './css/simpleDetail.less';

class SimpleDetail extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            index:0,
            num:0.01,
            tradeDirect:"", //0-买 1-卖
            showIntro:false,
            showOpenSucc:false,
            showBuyDialog:false
        }
    }

    countClick = (index)=>()=>{
        this.setState({num:(+num).toFixed(2)});
        var num = 0.01;
        if(index==1)num = 0.1;
        else if(index==2)num = 0.5;
        else if(index==3)num = 1;

        this.setState({num,index});
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
        var {index, num} = this.state,
            diffs = [0.01, 0.1, 0.5, 1],
            num = (+num)+diffs[index];
        this.setState({num:(+num).toFixed(2)});
    }

    minusClick = ()=>{
        var {index, num} = this.state,
            diffs = [0.01, 0.1, 0.5, 1],
            num = num-diffs[index];
        this.setState({num:num>0?(+num).toFixed(2):"0.00"});
    }

    buyClick = ()=>{
        this.setState({tradeDirect:0, showBuyDialog:true});
    }

    sellClick = ()=>{
        this.setState({tradeDirect:1, showBuyDialog:true});
    }

    tradeSubmit = (direction,isChoose)=>{
        this.setState({showBuyDialog:false});
        var {prodCode,price,accountArr}=this.props;
        var {mt4Id} = accountArr[0];
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
        var {ask="--",bid="--"}=price;
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
                                <li className={index==0?styles.on:""} onClick={this.countClick(0)}><span>0.01手</span><i></i></li>
                                <li className={index==1?styles.on:""} onClick={this.countClick(1)}><span>0.1手</span><i></i></li>
                                <li className={index==2?styles.on:""} onClick={this.countClick(2)}><span>0.5手</span><i></i></li>
                                <li className={index==3?styles.on:""} onClick={this.countClick(3)}><span>1手</span><i></i></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom_btn_fixed}>
                    <div className={styles.btn_buy_bottom} onClick={this.buyClick}>
                        <span>买</span>
                        <span className={"font-arial"}>{ask}</span>
                    </div>
                    <div className={styles.btn_sell_bottom} onClick={this.sellClick}>
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
    return {openOrder};
}

module.exports = connect(injectProps,injectAction())(SimpleDetail);
