import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import styles from './css/historyDetailPage.less';
/********自选-简单*********/
class HistoryDetailPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        var { historyInfo } = this.props.location.query;
        console.log(this.props.location.query);
        this._historyInfo = JSON.parse(historyInfo);
        this.state = {
            
        }
    }



    render() {
        systemApi.log("HistoryDetailPage render");
        var {
            buySell
            ,commission
            ,netProfit
            ,marketPrice
            ,orderId
            ,openPrice
            ,prodName
            ,prodCode
            ,profitPrice
            ,closePrice
            ,closeTime
           , stopPrice
            ,swaps
            ,ticket
           , tradeNo
           , tradedQty} = this._historyInfo;
       
        var thisProfit = (netProfit + swaps + commission).toFixed(2);
        if(closeTime && closeTime>0){
            var tmpdate = new Date();
            tmpdate.setTime(closeTime * 1000);
            closeTime = tmpdate.getFullYear()+"-" +
            (tmpdate.getMonth()+1)+"-"+tmpdate.getDate()+" "+
            tmpdate.getHours()+":"+tmpdate.getMinutes()+":"+tmpdate.getSeconds();
        }else {
            closeTime="--";
        }
        return (
            <FullScreenView>
                <AppHeader headerName={(buySell==0?"买 ":"卖 ")+prodName + " " + prodCode} theme="white" />
                <Content >
                <div className={styles.mg_lr_30}>
                      <div className={styles.left}>
                          <p className={styles.font32}>浮动盈亏</p>
                          <p className={styles.c9 +" "+styles.mg_tp_10}>(包含手续费、库存费)</p>
                      </div>
                      <div className={styles.right}>
                          <p className={styles.font32 +" "+(netProfit>0?styles.red:styles.green)}>${netProfit}</p>
                      </div>
                  </div>
                  <div className={styles.clear}></div>
                  <div className={styles.account_dt +" "+styles.bd_none +" "+styles.mg_tp_0}>
                      <ul>
                          <li>
                              <p className={styles.font32}>${thisProfit}</p>
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
                <div className={this.mergeClassName("mg-tp-42", "mg-lr-20")}>
                    <div className={this.mergeClassName(styles.text_arrow, styles.text_list3)}>
                        <ul>
                            <li>
                                <div className={this.mergeClassName("left", "font20")}><p>订单号</p></div>
                                <div className={this.mergeClassName("right")}><p>{ticket}</p></div>
                            </li>
                            <li>
                                <div className={this.mergeClassName("left", "font20")}><p>开仓价格</p></div>
                                <div className={this.mergeClassName("right")}><p>{openPrice}</p></div>
                            </li>
                            <li>
                                <div className={this.mergeClassName("left", "font20")}><p>平仓价格</p></div>
                                <div className={this.mergeClassName("right")}><p>{closePrice}</p></div>
                            </li>
                            <li>
                                <div className={this.mergeClassName("left", "font20")}><p>交易手数</p></div>
                                <div className={this.mergeClassName("right")}><p>{tradedQty}手</p></div>
                            </li>
                            {/* <li>
                                <div className={this.mergeClassName("left", "font20")}><p>占用金额</p></div>
                                <div className={this.mergeClassName("right")}><p>{}点</p></div>
                            </li> */}
                            <li>
                                <div className={this.mergeClassName("left", "font20")}><p>止损价格</p></div>
                                <div className={this.mergeClassName("right")}><p>{stopPrice?stopPrice:"未设置"}</p></div>
                            </li>
                            <li>
                                <div className={this.mergeClassName("left", "font20")}><p>止盈价格</p></div>
                                <div className={this.mergeClassName("right")}><p>{profitPrice?profitPrice:"未设置"}</p></div>
                            </li>
                            <li>
                                <div className={this.mergeClassName("left", "font20")}><p>平仓时间</p></div>
                                <div className={this.mergeClassName("right")}><p>{closeTime}</p></div>
                            </li>
                        </ul>
                    </div>
                </div>
                </Content>
            </FullScreenView>
        );
    }

}

module.exports = HistoryDetailPage;
