import Confirm from '../../../../../components/common/popup/Confirm2';
import CheckBox from '../../../../../components/common/form/CheckBox';
import InputFormate2 from "../../optional/detail/InputFormate2"
import styles from './css/copyDialog.less';

class CancelDialog extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            cancelType:true
        }
    }


    onSure = ()=>{
        setTimeout(()=>{
            var {cancelType}=this.state;
            var {onSure} = this.props;
            onSure && onSure(cancelType);
        },50);


    }

    checkFirst = ()=>{
        this.setState({cancelType:true});
    }

    checkSecond = ()=>{
        this.setState({cancelType:false});
    }


   


    //渲染函数
    render(){
        //suggestBalance={suggestBalance} maxFowBalance={maxFowBalance} canFowBalance
        var{onCancel} =this.props;
        var {cancelType} = this.state;



        return(
            <Confirm sureText={"确认"} onSure={this.onSure} onCancel={onCancel}>
                <div>
                    <p className="font30 mg-bt-10 font_bold">解除跟随关系</p>
                    <div className={styles.checkFrame}>
                        <CheckBox checked={cancelType} onChange={this.checkFirst}/> 
                        <span>取消复制并跟随高手平仓</span>
                    </div>
                    <div className={styles.checkFrame}>
                        <CheckBox checked={!cancelType} onChange={this.checkSecond}/>
                        <span>取消复制并强制平仓</span>
                    </div>
                    
                    
                    <p className="font20 mg-bt-20 c9">解除跟随关系解除跟随关系解除跟随关系解除跟随关系</p>
                    
                </div>
            </Confirm>
        );
    }

}

module.exports = CancelDialog;
