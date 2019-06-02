import styles from './css/withdrawal.less';
import AccountSelect from '../AccountSelect';
import BankSelect from './BankSelect';

import WithDrawalDialog from './WithDrawalDialog';
import WithDrawalSuccessDialog from './WithDrawalSuccessDialog';

import { connect } from 'react-redux';
import { getMt4Message,withdraw,queryBankCard} from '../../../actions/me/meAction';
import {showMessage,showConfirm} from '../../../../../store/actions';
class Withdrawal extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            money: "",
            destType: "-1",
            fowbalance:0,
            showAccount:false,
            showBank:false,
            showConfirm:false,
            cardNo:null,
            showSuccess:false,
            successInfo:null
        };
        this.mt4NickName=null;
        this.mt4Id=null;
        this.mt4AccType=null;
        this.bankid = null;
        this.cardno = null;
        this.bankname  = null;
    }

    typeClick = (destType) => () => {
        this.setState({ destType });
    }

    inputChange = (e)=>{
        var {value} = e.target;
        var {money:old} = this.state;
        value = value.replace(/[^\d.]/g, "");
        if(value.indexOf('.')>-1 && value.lastIndexOf('.')!=value.indexOf('.')){
            this.setState({money:old});
        }else{
            this.setState({money:value});
        }
        
    }

    nextClick = ()=>{
        var {money,fowbalance} =this.state;
        if(!this.mt4Id){
            this.props.showConfirm("请选择取现账号");
        }else if(!this.cardno){
            this.props.showConfirm("请选择银行卡号");
        }else 
        if(money==0){
            this.props.showConfirm("请输入取现金额");
        }else if(money>fowbalance){
            this.props.showConfirm("可提现金额不足");
        }
        else{
            this.setState({showConfirm:true});
        }

        

    }

    closeAccount = ()=>{
        this.setState({showAccount:false});
    }
    closeBank = ()=>{
        this.setState({showBank:false});
    }
    
    selectBank = (bankid,cardno,bankname)=>{
  
        this.bankid = bankid;
        this.cardno = cardno;
        this.bankname =bankname;
        this.setState({showBank:false});
        // this.mt4NickName=mt4NickName;
        // this.mt4Id=mt4Id;
        // this.mt4AccType=mt4AccType;
        // this.setState({showAccount:false});
        // this.props.getMt4Message(this,{mt4Id,queryType:1},(data)=>{
        //     var {balance="0.00"} =data; 
        //     this.setState({balance});
        // });

    }
    selectAccount = (mt4AccType, mt4Id,mt4NickName)=>{
        
        if(mt4NickName==null){
            if(mt4AccType ==0){
                mt4NickName ="体验金账户";
                this.typeName = "体验账户"
            }else if(mt4AccType==1){
                mt4NickName ="交易账户";
                this.typeName = "自主交易"
            }else if(mt4AccType==2){
                mt4NickName ="跟单账户";
                this.typeName = "跟随账户"
            }else if(mt4AccType==3){
                mt4NickName ="高手账号";
                this.typeName = "高手账号"
            }

        }else{
            if(mt4AccType ==0){
                this.typeName = "体验账户"
            }else if(mt4AccType==1){
                this.typeName = "自主交易"
            }else if(mt4AccType==2){
                this.typeName = "跟随账户"
            }else if(mt4AccType==3){
                this.typeName = "高手账号"
            }


        }
        this.mt4NickName=mt4NickName;
        this.mt4Id=mt4Id;
        this.mt4AccType=mt4AccType;
        this.setState({showAccount:false});
        this.props.getMt4Message(this,{mt4Id,queryType:2},(data)=>{
            var {fowbalance=0} =data; 
            this.setState({fowbalance});
        });

    }

    openPayDest = ()=>{
        this.setState({showAccount:true})
    }

    chooseBank =()=>{
        this.props.queryBankCard(this,{bankType:0},(bankList)=>{
            if(bankList && bankList.length>0){
                this.setState({showBank:true,bankList});
            }else{
                hashHistory.push("/work/me/bank/add");
            }
               
        });
     
    }



    numFormate =(e)=>{
        var { value } = e.target;
        if(value.indexOf(".")==0){
            value =value.slice(1);
        }
        this.setState({money:(+value).toFixed(2)});
    }

    onSure=()=>{
        var {money,fowbalance} =this.state;
        if(money>fowbalance){
            this.props.showConfirm("可提现金额不足");
            return;
        }
        this.props.withdraw(this,{recordType:2,amountUSD:money,mt4Id:this.mt4Id,bankId:this.bankid,payCode: "BANK_TRANSFER_PAY"},(successInfo)=>{
            this.setState({showConfirm:false,showSuccess:true,successInfo});
        });
    }

    onCancel=()=>{
        this.setState({showConfirm:false});
    }

    onSuccessSure=()=>{
        hashHistory.goBack();
    }



    //渲染函数
    render() {

        var { money, destType,showAccount,showConfirm ,fowbalance,showBank,bankList,showSuccess,successInfo} = this.state;

        return (
            <div>
                <div className={this.mergeClassName("mg-lr-30", "mg-tp-42")}>
                    <div className={this.mergeClassName(styles.form_input, "mg-bt-64")} onClick={this.openPayDest} >
                        <p>
                            <span className={styles.form_label}>提现账户</span>
                            <span className={this.mergeClassName("blue", "font28")} >{this.mt4NickName||"请选择"}</span>&nbsp;
                            {this.typeName?<span className={"c9"}>({this.typeName})</span>:null}
                        </p>
                        <p className={this.mergeClassName("mg-lt-140", "mg-tp-20")}>
                            <span className={"c9"}>当前账户可提现金额：${fowbalance.toFixed(2)}</span>
                        </p>
                    </div>
                    <div className={this.mergeClassName(styles.form_input, "mg-bt-64")} onClick={this.chooseBank}>
                        <p>
                            <span className={styles.form_label}>提现到</span>
                            <span className={this.mergeClassName("blue", "font28")}>{this.cardno||"请选择"}</span>&nbsp;
                            {this.bankname?<span className={"c9"}>({this.bankname})</span>:null}
                        </p>

                    </div>
                    <div className={this.mergeClassName(styles.form_input, "mg-bt-64")}>
                        <p><span className={styles.form_label}>提现金额</span></p>
                        <input type="text" placeholder="$" value={money}  onBlur={this.numFormate } onChange={this.inputChange} />
                    </div>
                    <div style={{paddingBottom:"1rem"}}>
                            <div className={this.mergeClassName(styles.form_input, "mg-bt-40")}>
                                <div className={this.mergeClassName("font_bold", "mg-bt-20")}>提现说明</div>
                                <div className={this.mergeClassName("c9", "line-ht-36")}>
                                <p>1.出金受理时间</p>
                                <p >客户工作日17点前申请出金，T+1个工作日内提交银行受理。具体到账时间以银行为准；</p>
                                <p >客户工作日17点后申请出金，T+2个工作日内提交银行受理。具体到账时间以银行为准；</p>
                                <p >节假日及周末申请出金，顺延受理</p>
                                <p>2.非客户本人名下银行卡入金，无法成功受理。  </p>
                                <p>3.申请出金后保证金水平不得低于100%</p>
                                </div>
                            </div>
                        </div>
                </div>
                <div className={styles.bottom_btn_fixed}>
                    <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}><button onClick={this.nextClick}>提现</button></div>
                </div>
                {showAccount?<AccountSelect showOn={false} selectType={1} onSelect={this.selectAccount} onClose={this.closeAccount}/>:null}
                {showConfirm?<WithDrawalDialog showCancel={true}  content="如果您还有持仓，提现会造成保证金减少，请您控制好自己到风险与仓位，避免造成不必要到资金损失。如造成资金损失，大家汇概不负责。" onSure={this.onSure} onCancel={this.onCancel} />:null}
                {showSuccess?<WithDrawalSuccessDialog data={successInfo} center={true} content="提现请求已提交，请等待客服审核。" onSure={this.onSuccessSure} showCancel={false} />:null}
                {showBank?<BankSelect bankList={bankList} bankId = {this.bankid }   onSelect={this.selectBank} onClose={this.closeBank}/>:null}
                
            </div>

        );
    }

}
function injectAction() {
    return { getMt4Message,withdraw,showMessage,showConfirm,queryBankCard};
}

module.exports = connect(null, injectAction(), null, {withRef:true})(Withdrawal);
