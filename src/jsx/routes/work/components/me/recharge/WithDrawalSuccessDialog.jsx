import Confirm from '../../../../../components/common/popup/Confirm2';
import InputFormate2 from "../../optional/detail/InputFormate2"
import styles from './css/rechargeDialog.less';

class WithDrawalSuccessDialog extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    onSure = ()=>{
        setTimeout(()=>{
            var {onSure} = this.props;
            onSure && onSure();
        },50);


    }

    numChange = (num)=>{
        this.setState({num});
    }


    //渲染函数
    render(){
        //suggestBalance={suggestBalance} maxFowBalance={maxFowBalance} canFowBalance
        var {onCancel,content,showCancel,data} = this.props;
        var {amountUSD,commission} =data;

        return(
            <Confirm sureText={"确定"} onSure={this.onSure} onCancel={onCancel} showCancel={showCancel}>
                <div>
                    <p className="font30 mg-bt-10 font_bold center">提示</p>
                    <p className="font30 mg-bt-20 mg-tp-30 center">提现申请已提交审核</p>
                    <div className={styles.item2}>
                        <span className={"left"}>提现金额</span>
                        <span className={"right"}>${amountUSD}</span>
                    </div>
                    <div className={styles.item2}>
                        <span className={"left"}>手续费</span>
                        <span className={"right"}>${commission}</span>
                    </div>
                    

                </div>
            </Confirm>
        );
    }

}

module.exports = WithDrawalSuccessDialog;
