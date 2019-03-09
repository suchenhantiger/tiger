import FlateDialog from './FlateDialog';
import BuyDialog from './BuyDialog';
import {connect} from 'react-redux';
import {openOrder} from '../../../actions/optional/optionalAction';
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

        return(
            <div>
                <div className={styles.floating}>
                  <div className={styles.mg_lr_30}>
                      <div className={styles.left}>
                          <p className={styles.font32}>浮动盈亏</p>
                          <p className={styles.c9 +" "+styles.mg_tp_10}>(包含手续费、库存费)</p>
                      </div>
                      <div className={styles.right}>
                          <p className={styles.font32 +" "+styles.green}>_$49.9</p>
                      </div>
                  </div>
                  <div className={styles.clear}></div>
                  <div className={styles.account_dt +" "+styles.bd_none +" "+styles.mg_tp_0}>
                      <ul>
                          <li>
                              <p className={styles.font32}>$1888.00</p>
                              <p className={styles.c9 +" "+styles.mg_tp_10}>浮动盈亏</p>
                          </li>
                          <li>
                              <p className={styles.font32}>$688.00</p>
                              <p className={styles.c9 +" "+styles.mg_tp_10}>账户净值</p>
                          </li>
                          <li>
                              <p className={styles.font32}>1.00%</p>
                              <p className={styles.c9 +" "+styles.mg_tp_10}>保证金比例</p>
                          </li>
                      </ul>
                  </div>
                  <table width="100%" cellspacing="0" cellpadding="0">
                      <tbody>
                      <tr>
                          <td>
                              <span className={styles.fl_label}>订单号</span>
                              <span >2000002</span>
                          </td>
                          <td>
                              <span className={styles.fl_label}>跟随高手</span>
                              <span >--</span>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <span className={styles.fl_label}>开仓价格</span>
                              <span >$100.00</span>
                          </td>
                          <td>
                              <span className={styles.fl_label}>现在价格</span>
                              <span >$100.00</span>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <span className={styles.fl_label}>交易手数</span>
                              <span >0.01</span>
                          </td>
                          <td>
                              <span className={styles.fl_label}>交易金额</span>
                              <span >$100.00</span>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <span className={styles.fl_label}>止损价格</span>
                              <span >$100.00</span>
                          </td>
                          <td>
                              <span className={styles.fl_label}>止盈价格</span>
                              <span className={styles.red}>未设置</span>
                          </td>
                      </tr>
                      <tr>
                          <td colspan={2}>
                              <span className={styles.fl_label}>开仓时间</span>
                              <span >2019-03-03 12：11：22</span>
                          </td>
                      </tr>
                      </tbody>
                  </table>
              </div>

                {showOpenSucc?(
                    <FlateDialog onClose={this.closeOpenSucc} onSure={this.tradeDetail}/>
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

module.exports = connect(injectProps,injectAction())(FlateDetail);
