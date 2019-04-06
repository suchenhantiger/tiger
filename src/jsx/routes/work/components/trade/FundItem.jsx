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
            amountUSD,
            createDate,
            id,
            recordType,
            remarks,
            sourceType,
            status} = data;

           var tmpdate = new Date();
           tmpdate.setTime(createDate);
           createDate = tmpdate.getFullYear()+"-" +
           (tmpdate.getMonth()+1)+"-"+tmpdate.getDate()+" "+
           tmpdate.getHours()+":"+tmpdate.getMinutes()+":"+tmpdate.getSeconds();

        return(
            <li className={styles.item} onClick={this.itemClick}>
                <div className={styles.left}>
                    <p><span className={styles.name}>{remarks}</span></p>
                    <div className={styles.mg_tp_10} style={{float:"left"}}>
                        <p className={styles.valueSty}>{createDate}</p>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.mg_tp_10} style={{float:"right"}}>
                        <p className={styles.valueStyR }>${amountUSD}</p>

                    </div>

                    
                </div>
            </li>
        );
    }

}

module.exports = PositionItem1;
