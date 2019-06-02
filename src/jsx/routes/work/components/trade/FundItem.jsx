import styles from './css/positionItem1.less';
import {formatTime} from '../../../../utils/util';
class PositionItem1 extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    itemClick = ()=>{
       // hashHistory.push("/work/optional/detail");
        // var {data}= this.props;
        // console.log(data);
        // hashHistory.push({
        //     pathname:"/work/trade/historydetail",
        //     query:{historyInfo:JSON.stringify(data)}
        // })
        
    }

    //渲染函数
    render(){

        var {data} = this.props;
        var {
            amountUSD,
            closeTime,
            id,
            recordType,
            remarks,status,
            sourceType,
            status} = data;

            var tmpdate = new Date();
            tmpdate.setTime(closeTime*1000);
            closeTime = formatTime(tmpdate);
            var statusStr="";
            if(status==7)
                statusStr="审核中";
            else if(status==3 || status==5)
                statusStr="提现审核中";

        return(
            <li className={styles.item} onClick={this.itemClick}>
                <div className={styles.left}>
                    <p><span className={styles.name}>{remarks}</span></p>
                    <div className={styles.mg_tp_10} style={{float:"left"}}>
                        <p className={styles.fundtime}>{closeTime}</p>
                    </div>
                </div>
                <div className={styles.right}>
                    <div  style={{float:"right"}}>
                        <p  className={styles.valueStyR }>${amountUSD}</p>
                        <p  className={"right mg-tp-10"}>{statusStr}</p>
                    </div>

                    
                </div>
            </li>
        );
    }

}

module.exports = PositionItem1;
