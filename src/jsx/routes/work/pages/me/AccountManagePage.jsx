import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import Confrim from '../../../../components/common/popup/Confirm';
import { connect } from 'react-redux';
import { getAccounts } from '../../actions/me/meAction';
import styles from './css/accountManagePage.less';

/********我的主页*********/
class AccountManagePage extends PageComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            accountList: [],
            showReal:false,
            showConfirm:false
        }
    }
    //获取页面名称
    getPageName() { return "账号管理页面"; }

    componentDidMount() {
        this.props.getAccounts(this, this.update)
    }

    update = (accountList) => {
        this.setState({accountList});
    }

    updateToReal = ()=>{

        let isReal = systemApi.getValue("isReal"); 
       if(isReal ==2){
            hashHistory.push("/work/me/checking");
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

    renderAccounts() {
        var { index, accountList } = this.state;
        var curMt4Id = systemApi.getValue("mt4Id");
        return accountList.map((item, i) => {
            // balance: 10006.34
            // equity: 10000
            // mt4AccType: 0
            // mt4Id: "12"
            // ratioPL: -0.0000149248
            // totalPL: 6.34
            var {mt4AccType, mt4Id,balance,equity,ratioPL,totalPL} = item;
            return (
                <div className={this.mergeClassName(styles.optional_detail, curMt4Id==mt4Id?styles.on:"")}>
                        <div className={this.mergeClassName("pd-tp-20", "mg-lr-30")}>{mt4AccType=="0"?"体验金账户":"交易账户"}</div>
                        <div className={this.mergeClassName(styles.account_dt, "mg-tp-20")}>
                            <ul>
                                <li>
                                    <p className={"font32"}>${totalPL}</p>
                                    <p className={this.mergeClassName("c9", "mg-tp-10")}>总收益</p>
                                </li>
                                <li>
                                    <p className={"font32"}>${equity}</p>
                                    <p className={this.mergeClassName("c9", "mg-tp-10")}>账户净值</p>
                                </li>
                                <li>
                                    <p className={"font32"}>${balance}</p>
                                    <p className={this.mergeClassName("c9", "mg-tp-10")}>余额</p>
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

    }


    render() {
        systemApi.log("AccountManagePage render");
        var {showReal,showConfirm} =this.state;
        let emailIsActive = systemApi.getValue("emailIsActive");
        let isReal = systemApi.getValue("isReal"); 
        let mt4Id = systemApi.getValue("mt4Id");
        let mt4AccType = systemApi.getValue("mt4AccType");
        return (
            <FullScreenView>
                <AppHeader headerName="交易账户管理" theme="transparent" />
                <Content coverHeader={true}>
                    <div className={styles.header}></div>
                    <div className={styles.account_manage}>
                        <div className={"white"}>
                            <p className={this.mergeClassName("text-al-center", "font48")}>&amp;1000.00</p>
                            <p className={this.mergeClassName("text-al-center", "mg-tp-10")}>账户总额</p>
                        </div>
                        <div className={this.mergeClassName(styles.account_dt, styles.account_list)}>
                            <ul>
                                <li>
                                    <p className={"font32"}>1999</p>
                                    <p className={"mg-tp-10"}>交易手数</p>
                                </li>
                                <li>
                                    <p className={"font32"}>$688.00</p>
                                    <p className={"mg-tp-10"}>总收益</p>
                                </li>
                                <li>
                                    <p className={"font32"}>1.00%</p>
                                    <p className={"mg-tp-10"}>总收益率</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    {this.renderAccounts()}
                    {(emailIsActive ==0 || mt4Id==null || mt4Id.length==0)?
                    <div className={styles.bottom_btn_fixed}>
                        <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}><button onClick={this.addAccount} >+添加账户</button></div>
                    </div>:null}
                    {(emailIsActive ==1 && mt4Id && mt4Id.length>0 && isReal<3)?
                    <div className={styles.bottom_btn_fixed}>
                        <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}><button onClick={this.updateToReal} >升级到真实账户</button></div>
                    </div>:null}
                    {(emailIsActive ==1 && isReal==3)?
                    <div className={styles.bottom_btn_fixed}>
                        <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}><button onClick={this.addNewAccount} >新增交易账户</button></div>
                    </div>:null}

                    
                </Content>
                {showConfirm?<Confrim onSure={this.gotoImprove} onCancel={this.closeConfirm} title="完善资料后可开通体验账号" />:null}
                {showReal?<Confrim onSure={this.gotoReal} onCancel={this.closeRealConfirm} title="根据监管要求，请先实名认证" />:null}
                {this.props.children}
            </FullScreenView>
        );
    }

}
function injectAction() {
    return { getAccounts };
}

module.exports = connect(null, injectAction())(AccountManagePage);

