import styles from './css/positionItem1.less';

class PositionItem1 extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    itemClick = ()=>{
       // hashHistory.push("/work/optional/detail");
        var {data}= this.props;
        console.log(data);
        hashHistory.push({
            pathname:"/work/trade/historydetail",
            query:{historyInfo:JSON.stringify(data)}
        })
        
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
           , tradedQty} = data;

           var tmpdate = new Date();
           tmpdate.setTime(closeTime * 1000);
           closeTime = tmpdate.getFullYear()+"-" +
           (tmpdate.getMonth()+1)+"-"+tmpdate.getDate()+" "+
           tmpdate.getHours()+":"+tmpdate.getMinutes()+":"+tmpdate.getSeconds();

        return(
            <li className={styles.item} onClick={this.itemClick}>
                <div className={styles.left}>
                    <p><span className={styles.name}>{prodName+" "+prodCode}</span>&nbsp;<span className={buySell==0?styles.red:styles.green}>{buySell==0?"买入":"卖出"}</span></p>
                    <div className={styles.mg_tp_10} style={{float:"left"}}>
                        <p className={styles.valueSty}>{openPrice}</p>
                        <p className={styles.keySty}>开仓价</p>
                    </div>
                    <div className={styles.mg_tp_10} style={{float:"left",marginLeft:"0.3rem"}}>
                        <p className={styles.valueSty}>{closePrice}</p>
                        <p className={styles.keySty}>平仓价</p>
                    </div>
                </div>
                <div className={styles.right}>
                    <p><span className={styles.right +" " +styles.font30}>{closeTime}</span></p>
                    <div className={styles.mg_tp_10} style={{float:"right"}}>
                        {/* <p><span className={styles.left +" " +styles.font30 +" " +styles.green}>{netProfit}</span></p>
                        <p className={styles.mg_tp_42}><span className={styles.c9}>收益</span></p> */}

                        <p className={styles.valueStyR +" " +(netProfit>=0?styles.red:styles.green)}>${netProfit}</p>
                        <p className={styles.keyStyR}>收益</p>
                    </div>

                    
                </div>
            </li>
        );
    }

}

module.exports = PositionItem1;
