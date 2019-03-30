import Confirm from '../../../../../components/common/popup/Confirm2';
import InputFormate2 from "../../optional/detail/InputFormate2"
import styles from './css/copyDialog.less';

class CopyDialog extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            num:null
        }
    }


    onSure = ()=>{
        setTimeout(()=>{
            var {num}=this.state;
            var {onSure} = this.props;
            onSure && onSure(num);
        },50);


    }

    numChange = (num)=>{
        this.setState({num});
    }


    //渲染函数
    render(){
        //suggestBalance={suggestBalance} maxFowBalance={maxFowBalance} canFowBalance
        var {onCancel, followName,suggestBalance,maxFowBalance,canFowBalance} = this.props,
            {num} = this.state;

            var sureText="复制交易";
            if(canFowBalance == null || canFowBalance ==0){
                sureText = "立即充值";
            }
            console.log(canFowBalance);

        return(
            <Confirm sureText={sureText} onSure={this.onSure} onCancel={onCancel}>
                <div>
                    <p className="font30 mg-bt-10 font_bold">复制</p>
                    <p className="font30 mg-bt-20 font_bold">{followName}</p>
                    <p className="font20 mg-bt-20 c9">系统将使用跟单专用账号复制高手，无跟单账号复制时将自动生成，所有复制操作均使用该跟单账号进行；</p>
                    <p className="font20 mg-bt-20 c9">若复制金额低于建议复制金额，可能会导致跟单失败。</p>
                    <div className={styles.login_item}>
                        <span className={"left"}>$</span>
                        <div className={"left"} style={{width:"60%",marginLeft:"0.2rem"}}>
                            <InputFormate2 
                            valueChange={this.numChange}
                            value={num} 
                            digit={2}  />
                        </div>
                    </div>
                    <div className={styles.item}>
                        <span className={"left"}>可用金额</span>
                        <span className={"right"}>${canFowBalance}</span>
                    </div>
                    <div className={styles.item}>
                        <span className={"left"}>建议复制金额</span>
                        <span className={"right"}>${suggestBalance}</span>
                    </div>
                    <div className={styles.item}>
                        <span className={"left"}>高手剩余可复制金额</span>
                        <span className={"right"}>${maxFowBalance}</span>
                    </div>
                    

                </div>
            </Confirm>
        );
    }

}

module.exports = CopyDialog;
