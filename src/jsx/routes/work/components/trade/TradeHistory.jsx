import { connect } from 'react-redux';
import {getHistoryInfo,} from "../../actions/trade/tradeAction";

import HistoryList from './HistoryList';

import styles from './css/tradeHistory.less';

class TradeHistory extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            infoBalance:{}
        }
    }

    componentDidMount(){
        //持仓详情
              //持仓详情
        var mt4Id = systemApi.getValue("mt4Id");
        if(mt4Id ==null || mt4Id.length==0 ){
            //没有账号或者账号异常

            return;
        }
        this.props.getHistoryInfo(this, {mt4Id,queryType:1}, (infoBalance)=>{
            this.setState({infoBalance});
        });
    }



    //渲染函数
    render() {

        var {infoBalance}=this.state;
        var {balance="--",
            ratioPL=0,
            totalPL=0,
            totalQty= 0} = infoBalance;

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
                        <p className={this.mergeClassName("c3", "font48", "mg-tp-42", styles.c3)}>${balance}</p>
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
                </div>
                <HistoryList/>
            </div>
        );
    }

}

function injectProps(state){
    var {accountArr } = state.base || {};
    return {accountArr};
}
function injectAction(){
    return {getHistoryInfo}
}

module.exports = connect(injectProps, injectAction())(TradeHistory);
