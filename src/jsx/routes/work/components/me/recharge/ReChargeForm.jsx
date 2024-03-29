import PaySelect from './PaySelect';
import PayDest from './PayDest';
import RechareDialog from './RechareDialog';
import RechareSuccessDialog from './RechareSuccessDialog';
import AccountSelect from '../AccountSelect';
import styles from './css/rechargeForm.less';
import { connect } from 'react-redux';
import { addAccFundRecord,confirmRecharge} from '../../../actions/trade/tradeAction';
import { upLoadAllImage} from '../../../actions/me/meAction';
import { showMessage,showConfirm} from '../../../../../store/actions';
import OperationSelect from '../../../components/me/OperationSelect';

const PAY_MAP = [
    {id:"0",text:"电汇账户",desc:"电汇通常需要3-5个工作日到账"},
    {id:"1",text:"钱包",desc:""},
    {id:"2",text:"银行转账-2",desc:"单笔100-10000美金，不支持工商银行"},
    {id:"3",text:"银行转账",desc:"周一到周五：9AM-2PM"}
];

const DEST_MAP = [
    {id:"0", text:"交易账号", desc:"自主交易"}
]

class ReChargeForm extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            payType:"-1",
            destType:"-1",
            showPaySelect:false,
            showDestSelect:false,
            amount:"",
            showAccount:false,
            showRechareDialog:false,
            showConfirmSuccess:false,
            rechargeInfo:{},
            certificateImg:"",
            showChoose:false
            

        }
        this.mt4NickName=null;
        this.mt4Id=null;
        this.mt4AccType=null;
        this.payCode=null;
        this.payName=null;
        this.attachmentId="";
    }

    openPaySelect = ()=>{
        this.setState({showPaySelect:true});
    }

    selectPay = (payCode,payName)=>{
        this.payCode=payCode;
        this.payName=payName;
        this.setState({showPaySelect:false});
    }

    closePaySelect = ()=>{
        this.setState({showPaySelect:false});
    }

    openPayDest = ()=>{
        this.setState({showAccount:true})
    }

    selectDest = (destType)=>{
        this.setState({destType, showDestSelect:false});
    }

    closePayDest = ()=>{
        this.setState({showDestSelect:false});
    }

    rechargeConfirm=()=>{
        hashHistory.goBack();
        //this.setState({showRechareDialog:false});
    }

    

    rechargeSubmit = ()=>{
        var {amount} = this.state;
       // 
        if(this.mt4NickName==null){
            this.props.showConfirm("请选择账号");
            return;
        }else if(this.payCode==null){
            this.props.showConfirm("请选择支付方式");
            return;
        }else
        if((+amount)<=0){
            this.props.showConfirm("请输入充值金额");
            return;
        }
        if(this.payCode=="WIRE_TRANSFER_PAY"){
            if(this.attachmentId.length==0){
                this.props.showConfirm("请上传电汇凭证");
                return;
            }
            this.props.addAccFundRecord(this,{attachmentId:this.attachmentId,payCode:this.payCode,amountUSD:amount,recordType:1,mt4Id:this.mt4Id},(data)=>{
                this.setState({showRechareDialog:true,rechargeInfo:data});
            });
        }else{
            this.props.addAccFundRecord(this,{payCode:this.payCode,amountUSD:amount,recordType:1,mt4Id:this.mt4Id},(data)=>{
                this.setState({showRechareDialog:true,rechargeInfo:data});
            });
        }

        
    }

    inputChange = (e)=>{
        var {value} = e.target;
        var {amount:old} = this.state;
systemApi.log("sch :"+value);
systemApi.log("sch old:"+old);
         value = value.replace(/[^\d]/g, "");
         if(value.length>5){
             this.setState({amount:old});
         }else{
             this.setState({amount:value});
         }
        
    }

    numFormate =(e)=>{
       // var { value } = e.target;
       // this.setState({amount:(+value).toFixed(2)});
    }

    closeAccount = ()=>{
        this.setState({showAccount:false});
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

    }

    gotoCharge=(orderId,payUrl)=>{

       this.orderId=orderId;
        this.setState({showRechareDialog:false,showConfirmSuccess:true},()=>{
            Client.openUrlWithBrowser(payUrl,()=>{
                
                        });
        });


    }

    showWireTransfer=()=>{

        Client.openUrlInapp(systemApi.getValue("rootUrl")+"external/showWireTransfer");

    }

    closeRechareDialog=()=>{
        this.setState({showRechareDialog:false});
    }


    getImg=(cbid,certificateImg)=>{
        this.props.upLoadAllImage(this,certificateImg,(attachmentId)=>{
            this.attachmentId=attachmentId;
            this.setState({certificateImg});
        });
   }


    getCertificateImg = ()=>{
        this.setState({showChoose:true});
           

    }

    closeChoose=()=>{
        this.setState({showChoose:false});
    }

    closeSuccess =()=>{
        this.mt4NickName=null;
        this.mt4Id=null;
        this.mt4AccType=null;
        this.payCode=null;
        this.payName=null;
        this.setState({showConfirmSuccess:false,amount:""});

    }

    sureSuccess =()=>{
        this.props.confirmRecharge(this,{orderId:this.orderId},()=>{

        });
        this.setState({showConfirmSuccess:false});
        hashHistory.goBack();
    }

    //渲染函数
    render() {

        var {showDestSelect, showChoose,showConfirmSuccess, showPaySelect, amount, destType,showAccount,showRechareDialog,rechargeInfo,certificateImg} = this.state;
        var {commission,
            amountUSD} =rechargeInfo;
        return (
            <div>
                {showRechareDialog && this.payCode=="WIRE_TRANSFER_PAY"?

                <div>
                    <p className={styles.text1} >电汇凭证已提交</p>
                    <div className={styles.item33} >
                        <span >充值金额：</span>
                        <span >${amountUSD}</span>
                    </div>
                    <div className={styles.item33}>
                        <span>手续费：</span>
                        <span >${commission}</span>
                    </div>
                    <p className={styles.text2} >大概需要3-5个工作日到账</p>
                    <div className={styles.bottom_btn_fixed}>
                        <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}>
                            <button onClick={this.rechargeConfirm}>确认</button>
                        </div>
                    </div>
                </div>
                :
                <div>
                
                
                <div className={this.mergeClassName("mg-lr-30", "mg-tp-42")}>
                    <div className={this.mergeClassName(styles.form_input, "mg-bt-64")} onClick={this.openPayDest}>
                        <p >
                            <span className={styles.form_label}>充值到</span>
                            
                            <span className={this.mergeClassName("blue", "font28")} >{this.mt4NickName||"请选择"}</span>&nbsp;
                            {this.typeName?<span className={"c9"}>({this.typeName})</span>:null}
                        </p>
                    </div>
                    <div className={this.mergeClassName(styles.form_input, "mg-bt-64")} onClick={this.openPaySelect}>
                        <p >
                            <span className={styles.form_label}>支付方式</span>
                            <span className={this.mergeClassName("blue", "font28")} >{this.payName||"请选择"}</span>
                        </p>
                    </div>
                    <div className={this.mergeClassName(styles.form_input, "mg-bt-64")}>
                        <p><span className={styles.form_label}>充值金额</span></p>
                        <input type="tel" placeholder={this.payCode=="WIRE_TRANSFER_PAY"?"$":"¥" }value={amount} onBlur={this.numFormate } onChange={this.inputChange} />
                    </div>
                    {this.payCode=="WIRE_TRANSFER_PAY"?
                        <div style={{paddingBottom:"1rem"}}>
                            <div className={this.mergeClassName(styles.form_input, "mg-bt-40")} onClick={this.showWireTransfer}>
                                <span className={styles.blue}>点击查看汇款详情&gt;</span>
                            </div>
                            <div className={this.mergeClassName(styles.form_input, "mg-bt-40")}>
                                <div className={styles.upload_box} onClick={this.getCertificateImg}>
                                    <span>点击上传电汇凭证</span>
                                    {certificateImg.length>0?<img className={styles.imageFrame} src={certificateImg} />:null}
                                </div>
                            </div>
                            <div className={this.mergeClassName(styles.form_input, "mg-bt-40")}>
                                <div className={this.mergeClassName("font_bold", "mg-bt-20")}>电汇费用</div>
                                <div className={this.mergeClassName("c9", "line-ht-36")}>
                                    <p>大家汇不收取电汇入金手续费，不同银行在购汇和汇款中会收取不同的手续费（一般为手续费、电报费和中转行费用），对于购汇和汇款中产生的费用由客户自行承担，**将以实际到账的金额为客服入金。</p>
                                </div>
                            </div>
                            <div className={this.mergeClassName(styles.form_input, "mg-bt-40")}>
                                <div className={this.mergeClassName("font_bold", "mg-bt-20")}>反洗钱政策</div>
                                <div className={this.mergeClassName("c9", "line-ht-36")}>
                                    <p>不同银行在购汇和汇款中会收取不同的手续费（一般为手续费、电报费和中转行费用），对于购汇和汇款中产生的费用由客户自行承担，大家汇将以实际到账的金额为客服入金。</p>
                                </div>
                            </div>
                        </div>
                        :
                        <div style={{paddingBottom:"1rem"}}>
                            <div className={this.mergeClassName(styles.form_input, "mg-bt-40")}>
                                <div className={this.mergeClassName("font_bold", "mg-bt-20")}>充值说明</div>
                                <div className={this.mergeClassName("c9", "line-ht-36")}>
                                    <p>1.入金审核时间：周一 至 周五 9:00AM-9:00PM</p>
                                    <p>2.受理时间：1小时内</p>
                                    <p>3.支持24小时入金，审核时间外入金顺延受理</p>
                                    <p>4.非客户本人名下银行卡入金，无法成功受理。</p>
                                </div>
                            </div>
                        </div>
                    }

                </div>
                <div className={styles.bottom_btn_fixed}>
                    <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}>
                        <button onClick={this.rechargeSubmit}>确认充值</button>
                    </div>
                </div>
                {showPaySelect?<PaySelect  payType={this.payCode} onSelect={this.selectPay} onClose={this.closePaySelect}/>:null}
                {showDestSelect?<PayDest destInfo={DEST_MAP} destType={destType} onSelect={this.selectDest} onClose={this.closePayDest} />:null}
                {showAccount?<AccountSelect showOn={false} selectType={1} onSelect={this.selectAccount} onClose={this.closeAccount}/>:null}
                {showRechareDialog?<RechareDialog data={rechargeInfo} onSure={this.gotoCharge} onClose={this.closeRechareDialog}/>:null}
                {showConfirmSuccess?<RechareSuccessDialog  onSure={this.sureSuccess} onClose={this.closeSuccess}/>:null}
                {showChoose?<OperationSelect  tranImg={this.getImg} cancel={this.closeChoose}/>:null}

            </div>
            
            
            }
            
            </div>
        );
    }

}
function injectAction() {
    return { addAccFundRecord,showMessage,upLoadAllImage,confirmRecharge,showConfirm};
}

module.exports = connect(null, injectAction(), null, {withRef:true})(ReChargeForm);

