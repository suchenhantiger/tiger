import { connect } from 'react-redux';
import {getHistoryInfo} from "../../actions/trade/tradeAction";

import styles from './css/tradeHistory.less';

class TradeHistory extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount(){
        //持仓详情
        this.props.getHistoryInfo(this, {}, this.update);
    }

    update = (data)=>{
        this.setState({});
    }

    //渲染函数
    render() {

        return (
            <div>
                <div className={styles.blank}></div>
                <div className={styles.optional_detail}>
                    <div className={styles.currency_name}>
                        <p>
                            <span className={this.mergeClassName("blue", "left")}>体验金账号</span>
                            <span className={this.mergeClassName("c9", "left")}>(自主交易)</span>
                            <i className={this.mergeClassName(styles.icon_select, "mg-tp-0")}></i>
                        </p>
                        <p className={this.mergeClassName("c3", "font48", "mg-tp-42", styles.c3)}>¥0.00</p>
                    </div>
                    <div className={"right"}>
                        <div className={styles.icon_account}>切换</div>
                    </div>
                    <div className={"clear"}></div>
                    <div className={"mg-lr-30"}>
                        <span className={this.mergeClassName("left", "c9")}>交易账户</span>
                    </div>
                    <div className={"clear"}></div>
                    <div className={styles.account_dt}>
                        <ul>
                            <li>
                                <p className={"font32"}>$1888.00</p>
                                <p className={this.mergeClassName("c9", "mg-tp-10")}>总收益</p>
                            </li>
                            <li>
                                <p className={"font32"}>o.05</p>
                                <p className={this.mergeClassName("c9", "mg-tp-10")}>交易手数</p>
                            </li>
                            <li>
                                <p className={"font32"}>1.00%</p>
                                <p className={this.mergeClassName("c9", "mg-tp-10")}>收益率</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

}


function injectAction(){
    return {getHistoryInfo}
}

module.exports = connect(null, injectAction())(TradeHistory);
