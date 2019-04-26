import Confirm from '../../../../../components/common/popup/Confirm2';
import styles from './css/rechargeDialog.less';

class RechareDialog extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }


    onSure = ()=>{
        setTimeout(()=>{
            var {onSure,data={}} = this.props;
            var {amountCNY,
                amountRate,
                amountUSD,
                commission,
                orderId,
                payUrl} = data;
            onSure && onSure(orderId,payUrl);
        },50);


    }


    //渲染函数
    render(){
        //suggestBalance={suggestBalance} maxFowBalance={maxFowBalance} canFowBalance
        var {onCancel,data={}} = this.props;
        var {amountCNY,
            amountRate,
            amountUSD,
            commission,
            orderId,
            payUrl} = data;

        return(
            <Confirm  onSure={this.onSure} showCancel={false}>
                <div>
                    <p className="font30 mg-bt-10 font_bold center">提示</p>
                    <p className="font48 mg-bt-20 mg-tp-30 center">¥{amountCNY}</p>
                    <div className={styles.item2}>
                        <span className={"left"}>充值金额:</span>
                        <span className={"right"}>${amountUSD}</span>
                    </div>
                    <div className={styles.item2}>
                        <span className={"left"}>折合人民币</span>
                        <span className={"right"}>¥{amountCNY}</span>
                    </div>
                    <div className={styles.item2}>
                        <span className={"left"}>手续费</span>
                        <span className={"right"}>¥{commission}</span>
                    </div>
                    

                </div>
            </Confirm>
        );
    }

}

module.exports = RechareDialog;
