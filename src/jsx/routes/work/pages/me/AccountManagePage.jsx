import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import Confrim from '../../../../components/common/popup/Confirm';
import { connect } from 'react-redux';
import { getAccounts,updateAcc,openMt4Acc } from '../../actions/me/meAction';
import {showConfirmWithCb} from '../../../../store/actions';
import styles from './css/accountManagePage.less';
import NewAccDialog from '../../components/me/NewAccDialog';
import ChangeAccDialog from '../../components/me/ChangeAccDialog';

/********我的主页*********/
class AccountManagePage extends PageComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            accountList: [],
            balances:"0.00",ratioPLs:"0.00",totalPLs:"0.00",totalQtys:"0.00",
            showReal:false,
            showConfirm:false,
            newAccConfirm:false,
            showUpdate:false
        }
    }
    //获取页面名称
    getPageName() { return "账号管理页面"; }

    componentDidMount() {
        this.props.getAccounts(this, this.update)
    }

    update = (mt4Info) => {
        var {balances,ratioPLs,totalPLs,totalQtys,mt4Accs } = mt4Info;
        this.setState({balances,ratioPLs,totalPLs,totalQtys,accountList:mt4Accs});
    }

    updateToReal = ()=>{

        let isReal = systemApi.getValue("isReal"); 
       if(isReal ==2){
            hashHistory.push("/work/me/certification");
       }else
            this.setState({showReal:true});
        //hashHistory.push();
    }

    addRealAccount=()=>{
        hashHistory.push("/work/me/certification");
        //this.setState({showReal:true});
    }

    closeRealConfirm =()=>{
        this.setState({showReal:false});
    }

    closeNewAcc =()=>{
        this.setState({newAccConfirm:false});
    }

    newAcc =(nickName)=>{
        this.props.openMt4Acc(this,nickName,()=>{
            this.setState({newAccConfirm:false});
            this.props.showConfirmWithCb("添加交易账号成功",()=>{
                this.props.getAccounts(this, this.update);
            });
            
        });
        
    }

    gotoReal=()=>{
        hashHistory.push("/work/me/certification");
    }

    // addRealAccount=()=>{
    //     hashHistory.push("/work/me/certification");
    //     //this.setState({showReal:true});
    // }
    gotoImprove=()=>{
        this.setState({showConfirm:false});
        hashHistory.push("/work/improve");
    }

    closeConfirm =()=>{
        this.setState({showConfirm:false});
    }

    showUndateAcc =(mt4Id,accName,mt4AccType)=>()=>{
        this._mt4Id=mt4Id;
        this._accName = accName;
        this._mt4AccType = mt4AccType;

        this.setState({showUpdate:true});
    }
    
    updateAcc =(nickName,mt4Id)=>{//accType
        this.props.updateAcc(this,{accType:1,nickName,mt4Id},()=>{
            this.setState({showUpdate:false});
            this.props.getAccounts(this, this.update);
        });
    }
    hideUndateAcc =()=>{
        this.setState({showUpdate:false});
    }
    

    changeMt4= (mt4Id,mt4AccType,mt4NickName)=>()=>{
        systemApi.setValue("mt4AccType", mt4AccType);
        systemApi.setValue("mt4Id", mt4Id);
        systemApi.setValue("mt4NickName", mt4NickName);
        
        this.forceUpdate();
    }

    renderAccounts() {
        var { index, accountList} = this.state;
        var curMt4Id = systemApi.getValue("mt4Id");
        return accountList.map((item, i) => {
            var {mt4AccType, mt4Id,equity,floatPL,freeMargin,ratioMargin,usedMargin,mt4NickName} = item;
            var accName = "--";
            var typeName ="";
            if(mt4Id ==null || mt4Id==0 ){
                //没有账号或者账号异常
    
            }else if(mt4NickName){
                accName =mt4NickName;
                typeName="自主交易"
             }
            else if(mt4AccType==0){
                accName ="体验金账户";
                typeName="体验账户";
            }else if(mt4AccType==1){
                accName ="交易账户";
                typeName="自主交易"
            }else if(mt4AccType==2){
                accName ="跟单账户";
                typeName="跟随账户";
            }else if(mt4AccType==3){
                accName ="高手账户";
                typeName="高手账户";
            }
            return (//    icon-instruction-black
                <div className={this.mergeClassName(styles.optional_detail, curMt4Id==mt4Id?styles.on:"")} onClick={this.changeMt4(mt4Id,mt4AccType,mt4NickName)}>
                        <div className={this.mergeClassName("font30","pd-tp-20", "mg-lr-30")}>
                            {accName}<span className={styles.acctype}>{typeName}</span><i className={styles.write} onClick={this.showUndateAcc(mt4Id,accName,mt4AccType)} />
                            
                        </div>
                        <div className={this.mergeClassName(styles.account_dt, "mg-tp-20")}>
                            <ul>
                                <li>
                                    <p className={"font32"}>${floatPL}</p>
                                    <p className={this.mergeClassName("c9", "mg-tp-10")}>浮动盈亏</p>
                                </li>
                                <li>
                                    <p className={"font32"}>${equity}</p>
                                    <p className={this.mergeClassName("c9", "mg-tp-10")}>净值</p>
                                </li>
                                <li>
                                    <p className={"font32"}>{ratioMargin}%</p>
                                    <p className={this.mergeClassName("c9", "mg-tp-10")}>保证金比例</p>
                                </li>
                            </ul>
                        </div>
                    </div>
            )
        })
    }

    addAccount=()=>{
        this.setState({showConfirm:true});
    }

    addNewAccount=()=>{
        this.setState({newAccConfirm:true});
        

    }


    render() {
        systemApi.log("AccountManagePage render");
        var {showUpdate,showReal,showConfirm,newAccConfirm,balances,ratioPLs,totalPLs,totalQtys,} =this.state;
        let emailIsActive = systemApi.getValue("emailIsActive");
        let isReal = systemApi.getValue("isReal"); 
        let mt4Id = systemApi.getValue("mt4Id");
        let mt4AccType = systemApi.getValue("mt4AccType");
        return (
            <FullScreenView>
                <AppHeader headerName="交易账户管理" theme="makecaptail" />
                <Content coverHeader={true} coverBottom={false}>
                    <div className={styles.header}></div>
                    <div className={styles.account_manage}>
                        <div className={"white"}>
                            <p className={this.mergeClassName("text-al-center", "font48")}>${balances}</p>
                            <p className={this.mergeClassName("text-al-center", "mg-tp-10")}>账户总额</p>
                        </div>
                        <div className={this.mergeClassName(styles.account_dt, styles.account_list)}>
                            <ul>
                                <li>
                                    <p className={"font32"}>{totalQtys}</p>
                                    <p className={"mg-tp-10"}>交易手数</p>
                                </li>
                                <li>
                                    <p className={"font32"}>${totalPLs}</p>
                                    <p className={"mg-tp-10"}>总收益</p>
                                </li>
                                <li>
                                    <p className={"font32"}>{ratioPLs}%</p>
                                    <p className={"mg-tp-10"}>总收益率</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {this.renderAccounts()}
                  

                    
                </Content>
                
                    {(emailIsActive ==0 || mt4Id==null || mt4Id.length==0)?
                    <div className={styles.bottom_btn_fixed}>
                        <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}><button onClick={this.addAccount} >+添加账户</button></div>
                    </div>:null}
                    {(emailIsActive ==1 && mt4Id && mt4Id.length>0 && isReal<3)?
                    <div className={styles.bottom_btn_fixed}>
                        <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}><button onClick={this.updateToReal} >开通真实账户</button></div>
                    </div>:null}
                    {(emailIsActive ==1 && isReal==3)?
                    <div className={styles.bottom_btn_fixed}>
                        <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}><button onClick={this.addNewAccount} >添加交易账户</button></div>
                    </div>:null}
                {showConfirm?<Confrim onSure={this.gotoImprove} onCancel={this.closeConfirm} title="完善资料后可开通体验账号" />:null}
                {showReal?<Confrim onSure={this.gotoReal} onCancel={this.closeRealConfirm} title="根据监管要求，请先实名认证" />:null}
                {newAccConfirm?<NewAccDialog onSure={this.newAcc} onCancel={this.closeNewAcc} title="根据监管要求，请先实名认证" />:null}
                {showUpdate?<ChangeAccDialog      mt4Id= {this._mt4Id} accType={this._mt4AccType}
                                accName={this._accName} onSure={this.updateAcc} onCancel={this.hideUndateAcc} title="" />:null}
                
            </FullScreenView>
        );
    }

}
function injectAction() {
    return { getAccounts ,updateAcc,openMt4Acc,showConfirmWithCb};
}

module.exports = connect(null, injectAction())(AccountManagePage);

//  