import Confirm from '../../../../components/common/popup/Confirm2';
import styles from './css/modifyDialog.less';
class ModifyDialog extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state = {

            errMsg:"",
            inputeValue:"",

        }


    }

    inputChange = (e) => {
        var { value } = e.target;
        this.setState({ inputeValue: value });
    }



    onSure = ()=>{
        var {inputeValue} = this.state;
        var {onSure,modifyKey} = this.props;
        onSure && onSure({value:inputeValue,modifyKey});

    }


    //渲染函数
    render(){
        //suggestBalance={suggestBalance} maxFowBalance={maxFowBalance} canFowBalance
        var {onCancel,modifyKey,modifyTitle} = this.props,
            {restTime,validCode,errMsg,inputeValue,showBtn,canSend} = this.state;
            
            
        return(
            <Confirm sureText={"保存"} onSure={this.onSure} cancelText="取消" onCancel={onCancel}>
                <p className={"font24 mg-tp-20 mg-lt-30 mg-bt-20"}>{modifyTitle}</p>
                <input className={styles.input} value={inputeValue} onChange={this.inputChange} placeholder="请输入新昵称" />
                {errMsg.length?(
                    <div className={styles.login_pro}>
                        <div className={this.mergeClassName(styles.pro_error, "red")} >{errMsg}</div>
                    </div>
                ):null}
            </Confirm>
        );
    }

}


module.exports = ModifyDialog;

