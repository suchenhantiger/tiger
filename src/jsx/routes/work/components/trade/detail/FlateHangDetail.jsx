
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
            showIntro:false,
            showBuyDialog:false
        }
    }

    //渲染函数
    render(){

        var {price} = this.props;

        var {
            buySell, clientId,margin,expireDate,
            commission,hangType,marketPrice="--",
            marketTime,mt4Id,openprice="--",
            openTime,orderId,prodSize,
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

        if(expireDate && expireDate>0){
            var tmpdate = new Date();
            tmpdate.setTime(expireDate * 1000);
            expireDate = tmpdate.getFullYear()+"-" +
            (tmpdate.getMonth()+1)+"-"+tmpdate.getDay()+" "+
            tmpdate.getHours()+":"+tmpdate.getMinutes()+":"+tmpdate.getSeconds();
        }else {
            expireDate = "--"
        }




        return(
            <div>
                <div className={styles.floating}>
                 
                  <table width="100%" cellspacing="0" cellpadding="0">
                      <tbody>
                      <tr>
                          <td>
                              <span className={styles.fl_label}>订单号</span>
                              <span >{ticket}</span>
                          </td>
                          <td>
                              <span className={styles.fl_label}>交易手数</span>
                              <span >{tradedQty}</span>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <span className={styles.fl_label}>挂单类型</span>
                              <span >挂单</span>
                          </td>
                          <td>
                              <span className={styles.fl_label}>挂单价格</span>
                              <span >${openprice}</span>
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
                              <span className={styles.fl_label}>挂单时间</span>
                              <span >{openTime}</span>
                          </td>
                      </tr>
                      <tr>
                          <td colSpan="2">
                              <span className={styles.fl_label}>截止时间</span>
                              <span >{expireDate}</span>
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
