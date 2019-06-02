import styles from './css/positionItem1.less';
import {formatTime} from '../../../../utils/util';
class CommissionItem extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    itemClick = ()=>{
    //    // hashHistory.push("/work/optional/detail");
    //     var {data}= this.props;
    //     console.log(data);
    //     hashHistory.push({
    //         pathname:"/work/trade/historydetail",
    //         query:{historyInfo:JSON.stringify(data)}
    //     })
        
    }

    //渲染函数
    render(){

        var {data,accType} = this.props;
        var {
            clientId,
            commission,
            followNmae,
            nickName,closeTime,
            totalPL} = data;
            var tmpName=followNmae;
            if(accType==3){
                tmpName = nickName;
            }
            if(closeTime && closeTime>0){
                var tmpdate = new Date();
                tmpdate.setTime(closeTime * 1000);
                closeTime = formatTime(tmpdate);
            }else 
                closeTime="--";
            

        return(
            <li className={styles.item} >
                <div className={styles.left}>
                    <p><span className={styles.name}>{tmpName}</span></p>
                    <p><span className={"left c6"}>{closeTime}</span></p>
                    
                </div>
                <div className={styles.right}>
                    <div className={"font26 right"} >
                        <p className={styles.valueSty}>${commission}</p>
                        <p className={styles.keySty}>佣金</p>
                    </div>
                    
                    <div className={"font26 mg-rt-30 right"} >
                        <p className={styles.valueSty}>${totalPL}</p>
                        <p className={styles.keySty}>总收益</p>
                    </div>
                </div>
            </li>
        );
    }

}

module.exports = CommissionItem;
