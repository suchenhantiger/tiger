import { connect } from 'react-redux';
import {getHistoryInfo} from "../../actions/trade/tradeAction";

import styles from './css/tradeFee.less';

class TradeFee extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            infoBalance:{}
        }
        this._mt4Id = systemApi.getValue("f_mt4Id");
    }

    componentDidMount() {
        if (this._mt4Id  == null || this._mt4Id .length == 0) {
            //没有账号或者账号异常

            return;
        }
        this.props.getHistoryInfo(this, { mt4Id:this._mt4Id , queryType: 1 }, (infoBalance) => {
            this.setState({ infoBalance });
        });
    }

    //渲染函数
    render() {

        var { infoBalance} = this.state;
        var { balance = "0.00",
            ratioPL = "0.00",
            totalPL = "0.00",
            totalQty = "0.00" } = infoBalance;

        return (
            <div>
                <div className={styles.blank}></div>
                {(this._mt4Id && this._mt4Id.length>0)? 
                <div className={styles.optional_detail}>
                    
                    <div className={styles.currency_name}>
                        <p>
                            <span className={this.mergeClassName("blue", "left")}>跟单账号</span>
                            <span className={this.mergeClassName("c9", "left")}></span>
                            {/* <i className={this.mergeClassName(styles.icon_select, "mg-tp-0")}></i> */}
                        </p>
                        <p className={this.mergeClassName("c3", "font48", "mg-tp-42", styles.c3)}>¥{balance}</p>
                    </div>
                    {/* <div className={"right"}>
                        <div className={styles.icon_account}>切换</div>
                    </div> */}
                    <div className={"clear"}></div>
                    <div className={"mg-lr-30"}>
                        <span className={this.mergeClassName("left", "c9")}>跟随账号</span>
                    </div>
                    <div className={"clear"}></div>
                    <div className={styles.account_dt}>
                        <ul>
                            <li>
                                <p className={"font32"}>${totalPL}</p>
                                <p className={this.mergeClassName("c9", "mg-tp-10")}>总收益</p>
                            </li>
                            <li>
                                <p className={"font32"}>{totalQty}</p>
                                <p className={this.mergeClassName("c9", "mg-tp-10")}>交易手数</p>
                            </li>
                            <li>
                                <p className={"font32"}>{ratioPL}%</p>
                                <p className={this.mergeClassName("c9", "mg-tp-10")}>收益率</p>
                            </li>
                        </ul>
                    </div>
                </div>:null }
               
                <div className={styles.placeholder_box}>
                    <p className={styles.pl_img}><img src="./images/trade/img_placeholder01.png"/> </p>
                    <p className={this.mergeClassName("mg-bt-30", "c9")}>跟单账号、高手账号的佣金结算将在这里展示</p>
                    {/* <p></p><div className={styles.copy_btn}><button>逛逛高手榜</button></div><p></p> */}
                </div>
            </div>
        );
    }

}


function injectAction(){
    return {getHistoryInfo}
}

module.exports = connect(null, injectAction())(TradeFee);
