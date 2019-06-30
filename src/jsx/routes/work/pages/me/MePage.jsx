import AppHeader from '../../../../components/common/appheader/AppHeader';
import HeaderIcon from '../../../../components/common/appheader/HeaderIcon';

import AccountSelect from '../../components/me/AccountSelect';
import NoMt4Frame from '../../components/me/NoMt4Frame';
import {connect} from 'react-redux';
import {showMessage,showComplete,showCertification, WARNING, SUCCESS} from '../../../../store/actions';
import {getMt4Message} from '../../actions/me/meAction';
import {updateUserInfo} from '../../actions/login/loginAction';
import styles from './css/mePage.less';

/********我的主页*********/
class MePage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state={
            showAccount:false,
            infoEquity:{}
        }

        this._nickname = systemApi.getValue("nickname") || "";
    }
    //获取页面名称
    getPageName() { return "我的主页"; }

    settingClick = () => {
        hashHistory.push("/work/me/setting");
    }



    componentDidMount(){
        var avatarUrl = systemApi.getValue("avatarUrl");
        let status = 1;
        if(avatarUrl == null ||avatarUrl.length==0) status=0 ;
        this.props.updateUserInfo(this,()=>{
           
        },status);

        var mt4Id = systemApi.getValue("mt4Id");
        if(mt4Id && mt4Id.length>0){
            this.props.getMt4Message(this,{queryType:4,mt4Id},(infoEquity)=>{
                this.setState({infoEquity});
            });
        }

        
    }

    msgClick = () => {
        hashHistory.push("/work/me/notice");
    }

    onErr=()=>{
        if(!this._lock){
            $(this.refs.userPhoto).attr('src',"./images/me/img03.png");
            this._lock=true;
        }
        
    }

    renderLeft() {
        var avatarUrl = systemApi.getValue("avatarUrl");
        if(avatarUrl == null ||avatarUrl.length==0) avatarUrl= "./images/me/img03.png" ;
        return <div>
                <div className={styles.head_portrait}><img ref="userPhoto" src={avatarUrl} alt="" onError={this.onErr}/></div>
                <span  className={styles.head_name} >{this._nickname}</span>
                </div>
    }

    renderIcons() {
        return [
            <HeaderIcon iconCls={styles.setting} onClick={this.settingClick} />,
            <HeaderIcon iconCls={styles.msg} onClick={this.msgClick} />
        ]
    }

    renderItem(text, value) {
        return (
            <li>
                <p className="font32">{value}</p>
                <p className={this.mergeClassName("c9", "mg-tp-10")}>{text}</p>
            </li>
        )
    }

    renderFuncItem(text, icon, onClick) {
        return (
            <li onClick={onClick}>
                <p><img src={icon} /></p>
                <p>{text}</p>
            </li>
        )
    }

    manageAcc=()=>{
        hashHistory.push("/work/manageacc");
    }

    renderListItem(text, icon, isRed, onClick) {
        return (
            <li onClick={onClick}>
                <p className={styles.list_icon}><img src={icon}/></p>
                <p className={styles.list_text}>{text}{isRed ? <i className={"red"}></i> : null}</p>
            </li>
        )
    }
    checkComplete=(msg,cb)=>{
        let emailIsActive = systemApi.getValue("emailIsActive");
      //  let isReal = systemApi.getValue("isReal");
        if(emailIsActive==0){
            this.props.showComplete(msg);
        }else{
            cb && cb();
        }
        
    }

    checkIsReal=(cb)=>{
       // let emailIsActive = systemApi.getValue("emailIsActive");
        let isReal = systemApi.getValue("isReal");
        if(isReal==3){
            cb && cb();
        }else if(isReal==2){
            hashHistory.push("/work/me/certification");
        }else 
            this.props.showCertification();
        
    }

    rechargeClick = ()=>{
        this.checkComplete("请先完善用户信息",()=>{
            this.checkIsReal(()=>{
                hashHistory.push("/work/me/recharge");
            });
         
        });
       
    }


    addRealAccount=()=>{
       this.checkIsReal();
            
    }






    dailyReportClick = ()=>{
       // http://47.101.164.147:8089/jeeplus/mcapp/external/marketNews
        // hashHistory.push("/work/me/dailyreport");
        Client.openUrlInapp(systemApi.getValue("rootUrl")+"external/marketNews");
    }
    financialCalendar = ()=>{
        
        // hashHistory.push("/work/me/dailyreport");
        Client.openUrlInapp(systemApi.getValue("rootUrl")+"external/financialCalendar");
    }
    showAccount = ()=>{
        this.setState({showAccount:true});
    }

    closeAccount = ()=>{
        this.setState({showAccount:false});
    }

    selectAccount = (mt4AccType, mt4Id,mt4NickName)=>{
        systemApi.setValue("mt4AccType", mt4AccType);
        systemApi.setValue("mt4Id", mt4Id);
        systemApi.setValue("mt4NickName", mt4NickName);
        
        this.setState({showAccount:false});
        this.props.getMt4Message(this,{queryType:4,mt4Id},(infoEquity)=>{
            this.setState({infoEquity});
        });
    }

    bankClick = ()=>{
        this.checkComplete("请先完善用户信息",()=>{
            hashHistory.push("/work/me/bank");
        });
       
    }

    showTip = ()=>{
        this.props.showMessage(SUCCESS, "敬请期待");
    }

    toHelpPage = ()=>{
        hashHistory.push({
            pathname:"/work/me/help",
            query:{
                title:"帮助中心",
                code:"HELP_CENTER"
            }

        });
    }

    toServerPage = ()=>{

        hashHistory.push({
            pathname:"/work/me/server",
            query:{
                title:"联系客服",
                code:"CUSTOMER_SERVICE"
            }

        });
    }
    redPocket  = ()=>{
        hashHistory.push({
            pathname:"/work/me/server",
            query:{
                title:"红包",
                code:"RED_POCKET"
            }

        });
    }
    
    addAccount=()=>{
        this.props.showComplete("完善资料后可开通体验账号");
    }

    render() {
        systemApi.log("MePage render");
        var accountLength = 0;
        var {showAccount,infoEquity={}}=this.state;
        var {floatPL="--",ratioMargin="--",equity="--"}=infoEquity;
        let mt4Id = systemApi.getValue("mt4Id");
        
        let mt4AccType = systemApi.getValue("mt4AccType");
        let mt4NickName = systemApi.getValue("mt4NickName");
        let emailIsActive = systemApi.getValue("emailIsActive");
        let isReal = systemApi.getValue("isReal"); 
        var accName = "--";
        var typeName = "";
        if(mt4Id ==null || mt4Id.length==0 ){
            //没有账号或者账号异常

        }else if(mt4AccType ==0){
            accName ="体验金账户";
            typeName = "体验账户"
        }else if(mt4AccType==1){
            accName ="交易账户";
            typeName = "自主交易"
        }else if(mt4AccType==2){
            accName ="跟单账户";
            typeName = "跟随账户"
        }else if(mt4AccType==3){
            accName ="高手账户";
            typeName = "高手账户"
        }

        if(mt4NickName!="" && mt4NickName!=null && mt4NickName!=undefined && mt4NickName !="null" && mt4NickName !="undefined"){
            

            accName =mt4NickName;
        }
        


        return (
            <div>
                <AppHeader showBack={false}  iconLeft={this.renderLeft()}  theme="makecaptail" iconRight={this.renderIcons()} />
                <Content coverHeader={true} coverBottom={false}>
                    <div className={styles.header}></div>
                    <div>
                        <div className={styles.blank}></div>
                            {emailIsActive==0?
                                <NoMt4Frame />
                            :<div className={styles.optional_detail}>
                                
                                <div className={styles.currency_name} onClick={this.showAccount} >
                                    <p className={this.mergeClassName("blue","left", styles.text)}>{accName}</p>
                                    <i className={this.mergeClassName(styles.icon_select, "mg-tp-0")}></i>
                                    <p >
                                        {/* <span className={this.mergeClassName("blue", "left")} >{accName}</span> */}
                                        <span className={this.mergeClassName("c9", "left")}>({typeName})</span>
                                        
                                    </p>
                                </div>
                                <div className={"right"}>
                                    <div className={styles.icon_account} onClick={this.manageAcc} >{McIntl.message("manage")}</div>
                                </div>
                                <div className={"clear"}></div>
                                <div className={styles.account_dt}>
                                    {(emailIsActive==1 && mt4Id !=null && mt4Id.length)?
                                    <ul>
                                    {this.renderItem("浮动盈亏", "$"+floatPL)}
                                    {this.renderItem("账户净值", "$"+equity)}
                                    {this.renderItem("保证金比例", ratioMargin+"%")}
                                </ul>:
                                    <div style={{textAlign:"center",color: "blue"}} onClick={this.addAccount}>+添加账户</div>
                                    }
                                    <div className={"clear"}/>
                                    {emailIsActive==1 && isReal==0 ? <div className={styles.addBtn}  onClick={this.addRealAccount}>添加交易账户</div>:null}
                                </div>

                            </div>
                            
                            }

                    </div>
                    <div className={this.mergeClassName(styles.optional_detail, styles.mt3)}>
                        <ul className={styles.account_icons}>
                            {this.renderFuncItem(McIntl.message("deposit"), "./images/me/icon-recharge.png", this.rechargeClick)}
                            {this.renderFuncItem(McIntl.message("withdraw"), "./images/me/icon-withdrawal.png",this.rechargeClick)}
                            {this.renderFuncItem(McIntl.message("bank_cards"), "./images/me/icon-bank-card.png", this.bankClick)}
                            {/* {this.renderFuncItem("钱包", "./images/me/icon-recharge.png")} */}
                        </ul>
                    </div>
                    <div className={this.mergeClassName(styles.optional_detail, styles.mt3)}>
                        <ul className={styles.icon_list}>
                            {this.renderListItem("我的红包", "./images/me/icon-list01.png", false, this.redPocket)}
                            {this.renderListItem("邀请好友", "./images/me/icon-list02.png", false, this.showTip)}
                            {this.renderListItem("市场快讯", "./images/me/icon-list03.png", false, this.dailyReportClick /*this.dailyReportClick*/)}
                            {this.renderListItem("财经日历", "./images/me/icon-list04.png", false, this.financialCalendar)}
                            {this.renderListItem("帮助中心", "./images/me/icon-list05.png", false, this.toHelpPage)}
                            {this.renderListItem("联系客服", "./images/me/icon-list06.png", false, this.toServerPage)}
                        </ul>
                    </div>
                </Content>
                {showAccount?<AccountSelect onSelect={this.selectAccount} onClose={this.closeAccount}/>:null}
                {this.props.children}
            </div>
        );
    }

}

function injectAction(){
    return {showComplete,showCertification,getMt4Message,updateUserInfo, showMessage};
}

module.exports = connect(null,injectAction())(MePage);
