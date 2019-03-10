
import BuyDialog from './BuyDialog';
import {connect} from 'react-redux';
import {openOrder} from '../../../actions/trade/tradeAction';
import styles from './css/flatDetail.less';

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

    //渲染函数
    render(){

        var {showOpenSucc} = this.state;

        var {infoEquity}=this.props;

        var { equity = "--",
        floatPL = "--",
        freeMargin = "--",
        ratioMargin = "--",
        usedMargin = "--" } = infoEquity;

        var {
            buySell, clientId,
            commission,hangType,marketPrice="--",
            marketTime,mt4Id,netProfit,openPrice="--",
            openTime,orderId,
            prodCode,prodName,profitPrice,stopPrice,
            swaps,ticket,tradeNo,followerId="--",tradedQty
        } = this.props.data;
        if(openTime && openTime>0){
            var tmpdate = new Date();
            tmpdate.setTime(openTime * 1000);
            openTime = tmpdate.getFullYear()+"-" +
            (tmpdate.getMonth()+1)+"-"+tmpdate.getDay()+" "+
            tmpdate.getHours()+":"+tmpdate.getMinutes()+":"+tmpdate.getSeconds();
        }else {
            openTime="--";
        }

        return(
            <div>
                <div className={styles.floating}>
                  <div className={styles.mg_lr_30}>
                      <div className={styles.left}>
                          <p className={styles.font32}>浮动盈亏</p>
                          <p className={styles.c9 +" "+styles.mg_tp_10}>(包含手续费、库存费)</p>
                      </div>
                      <div className={styles.right}>
                          <p className={styles.font32 +" "+styles.green}>${netProfit}</p>
                      </div>
                  </div>
                  <div className={styles.clear}></div>
                  <div className={styles.account_dt +" "+styles.bd_none +" "+styles.mg_tp_0}>
                      <ul>
                          <li>
                              <p className={styles.font32}>${netProfit}</p>
                              <p className={styles.c9 +" "+styles.mg_tp_10}>浮动盈亏</p>
                          </li>
                          <li>
                              <p className={styles.font32}>${equity}</p>
                              <p className={styles.c9 +" "+styles.mg_tp_10}>账户净值</p>
                          </li>
                          <li>
                              <p className={styles.font32}>{ratioMargin}%</p>
                              <p className={styles.c9 +" "+styles.mg_tp_10}>保证金比例</p>
                          </li>
                      </ul>
                  </div>
                  <table width="100%" cellspacing="0" cellpadding="0">
                      <tbody>
                      <tr>
                          <td>
                              <span className={styles.fl_label}>订单号</span>
                              <span >{orderId}</span>
                          </td>
                          <td>
                              <span className={styles.fl_label}>跟随高手</span>
                              <span >{followerId}</span>
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
                              <span >{false?"--":"--"}</span>
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

module.exports = connect(injectProps,injectAction())(FlateDetail);
