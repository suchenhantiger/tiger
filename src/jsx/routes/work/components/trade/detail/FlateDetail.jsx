
import BuyDialog from './BuyDialog';
import {connect} from 'react-redux';
import {openOrder} from '../../../actions/trade/tradeAction';
import styles from './css/flatDetail.less';
import {formatTime} from '../../../../../utils/util';

class FlateDetail extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        
        this.state = {
            index:0,
            num:0.01,
            tradeDirect:"", //0-买 1-卖
            showIntro:false,
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

    tradeCancel = ()=>{
        this.setState({showBuyDialog:false});
    }

    gotoMaster =(followName,followerId)=>()=>{
        if(followerId && followerId!=""){
              hashHistory.push({
            pathname:"/work/trade/currcopydetail/master",
            query:{
                followNmae:followName,
                followerId:followerId}
        })
        }
      
    }

    //渲染函数
    render(){

        var {showOpenSucc} = this.state;
        var {price} = this.props;

        var {
            buySell, clientId,margin,followName,grossProfit,
            commission,hangType,marketPrice="--",marketTime,
            marketTime,mt4Id,openPrice="--",
            openTime,orderId,prodSize,
            prodCode,prodName,profitPrice,stopPrice,
            swaps,ticket,tradeNo,followerId,tradedQty,netProfit
        } = this.props.data;

        if(openTime && openTime>0){
            var tmpdate = new Date();
            tmpdate.setTime(openTime * 1000);
            openTime = formatTime(tmpdate);
        }else {
            openTime="--";
        }
     
        var {ask,bid,exchangeRate,ctm} =price;
        var totalProfit = 0;
        if(ask && bid && ctm>marketTime){
            marketPrice = buySell==1?ask:bid;
            var pl = buySell==0?(marketPrice-openPrice):(openPrice-marketPrice);
            netProfit = (pl)*exchangeRate*prodSize*tradedQty;
            netProfit= Math.round(netProfit * 100)/ 100;
            totalProfit = netProfit +swaps+commission;
       }else{
            totalProfit= netProfit;
            netProfit = grossProfit;
       }

    //    console.log("sch netProfit  : "+netProfit);

        return(
            <div>
                <div className={styles.floating}>
                  <div className={styles.mg_lr_30}>
                      <div className={styles.left}>
                          <p className={styles.font32}>浮动盈亏</p>
                          <p className={styles.c9 +" "+styles.mg_tp_10}>(包含手续费、库存费)</p>
                      </div>
                      <div className={styles.right}>
                          <p className={styles.font32 +" "+(totalProfit>=0?styles.red:styles.green)}>${totalProfit.toFixed(2)}</p>
                      </div>
                  </div>
                  <div className={styles.clear}></div>
                  <div className={styles.account_dt +" "+styles.bd_none +" "+styles.mg_tp_0}>
                      <ul>
                          <li>
                              <p className={styles.font32}>${netProfit.toFixed(2)}</p>
                              <p className={styles.c9 +" "+styles.mg_tp_10}>订单盈亏</p>
                          </li>
                          <li>
                              <p className={styles.font32}>${swaps}</p>
                              <p className={styles.c9 +" "+styles.mg_tp_10}>库存费</p>
                          </li>
                          <li>
                              <p className={styles.font32}>${commission}</p>
                              <p className={styles.c9 +" "+styles.mg_tp_10}>手续费</p>
                          </li>
                      </ul>
                  </div>
                  <table width="100%" cellspacing="0" cellpadding="0" style={{fontSize: ".24rem", marginBottom: "2.2rem"}}>
                      <tbody>
                      <tr>
                          <td>
                              <span className={styles.fl_label}>订单号</span>
                              <span >{ticket}</span>
                          </td>
                          <td onClick={ this.gotoMaster(followName,followerId)}>
                              <span className={styles.fl_label}>跟随高手</span>
                              <span style={followName?{color:"blue"}:null}>{followName} </span>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <span className={styles.fl_label}>开仓价格</span>
                              <span >${openPrice}</span>
                          </td>
                          <td>
                              <span className={styles.fl_label}>现在价格</span>
                              <span >${marketPrice}</span>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <span className={styles.fl_label}>交易手数</span>
                              <span >{tradedQty}</span>
                          </td>
                          <td>
                              <span className={styles.fl_label}>交易金额</span>
                              <span >${margin?margin:"--"}</span>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <span className={styles.fl_label}>止损价格</span>
                              <span >{(stopPrice!=null && stopPrice!=0)?("$"+stopPrice):"未设置"}</span> 
                          </td>
                          <td>
                              <span className={styles.fl_label}>止盈价格</span>
                              <span >{(profitPrice!=null && profitPrice!=0)?("$"+profitPrice):"未设置"}</span>
                          </td>
                      </tr>
                      <tr>
                          <td colSpan="2">
                              <span className={styles.fl_label}>开仓时间</span>
                              <span >{openTime}</span>
                          </td>
                      </tr>
                      </tbody>
                  </table>
              </div>

            </div>
        );
    }

}

function injectProps(state) {
    var { infoEquity } = state.trade || {};
    return { infoEquity };
}
function injectAction(){
    return {openOrder};
}

module.exports = connect(null,injectAction())(FlateDetail);
