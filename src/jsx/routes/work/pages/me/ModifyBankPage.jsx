import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import { connect } from 'react-redux';
import { addBankCard} from '../../actions/me/meAction';
import InputItem from '../../components/me/bank/InputItem';
import Confirm from '../../../../components/common/popup/Confirm2';
import { showMessage} from '../../../../store/actions';
import styles from './css/addBankPage.less';

/********我的主页*********/
class AddBankPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        var {cardInfo} = this.props.location.query||{};
        cardInfo = JSON.parse(cardInfo);
        this.state = {
            showConfirm:false,
            cardInfo:cardInfo
        }
    }
    //获取页面名称
    getPageName() { return "添加银行账户"; }

    inputChange = (key)=>(e)=>{
        var {value} = e.target;
   //    console.log(value);
        this.setState({[key]:value});
    }

    componentWillUnmount(){
        Event.fire("refresh_banklist");
        
    }

    // 电汇账号使用
    // cardholderEN
    // bankNameEN
    // swiftCode
    confirmSubmit=()=>{
        var {name, country, account, bankName, province, city, branchName, telephone} = this.state;
        this.props.addBankCard(this,{
            bankType:0,
            cardholder:name, 
            bankCountry:country, 
            cardNo:account, 
            bankName, province, city, 
            bankBranch:branchName, phone:telephone},()=>{
                hashHistory.goBack();

        });
    }

    submit = ()=>{
        var {city,bankcountry,bankbranch,cardholder,cardno,province,phone,bankname} = this.state;
        if(cardholder==null || cardholder.length==0){
            this.props.showMessage("error","请输入持卡人");
        }else if(bankcountry==null || bankcountry.length==0){
            this.props.showMessage("error","请输入持卡人所在国家");
        }else if(cardno==null || cardno.length==0){
            this.props.showMessage("error","请输入卡号");
        }else if(province==null || province.length==0){
            this.props.showMessage("error","请输入持卡人所在省份");
        }else if(bankname==null || bankname.length==0){
            this.props.showMessage("error","请输入银行名称");
        }else if(city==null || city.length==0){
            this.props.showMessage("error","请输入持卡人所在城市");
        }else if(bankbranch==null || bankbranch.length==0){
            this.props.showMessage("error","请输入开户支行");
        }else if(phone==null || phone.length==0){
            this.props.showMessage("error","请输入银行预留手机号");
        }else
        this.setState({showConfirm:true});
      
    }

    closeConfirm=()=>{
        this.setState({showConfirm:false});
    }

    render() {
        systemApi.log("AddBankPage render");

        var {cardInfo} = this.state;
        var {city,bankcountry,bankbranch,cardholder,cardno,province,phone,bankname ,showConfirm} =cardInfo;
       // {"clientid":"800002","city":"福州","bankcountry":"中国","bankbranch":"湖东支行","banktype":"0","createdate":1561037380000,"cardholder":"苏晨涵","cardno":"6226095911438948","cardactive":"0","bankid":"771fe63596f041c691039edb820f9923","province":"福建","phone":"18650478910","id":"22eae6a1c3174f329e3422da0c4e8f9f","bankname":"招商银行"}
       return (
            <FullScreenView>
                <AppHeader headerName="" />
                <Content>
                    <div className={styles.header}>修改银行账户</div>
                    <div className={styles.hint}>请绑定认证用户本人的银行账户，当前支持信用卡提现，请绑定储蓄卡。</div>
                    <div className={styles.cont}>
                        <InputItem name="持卡人" value={cardholder} onChange={this.inputChange("cardholder")} placeholder="请输入持卡人姓名" />
                        <InputItem name="银行国家" value={bankcountry} onChange={this.inputChange("bankcountry")} placeholder="请输入银行国家" />
                        <InputItem name="银行卡" value={cardno} onChange={this.inputChange("cardno")} placeholder="请输入银行卡" />
                        <InputItem name="银行名称" value={bankname} onChange={this.inputChange("bankname")} placeholder="请输入您的银行名称" />
                        <InputItem name="开户省" value={province} onChange={this.inputChange("province")} placeholder="请输入您的开户省" />
                        <InputItem name="开户市" value={city} onChange={this.inputChange("city")} placeholder="请输入您的开户市" />
                        <InputItem name="开户支行" value={bankbranch} onChange={this.inputChange("bankbranch")} placeholder="请输入支行名称" />
                        <InputItem name="预留手机号" value={phone} onChange={this.inputChange("phone")} placeholder="请输入银行预留手机号" />
                    </div>
                    <div className={styles.btnFrame}><div className={styles.btn} onClick={this.submit}>修改</div></div>
                </Content>
                {showConfirm?
                <Confirm   onSure={this.confirmSubmit} onCancel={this.closeConfirm}>
                <div>
                    <p className="font30 mg-bt-10 font_bold center">提示</p>
             
                    <div className={"mg-tp-20"}>
                        <span style={{lineHeight: ".4rem",fontSize: ".24rem"}}>确认修改银行账户信息？</span>

                    </div>
                
                </div>
            </Confirm>:null}
                {this.props.children}
            </FullScreenView>
        );
    }

}

function injectAction() {
    return { addBankCard,showMessage};
}

module.exports = connect(null, injectAction())(AddBankPage);
