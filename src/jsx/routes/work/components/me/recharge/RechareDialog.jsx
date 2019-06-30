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
        var {onClose,data={}} = this.props;
        var {amountCNY,
            amountRate,
            amountUSD,
            commission,
            orderId,
            payUrl} = data;

        return(
            <Confirm  onSure={this.onSure} onCancel={onClose} >
                <div>
                    <p className="font30 mg-bt-10 font_bold center">提示</p>
                    <p className="font48 mg-bt-20 mg-tp-30 center">¥{amountCNY}</p>
                    <p className="font36 mg-bt-10 mg-tp-10 center red">${amountUSD}</p>
                    <div className={styles.item2}>
                        <span className={"left font30"}>预计到账金额:</span>
                        <span className={"right font30"}>${amountUSD}</span>
                    </div>
                    <div className={styles.item2}>
                        <span className={"left font30"}>充值金额</span>
                        <span className={"right font30"}>¥{amountCNY}</span>
                    </div>
                    <div className={styles.item2}>
                        <span className={"left font30"}>手续费</span>
                        <span className={"right font30"}>¥{commission}</span>
                    </div>
                    

                </div>
            </Confirm>
        );
    }

}

module.exports = RechareDialog;
