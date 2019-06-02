import styles from './css/positionItem1.less';

class PositionItem1 extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    itemClick = ()=>{
       // hashHistory.push("/work/optional/detail");
        var {onChoose,data}= this.props;
        onChoose && onChoose(data);
    }

    //渲染函数
    render(){

        var {data} = this.props;
        var {
            ask,
            bid,
            ctm,
            exchangeRate,

            prodSize,

            buySell
            ,clientId
            ,commission
            ,hangType
            ,marketTime
            ,mt4Id
            ,marketPrice
            ,openTime
            ,orderId
            ,openPrice
            ,prodName
            ,prodCode
            ,profitPrice
            ,digits
           , stopPrice
            ,swaps
            ,ticket
           , tradeNo,netProfit
           , tradedQty} = data;
        var netProfitColor = "red";
        if(netProfit==null){
            netProfit="--";
        }else{
            netProfitColor = netProfit>=0?"red":"green";
            netProfit= netProfit.toFixed(2);
        } 

        if(bid !=null && ask!=null ){
            if(buySell==0)
                marketPrice =bid.toFixed(digits);
            else
                marketPrice =ask.toFixed(digits);

        }
            

        return(
            <li className={styles.item} onClick={this.itemClick}>
                <div className={styles.left}>
                    <p><span className={styles.name}>{prodName+" "+prodCode}</span>&nbsp;<span className={buySell==0?styles.red:styles.green}>{buySell==0?"买入":"卖出"}</span></p>
                    <p className={styles.mg_tp_10}><span className={styles.c9}>开仓价：</span><span className={styles.c9}>{openPrice}</span>&nbsp;<span class="c9">现价：</span><span class="c9">{marketPrice}</span></p>
                </div>
                <div className={styles.right}>
                    <p><span className={styles.left +" " +styles.font30 +" " +netProfitColor}>${netProfit}</span></p>
                    <p className={styles.right +" "+styles.mg_tp_10}><span className={styles.c9}>浮动盈亏</span></p>
                </div>
            </li>
        );
    }

}

module.exports = PositionItem1;
