import Confirm from '../../../../components/common/popup/Confirm2';
import styles from './css/copyDialog.less';

class CopyDialog extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            accName:"交易账号",
        }
    }


    onSure = ()=>{
        setTimeout(()=>{
            var {accName}=this.state;
            var {onSure} = this.props;
            onSure && onSure(accName);
        },50);
    }

    numChange = (e)=>{
        if(e.target.value.length<12)
        this.setState({accName:e.target.value});
    }


    //渲染函数
    render(){
        //suggestBalance={suggestBalance} maxFowBalance={maxFowBalance} canFowBalance
        var {onCancel} = this.props,
            {accName} = this.state;

        return(
            <Confirm sureText={"立即创建"} onSure={this.onSure} onCancel={onCancel}>
                <div>
                    <p className="font30 mg-bt-10 font_bold">新建子账号</p>
                    <p className="font20 mg-bt-20 c9">账号昵称</p>
                    <div className={styles.login_item} >
                        <input value={accName} onChange={this.numChange}/>

                    </div>
                    <p className="font20 mg-bt-20 c9">最多创建6个交易账号，一个跟单账号</p>
                    <p className="font20 mg-bt-20 c9">新建子账号前需确保已充值激活所有已开通的交易账号</p>
            
                </div>
            </Confirm>
        );
    }

}

module.exports = CopyDialog;
