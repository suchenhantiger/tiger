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
        var {onCancel} = this.props;


        return(
            <Confirm  sureText={"确认充值成功"} onSure={this.onSure} showCancel={false}>
                <div>
                    <p className="font30 mg-bt-10 font_bold center">提示</p>
             
                    <div className={styles.item2}>
                        <span className={"center"}>充值成功后，请耐心等待客服审核。如有疑问，请联系客服。</span>

                    </div>
                
                </div>
            </Confirm>
        );
    }

}

module.exports = RechareSuccessDialog;
