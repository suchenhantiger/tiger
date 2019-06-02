import Confirm from '../../../../../components/common/popup/Confirm2';
import InputFormate2 from "../../optional/detail/InputFormate2"
import styles from './css/copyDialog.less';

class SuccessDialog extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        var {fowBalance}=props;
        console.log(fowBalance);
        this.state = {
            num:fowBalance
        }
    }


 


    //渲染函数
    render(){
        //suggestBalance={suggestBalance} maxFowBalance={maxFowBalance} canFowBalance
        var {onSure,type} = this.props;

        if(type==true){
            var content = "解除跟随关系请求已提交，将跟随高手平仓";
        }else
            var content = "强制解除跟随关系请求已提交";

        return(
            <Confirm sureText={"确定"} onSure={onSure} showCancel={false}>
                <div>
                    <p className="font36 mg-bt-30 mg-tp-10 center">提示</p>
                    <p className="font30 mg-bt-10 mg-tp-10 center">{content}</p>
     
                    

                </div>
            </Confirm>
        );
    }

}

module.exports = SuccessDialog;
