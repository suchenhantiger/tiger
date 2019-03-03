import AppHeader from '../../../../components/common/appheader/AppHeader';
import HeaderIcon from '../../../../components/common/appheader/HeaderIcon';
import Confrim from '../../../../components/common/popup/Confirm';

import {connect} from 'react-redux';
import {getMt4Message} from '../../actions/me/meAction';
import styles from './css/mePage.less';

/********我的主页*********/
class MePage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state={
            showConfirm:false,
            infoEquity:{}
        }

        this._nickname = systemApi.getValue("nickname") || "--";
    }
    //获取页面名称
    getPageName() { return "我的主页"; }

    settingClick = () => {

    }

    componentDidMount(){
        var {accountArr=[]}=this.props;

        var accountObj = accountArr[0];
        if(accountObj){
            this.props.getMt4Message(this,{queryType:2,mt4Id:accountArr[0].mt4Id},(infoEquity)=>{
                this.setState({infoEquity});
                        });
        }
        
        
    }

    msgClick = () => {

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

    gotoImprove=()=>{
        hashHistory.push("/work/me/improve");
    }

    closeConfirm =()=>{
        this.setState({showConfirm:false});
    }

    // success
    // msg
    // data
    
    // infoBalance
    // mt4Id
    // balance
    // totalQty
    // ratioPL
    // totalPL
    
    // infoEquity
    // mt4Id
    // equity
    // freeMargin
    // usedMargin
    // ratioMargin
    // floatPL
    
    // floatTrade
    // ticket
    // marketPrice
    // marketTime
    // netProfit
    

    render() {
        systemApi.log("MePage render");
        var accountLength = 0;
        var {showConfirm,infoEquity={}}=this.state;
        console.log(infoEquity);
        var {accountArr}=this.props;
        var {floatPL="--",ratioMargin="--",equity="--"}=infoEquity;

        return (
            <div>
                <AppHeader headerName="我的" theme="transparent" iconRight={this.renderIcons()} />
                <Content coverHeader={true} coverBottom={false}>
                    <div className={styles.header}></div>
                    <div>
                        <div className={styles.blank}></div>
                        <div className={this.mergeClassName(styles.optional_detail)}>
                            <div className={styles.head_portrait}><img src="./images/me/img03.png" alt="" /></div>
                            <div className={styles.currency_name}>
                                <p className={this.mergeClassName(styles.c3, styles.text)}>{this._nickname}</p>
                                <p>
                                    <span className={this.mergeClassName("blue", "left")}>体验金账号</span>
                                    <span className={this.mergeClassName("c9", "left")}>(自主交易)</span>
                                    <i className={this.mergeClassName(styles.icon_select, "mg-tp-0")}></i>
                                </p>
                            </div>
                            <div className={"right"}>
                                <div className={styles.icon_account}>账号管理</div>
                            </div>
                            <div className={"clear"}></div>
                            <div className={styles.account_dt}>
                                {accountArr[0]?
                                <ul>
                                {this.renderItem("浮动盈亏", "$"+floatPL)}
                                {this.renderItem("账户净值", "$"+equity)}
                                {this.renderItem("保证金比例", ratioMargin+"%")}
                            </ul>:
                                <div style={{textAlign:"center"}} onClick={this.addAccount}>+添加账号</div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={this.mergeClassName(styles.optional_detail, styles.mt3)}>
                        <ul className={styles.account_icons}>
                            {this.renderFuncItem("充值", "./images/me/icon-recharge.png", this.rechargeClick)}
                            {this.renderFuncItem("提现", "./images/me/icon-recharge.png")}
                            {this.renderFuncItem("银行卡", "./images/me/icon-recharge.png")}
                            {this.renderFuncItem("钱包", "./images/me/icon-recharge.png")}
                        </ul>
                    </div>
                    <div className={this.mergeClassName(styles.ht_gray, styles.mt3)}></div>
                    <div className={styles.icon_list}>
                        <ul>
                            {this.renderListItem("我的钱包", "./images/me/icon-list01.png", true)}
                            {this.renderListItem("邀请好友", "./images/me/icon-list02.png", false)}
                            {this.renderListItem("每日汇评", "./images/me/icon-list03.png", false)}
                            {this.renderListItem("财经日历", "./images/me/icon-list04.png", false)}
                            {this.renderListItem("帮助中心", "./images/me/icon-list05.png", false)}
                            {this.renderListItem("联系客服", "./images/me/icon-list06.png", false)}
                        </ul>
                    </div>
                </Content>
                {showConfirm?<Confrim onSure={this.gotoImprove} onCancel={this.closeConfirm} title="完善资料后可开通体验账号" />:null}
                {this.props.children}
            </div>
        );
    }

}

function injectProps(state){
    var {accountArr} = state.base || {};
    return {accountArr};
}
function injectAction(){
    return {getMt4Message};
}

module.exports = connect(injectProps,injectAction())(MePage);
