import Confirm from '../../../../../components/common/popup/Confirm2';
import InputFormate2 from "../../optional/detail/InputFormate2"
import styles from './css/rechargeDialog.less';

class CopyDialog extends PureComponent{

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
        var {onCancel} = this.props;



        return(
            <Confirm sureText={"确定"} onSure={this.onSure} onCancel={onCancel}>
                <div>
                    <p className="font30 mg-bt-10 font_bold center">提示</p>

                    <div className={styles.item}>
                        <span className={"mg-bt-10"+" " +styles.tip}>如果您还有持仓，提现会造成保证金减少，请您控制好自己到风险与仓位，避免造成不必要到资金损失。如造成资金损失，MakeCaptial概不负责。</span>

                    </div>
                
                </div>
            </Confirm>
        );
    }

}

module.exports = CopyDialog;
