import Confirm from '../../../../../components/common/popup/Confirm2';
import styles from './css/rechargeDialog.less';

class RechareSuccessDialog extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }


    onSure = ()=>{
        setTimeout(()=>{
            var {onSure} = this.props;
            onSure && onSure();
        },50);


    }


    //渲染函数
    render(){
        //suggestBalance={suggestBalance} maxFowBalance={maxFowBalance} canFowBalance
        var {onClose} = this.props;


        return(
            <Confirm  sureText={"确认"} onSure={this.onSure} onCancel={onClose}>
                <div>
                    <p className="font30 mg-bt-10 font_bold center">提示</p>
             
                    <div className={styles.item2}>
                        <span className={"center line-ht-36"}>充值成功后，请点击确认。请耐心等待客服审核，如有疑问，请联系客服。</span>

                    </div>
                
                </div>
            </Confirm>
        );
    }

}

module.exports = RechareSuccessDialog;
