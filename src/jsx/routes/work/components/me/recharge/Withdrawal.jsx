import styles from './css/withdrawal.less';
import AccountSelect from '../AccountSelect';
class Withdrawal extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            money: "",
            destType: "-1",
            showAccount:false
        };
        this.mt4NickName=null;
        this.mt4Id=null;
        this.mt4AccType=null;
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
            }

        }
        this.mt4NickName=mt4NickName;
        this.mt4Id=mt4Id;
        this.mt4AccType=mt4AccType;
        this.setState({showAccount:false});

    }

    openPayDest = ()=>{
        this.setState({showAccount:true})
    }
    numFormate =(e)=>{
        var { value } = e.target;
        this.setState({money:(+value).toFixed(2)});
    }
    //渲染函数
    render() {

        var { money, destType,showAccount } = this.state;

        return (
            <div>
                <div className={this.mergeClassName("mg-lr-30", "mg-tp-42")}>
                    <div className={this.mergeClassName(styles.form_input, "mg-bt-40")}>
                        <p>
                            <span className={styles.form_label}>提现账户</span>
                            <span className={this.mergeClassName("blue", "font28")} onClick={this.openPayDest}>{this.mt4NickName||"请选择"}</span>&nbsp;
                            {this.typeName?<span className={"c9"}>({this.typeName})</span>:null}
                        </p>
                        <p className={this.mergeClassName("mg-lt-140", "mg-tp-10")}>
                            <span className={"c9"}>当前交易账户余额：¥0.00</span>
                        </p>
                    </div>
                    <div className={this.mergeClassName(styles.form_input, "mg-bt-40")}>
                        <p><span className={styles.form_label}>提现金额</span></p>
                        <input type="text" placeholder="$" value={money}  onBlur={this.numFormate } onChange={this.inputChange} />
                    </div>
                    <div className={this.mergeClassName(styles.form_input, "mg-bt-40")}>
                        <span className={"red"}>开通真实账户后未入金，无法提现&gt;</span>
                    </div>
                    <div className={this.mergeClassName(styles.form_input, "mg-bt-40")}>
                        <p><span className={styles.form_label}>提现到</span></p>
                        <div className={"clear"}></div>
                        <div className={this.mergeClassName(styles.account_cs, "mg-tp-20")}>
                            <ul>
                                <li className={destType == "0" ? styles.on : ""} onClick={this.typeClick("0")}>
                                    <p className={"mg-tb-20"}><span>银行账户</span></p>
                                </li>
                                <li className={destType == "1" ? styles.on : ""} onClick={this.typeClick("1")}>
                                    <p className={"mg-tb-20"}><span>钱包</span></p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom_btn_fixed}>
                    <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}><button onClick={this.nextClick}>下一步</button></div>
                </div>
                {showAccount?<AccountSelect showOn={false} selectType={1} onSelect={this.selectAccount} onClose={this.closeAccount}/>:null}

            </div>

        );
    }

}

module.exports = Withdrawal;
