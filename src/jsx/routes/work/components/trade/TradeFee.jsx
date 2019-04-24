import { connect } from 'react-redux';
import {getHistoryInfo} from "../../actions/trade/tradeAction";
import CommissionList from "./CommissionList";
import EmptyFrame from "./EmptyFrame";
import styles from './css/tradeFee.less';
import AccountSelect from '../../components/me/AccountSelect';
class TradeFee extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            infoBalance:{},
            forceFlag:0,
            isEmpty:false,
            showAccount:false
        }
        this._mt4Id = systemApi.getValue("m_mt4Id");
        if(this._mt4Id && this._mt4Id.length>0){
            this._mt4AccType = 3;
            this._mt4NickName = systemApi.getValue("m_mt4NickName"); 
        }else{
            this._mt4Id = systemApi.getValue("f_mt4Id");
            this._mt4AccType = 2;
            this._mt4NickName = systemApi.getValue("f_mt4NickName"); 
        }

    }

    componentDidMount() {
        this.refreshAllData();
    }

    refreshAllData =()=>{        
        if (this._mt4Id  == null || this._mt4Id .length == 0) {
            //没有账号或者账号异常

            return;
        }

        this.props.getHistoryInfo(this, { mt4Id:this._mt4Id , queryType: 1 }, (infoBalance) => {
            var {forceFlag} =this.state;
            forceFlag++;
            this.setState({ infoBalance, forceFlag,isEmpty:false});
        });

    }

    getScrollStyle() {
        return styles.frame;
    }
    reloadData = () => {
        this.refreshAllData();
    }

    refreshScroll =(dataLength,hasMore)=>{
        // console.log("sch "+dataLength+" "+hasMore);
        this.setState({isEmpty:!(dataLength>0)});

        var { iscroll } = this.refs;
            setTimeout(function(){
                iscroll && iscroll.refresh();
                iscroll.setHasMore(hasMore);
            },50);

    }

    getNextPage = ()=>{
        var {commissionList} = this.refs;
            commissionList && commissionList.getWrappedInstance().getNextPage();
        
    }

    selectAccount = (mt4AccType, mt4Id,mt4NickName)=>{
        this._mt4Id =mt4Id;
        this._mt4AccType = mt4AccType;
        this._mt4NickName = mt4NickName;
        this.setState({showAccount:false});
        this.refreshAllData();
    }
    showAccount = ()=>{
        this.setState({showAccount:true});
    }
    closeAccount = ()=>{
        this.setState({showAccount:false});
    }

    gotoDocumentary =()=>{
        setTimeout(()=>{
            hashHistory.push("/work/documentary");
        },50);
    }

    //渲染函数
    render() {

        var { infoBalance,forceFlag,isEmpty,hasMore,showAccount} = this.state;
        var { balance = "0.00",commissionLast ="0.00",commission="0.00",
            ratioPL = "0.00",
            totalPL = "0.00",
            totalQty = "0.00" } = infoBalance;

            var accName = "--";
            var typeName = "";
        if(this._mt4Id ==null || this._mt4Id.length==0 ){
            //没有账号或者账号异常

        }else if(this._mt4AccType ==0){
            accName ="体验金账户";
            typeName = "体验账户"
        }else if(this._mt4AccType==1){
            accName ="交易账户";
            typeName = "自主交易"
        }else if(this._mt4AccType==2){
            accName ="跟单账户";
            typeName = "跟随账户"
        }else if(this._mt4AccType==3){
            accName ="高手账户";
            typeName = "高手账户"
        }
        if(this._mt4NickName!="" && this._mt4NickName!=null && this._mt4NickName!=undefined && this._mt4NickName !="null" && this._mt4NickName !="undefined"){
            

            accName =this._mt4NickName;
        }

        var showAccinfo = (this._mt4Id && this._mt4Id.length>0);
        return (
            <div>
                <IScrollView className={this.getScrollStyle()}
                    canUpFresh={showAccinfo} canDownFresh={showAccinfo} upFresh={this.reloadData} downFresh={this.getNextPage} 
                     ref="iscroll">
                {showAccinfo? 
                <div className={styles.optional_detail}>
                    
                    <div className={styles.currency_name}>
                    <p onClick={this.showAccount}>
                        <span className={this.mergeClassName("blue", "left","font26","font_bold")}>{accName}</span>
                        {/* <span className={this.mergeClassName("c9", "left")}>(自主交易)</span> */}
                        <span className={this.mergeClassName("c9", "left")}>({typeName})</span>

                        <i className={this.mergeClassName(styles.icon_select, "mg-tp-0")}></i>
                    </p>
                        <p className={this.mergeClassName("c3", "font48", "mg-tp-42")}></p>
                    </div>
                    {/* <div className={"right"}>
                        <div className={styles.icon_account}>切换</div>
                    </div> */}
                    <div className={"clear"}></div>
                    <div className={"mg-lr-30"}>
                        {/* <span className={this.mergeClassName("left", "c9")}>跟随账号</span> */}
                    </div>
                    <div className={"clear"}></div>
                    <div className={styles.account_dt}>
                        <ul>
                            <li>
                                <p className={"font32"}>${commissionLast}</p>
                                <p className={this.mergeClassName("c9", "mg-tp-10")}>上月结算佣金</p>
                            </li>
                            <li>
                                <p className={"font32"}>{commission}</p>
                                <p className={this.mergeClassName("c9", "mg-tp-10")}>总计跟单佣金</p>
                            </li>
                        </ul>
                    </div>
                </div>:null }
               
               <div className={styles.detail_info}>
                        <CommissionList mt4Id={this._mt4Id}  accType={this._mt4AccType}forceFlag={forceFlag} updateList={this.refreshScroll} ref="commissionList"/>
                </div>
                {this._mt4Id==null || this._mt4Id.length==0 || isEmpty?
                <div style={{margin:"1.3rem .3rem 0"}}>
                        <EmptyFrame detail="跟单账号、高手账号的佣金结算将在这里展示" btnText="逛逛高手榜" btnClick={this.gotoDocumentary} />
                </div>:null
                

               }
                </IScrollView>
                {showAccount?<AccountSelect curMt4Id={this._mt4Id} selectType={2} onSelect={this.selectAccount} onClose={this.closeAccount}/>:null}

            </div>
        );
    }

}


function injectAction(){
    return {getHistoryInfo}
}

module.exports = connect(null, injectAction())(TradeFee);
