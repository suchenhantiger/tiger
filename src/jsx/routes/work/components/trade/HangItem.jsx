import styles from './css/positionItem1.less';

class HangItem extends PureComponent{

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
            buySell
            ,clientId
            ,commission
            ,hangType
            ,marketTime
            ,mt4Id
            ,netProfit
            ,marketPrice
            ,openTime
            ,orderId
            ,openprice
            ,prodName
            ,prodCode
            ,profitPrice
           , stopPrice
            ,swaps
            ,ticket
           , tradeNo
           , tradedQty} = data;

        return(
            <li className={styles.item} onClick={this.itemClick}>
                <div className={styles.left}>
                    <p><span className={styles.name}>{prodName+" "+prodCode}</span>&nbsp;<span className={styles.red}>{buySell==0?"买入":"卖出"}</span></p>
                    <p className={styles.mg_tp_10}><span className={styles.c9}>手数：</span><span className={styles.c9}>{tradedQty}</span>&nbsp;<span class="c9">挂单价：</span><span class="c9">{openprice}</span></p>
                </div>
                <div className={styles.right}>
                    <p><span className={styles.left +" " +styles.font30 +" " +styles.green}>{marketPrice}</span></p>
                    <p className={styles.mg_tp_42}><span className={styles.c9}>现价</span></p>
                </div>
            </li>
        );
    }

}

module.exports = HangItem;
