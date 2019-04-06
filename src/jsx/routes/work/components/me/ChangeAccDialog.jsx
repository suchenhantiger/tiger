import Confirm from '../../../../components/common/popup/Confirm2';
import styles from './css/copyDialog.less';

class ChangeAccDialog extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        var {accName}=props;
        this.state = {
            accName:accName,
        }
    }


    onSure = ()=>{
        setTimeout(()=>{
            var {accName}=this.state;
            var {onSure,mt4Id} = this.props;
            onSure && onSure(accName,mt4Id);
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
            <Confirm sureText={"修改"} onSure={this.onSure} onCancel={onCancel}>
                <div>
                    <p className="font30 mg-bt-10 font_bold">当前备注名: {this.props.accName}</p>
                    {/* <p className="font20 mg-bt-20 c9">备注名长度小于12个字符</p> */}
                    <div className={styles.login_item} onChange={this.numChange}>
                        <input value={accName} onChange={this.numChange}/>

                    </div>
            
                </div>
            </Confirm>
        );
    }

}

module.exports = ChangeAccDialog;
