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
        var {onCancel,content,showCancel,center} = this.props;



        return(
            <Confirm sureText={"确定"} onSure={this.onSure} onCancel={onCancel} showCancel={showCancel}>
                <div>
                    <p className="font30 mg-bt-10 font_bold center">提示</p>

                    <div className={styles.item}>
                        <span className={"mg-bt-10"+" " +styles.tip }>{content}</span>

                    </div>
                
                </div>
            </Confirm>
        );
    }

}

module.exports = CopyDialog;
