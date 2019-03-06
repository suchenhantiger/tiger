import styles from './css/withdrawal.less';

class Withdrawal extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            money: "",
            destType: "-1"
        }
    }

    typeClick = (destType) => () => {
        this.setState({ destType });
    }

    inputChange = (e) => {
        var { value } = e.target;
        this.setState({ money: value });
    }

    nextClick = ()=>{

    }
    
    //渲染函数
    render() {

        var { money, destType } = this.state;

        return (
            <div>
                <div className={this.mergeClassName("mg-lr-30", "mg-tp-42")}>
                    <div className={this.mergeClassName(styles.form_input, "mg-bt-40")}>
                        <p>
                            <span className={styles.form_label}>提现账户</span>
                            <span className={this.mergeClassName("blue", "font28")}>交易账户</span>&nbsp;
                        <span className={"c9"}>(自主交易)</span>
                        </p>
                        <p className={this.mergeClassName("mg-lt-140", "mg-tp-10")}>
                            <span className={"c9"}>当前交易账户余额：¥0.00</span>
                        </p>
                    </div>
                    <div className={this.mergeClassName(styles.form_input, "mg-bt-40")}>
                        <p><span className={styles.form_label}>提现金额</span></p>
                        <input type="text" placeholder="$" value={money} onChange={this.inputChange} />
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
            </div>

        );
    }

}

module.exports = Withdrawal;
