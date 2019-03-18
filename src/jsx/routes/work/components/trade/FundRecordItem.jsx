import styles from './css/positionItem1.less';

class FundRecordItem extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    itemClick = ()=>{
       // hashHistory.push("/work/optional/detail");
        var {data}= this.props;
        console.log(data);
        // hashHistory.push({
        //     pathname:"/work/trade/historydetail",
        //     query:{historyInfo:JSON.stringify(data)}
        // })
        
    }

    //渲染函数
    render(){

        var {data} = this.props;
        var {
            id,
            recordType,
            sourceType,
            amountUSD,
            amountCNY,
            status,
            remarks,
            errorMsg,
            createDate
            } = data;

           var tmpdate = new Date();
           tmpdate.setTime(createDate * 1000);
           createDate = tmpdate.getFullYear()+"-" +
           (tmpdate.getMonth()+1)+"-"+tmpdate.getDay()+" "+
           tmpdate.getHours()+":"+tmpdate.getMinutes()+":"+tmpdate.getSeconds();
           var recordTypeStr = "转账";//0 转账 1 充值 2 提现
           if(recordType==1 || recordType=="1") recordTypeStr="充值";
           else if(recordType==2 || recordType=="2") recordTypeStr="提现";
        //    支付状态。0失败,1充值中,2充值未完成,3提现审核中,4提现已撤销,5汇款中,6拒绝提现,9成功

        var statusStr = "失败";
        if(status == 1 ) statusStr="充值中";
        else if(status == 2 ) statusStr="充值未完成";
        else if(status == 3 ) statusStr="提现审核中";
        else if(status == 4 ) statusStr="提现已撤销";
        else if(status == 5 ) statusStr="汇款中";
        else if(status == 6 ) statusStr="拒绝提现";
        else if(status == 9 ) statusStr="成功";



        return(
            <li className={styles.item} onClick={this.itemClick}>
                <div className={styles.left}>
                    <p><span className={styles.name}>{prodName+" "+prodCode}</span>&nbsp;<span >{recordTypeStr}</span></p>
                    <div className={styles.mg_tp_10} style={{float:"left"}}>
                        <p className={styles.valueSty}>${amountUSD}</p>
                        <p className={styles.keySty}>金额($)</p>
                    </div>
                    <div className={styles.mg_tp_10} style={{float:"left",marginLeft:"0.3rem"}}>
                        <p className={styles.valueSty}>¥{amountCNY}</p>
                        <p className={styles.keySty}>金额(¥)</p>
                    </div>
                </div>
                <div className={styles.right}>
                    <p><span className={styles.right +" " +styles.font30}>{createDate}</span></p>
                    <div className={styles.mg_tp_10} style={{float:"right"}}>
                        {/* <p><span className={styles.left +" " +styles.font30 +" " +styles.green}>{netProfit}</span></p>
                        <p className={styles.mg_tp_42}><span className={styles.c9}>收益</span></p> */}

                        <p className={styles.valueStyR}>{statusStr}</p>
                        <p className={styles.keyStyR}>状态</p>
                    </div>

                    
                </div>
            </li>
        );
    }

}

module.exports = FundRecordItem;
