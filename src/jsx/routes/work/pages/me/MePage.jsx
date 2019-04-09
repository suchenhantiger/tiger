import AppHeader from '../../../../components/common/appheader/AppHeader';
import HeaderIcon from '../../../../components/common/appheader/HeaderIcon';
import Confrim from '../../../../components/common/popup/Confirm';

import AccountSelect from '../../components/me/AccountSelect';

import {connect} from 'react-redux';
import {getMt4Message} from '../../actions/me/meAction';
import {updateUserInfo} from '../../actions/login/loginAction';
import styles from './css/mePage.less';

/********我的主页*********/
class MePage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state={
            showConfirm:false,
            showReal:false,
            showAccount:false,
            infoEquity:{}
        }

        this._nickname = systemApi.getValue("nickname") || "--";
    }
    //获取页面名称
    getPageName() { return "我的主页"; }

    settingClick = () => {
        hashHistory.push("/work/me/setting");
    }



    componentDidMount(){
        this.props.updateUserInfo(this,()=>{
            var mt4Id = systemApi.getValue("mt4Id");
            if(mt4Id && mt4Id.length>0){
                this.props.getMt4Message(this,{queryType:2,mt4Id},(infoEquity)=>{
                    this.setState({infoEquity});
                });
            }
            

        });

     
        
        
    }

    msgClick = () => {
        hashHistory.push("/work/me/notice");
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
        hashHistory.push("/work/me/manageacc");
    }

    renderListItem(text, icon, isRed, onClick) {
        return (
            <li onClick={onClick}>
                <div className={styles.list_icon}><img src={icon} /> </div>
                <div className={styles.list_text}>{text}{isRed ? <i className={"red"}></i> : null}</div>
            </li>
        )
    }

    rechargeClick = ()=>{
        hashHistory.push("/work/me/recharge");
    }

    addAccount=()=>{
        this.setState({showConfirm:true});
    }

    addRealAccount=()=>{
       // hashHistory.push("/work/me/certification");
       let isReal = systemApi.getValue("isReal"); 
       if(isReal ==2){
            hashHistory.push("/work/me/checking");
       }else
            this.setState({showReal:true});
    }

    gotoReal=()=>{
         hashHistory.push("/work/me/certification");
         this.setState({showReal:false});
     }

    closeRealConfirm =()=>{
        this.setState({showReal:false});
    }


    gotoImprove=()=>{
        this.setState({showConfirm:false});
        hashHistory.push("/work/improve");
    }

    closeConfirm =()=>{
        this.setState({showConfirm:false});
    }


    dailyReportClick = ()=>{
        hashHistory.push("/work/me/dailyreport");
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
        this.props.getMt4Message(this,{queryType:2,mt4Id},(infoEquity)=>{
            this.setState({infoEquity});
        });
    }

    bankClick = ()=>{
        hashHistory.push("/work/me/bank");
    }

    render() {
        systemApi.log("MePage render");
        var accountLength = 0;
        var {showConfirm,showReal,showAccount,infoEquity={}}=this.state;
        var {floatPL="--",ratioMargin="--",equity="--"}=infoEquity;
        let mt4Id = systemApi.getValue("mt4Id");
        var avatarUrl = systemApi.getValue("avatarUrl");
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
        }
        console.log(mt4NickName);
        console.log(typeof(mt4NickName));
        if(mt4NickName!=null && mt4NickName!=undefined && mt4NickName !="null" && mt4NickName !="undefined"){
            

            accName =mt4NickName;
        }
        if(avatarUrl == null ||avatarUrl.length==0) avatarUrl= "./images/me/img03.png" ;


        return (
            <div>
                <AppHeader headerName="我的" theme="makecaptail" iconRight={this.renderIcons()} />
                <Content coverHeader={true} coverBottom={false}>
                    <div className={styles.header}></div>
                    <div>
                        <div className={styles.blank}></div>
                            {emailIsActive==0?
                            <div className={styles.optional_detail}>
                                <div className={styles.currency_name}>
                                    <p className={this.mergeClassName(styles.c3, styles.text)}>交易账户</p>
                                </div>
                                <div className={"clear"}></div>
                                <div className={styles.account_dt}>
                                    <div style={{textAlign:"center",fontSize:".8rem",paddingTop: ".2rem",paddingBottom: ".2rem",color: "blue"}} onClick={this.addAccount}> +</div>
                                    <div style={{textAlign:"center",paddingTop: ".1rem",color: "blue"}}  onClick={this.addAccount} >添加账户</div>
                                </div>
                            </div>
                            :<div className={styles.optional_detail}>
                                <div className={styles.head_portrait}><img src={avatarUrl} alt="" /></div>
                                <div className={styles.currency_name}>
                                    <p className={this.mergeClassName(styles.c3, styles.text)}>{this._nickname}</p>
                                    <p onClick={this.showAccount}>
                                        <span className={this.mergeClassName("blue", "left")} >{accName}</span>
                                        <span className={this.mergeClassName("c9", "left")}>({typeName})</span>
                                        <i className={this.mergeClassName(styles.icon_select, "mg-tp-0")}></i>
                                    </p>
                                </div>
                                <div className={"right"}>
                                    <div className={styles.icon_account} onClick={this.manageAcc} >账号管理</div>
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
                                    {emailIsActive==1 && isReal==0 ? <div style={{textAlign:"center",paddingTop: "1.0rem",color: "blue"}} onClick={this.addRealAccount}>+添加交易账户</div>:null}
                                </div>

                            </div>
                            
                            }

                    </div>
                    <div className={this.mergeClassName(styles.optional_detail, styles.mt3)}>
                        <ul className={styles.account_icons}>
                            {this.renderFuncItem("充值", "./images/me/icon-recharge.png", this.rechargeClick)}
                            {this.renderFuncItem("提现", "./images/me/icon-recharge.png")}
                            {this.renderFuncItem("银行卡", "./images/me/icon-recharge.png", this.bankClick)}
                            {/* {this.renderFuncItem("钱包", "./images/me/icon-recharge.png")} */}
                        </ul>
                    </div>
                    <div className={this.mergeClassName(styles.ht_gray, styles.mt3)}></div>
                    <div className={styles.icon_list}>
                        <ul>
                            {this.renderListItem("我的钱包", "./images/me/icon-list01.png", false)}
                            {this.renderListItem("邀请好友", "./images/me/icon-list02.png", false)}
                            {this.renderListItem("每日汇评", "./images/me/icon-list03.png", false, this.dailyReportClick)}
                            {this.renderListItem("财经日历", "./images/me/icon-list04.png", false)}
                            {this.renderListItem("帮助中心", "./images/me/icon-list05.png", false)}
                            {this.renderListItem("联系客服", "./images/me/icon-list06.png", false)}
                        </ul>
                    </div>
                </Content>
                {showConfirm?<Confrim onSure={this.gotoImprove} onCancel={this.closeConfirm} title="完善资料后可开通体验账号" />:null}
                {showReal?<Confrim onSure={this.gotoReal} onCancel={this.closeRealConfirm} title="根据监管要求，请先实名认证" />:null}
                {showAccount?<AccountSelect onSelect={this.selectAccount} onClose={this.closeAccount}/>:null}
                {this.props.children}
            </div>
        );
    }

}

function injectAction(){
    return {getMt4Message,updateUserInfo};
}

module.exports = connect(null,injectAction())(MePage);
