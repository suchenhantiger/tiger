import Confirm from '../../../../../components/common/popup/Confirm2';
import InputFormate2 from "../../optional/detail/InputFormate2"
import styles from './css/copyDialog.less';

class ProcotolDialog extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            num:null
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

        var {onCancel, followName} = this.props,
            {num} = this.state;

        return(
            <Confirm sureText={"同意"} onSure={this.onSure} onCancel={onCancel}>
                <div>

                    <p className="font30 mg-bt-20 c1">协议内容协议内容协议内容协议内容协议内容</p>
                    <p className="font30 mg-bt-20 c1">协议内容协议内容协议内容协议内容协议内容协议内容协议内容</p>

                </div>
            </Confirm>
        );
    }

}

module.exports = ProcotolDialog;
