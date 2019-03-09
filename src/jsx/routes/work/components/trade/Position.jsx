import { connect } from 'react-redux';
import {getPositionInfo} from "../../actions/trade/tradeAction";
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';
import PositionList from "./PositionList";
import PositionAllList from "./PositionAllList";

import styles from './css/position.less';

class Position extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            subIndex:0
        }
    }

    componentDidMount(){
        //持仓详情
        this.props.getPositionInfo(this, {}, this.update);
    }

    update = (data)=>{
        this.setState({});
    }

    tabClick = (subIndex)=>()=>{
        this.setState({subIndex});
    }

    //渲染函数
    render() {

        var {subIndex} = this.state;

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
                        <span className={this.mergeClassName("left", "c9")}>浮动盈亏</span>
                        <span className={this.mergeClassName("right", "blue")}>充值/提现</span>
                    </div>
                    <div className={"clear"}></div>
                    <div className={styles.account_dt}>
                        <ul>
                            <li>
                                <p className={"font32"}>$1888.00</p>
                                <p className={this.mergeClassName("c9", "mg-tp-10")}>可用保证金</p>
                            </li>
                            <li>
                                <p className={"font32"}>$1888.00</p>
                                <p className={this.mergeClassName("c9", "mg-tp-10")}>已用保证金</p>
                            </li>
                            <li>
                                <p className={"font32"}>1.00%</p>
                                <p className={this.mergeClassName("c9", "mg-tp-10")}>保证金比例</p>
                            </li>
                            <li>
                                <p className={"font32"}>1.00%</p>
                                <p className={this.mergeClassName("c9", "mg-tp-10")}>账户净值</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.detail_info}>
                    <div className={this.mergeClassName("center", styles.hd_tabs, "mg-tp-20")}>
                        <span className={subIndex==0?styles.on:""} onClick={this.tabClick(0)}>全部订单<i></i></span>
                        <span className={subIndex==1?styles.on:""} onClick={this.tabClick(1)}>自主持仓<i></i></span>
                        <span className={subIndex==2?styles.on:""} onClick={this.tabClick(2)}>挂单交易<i></i></span>
                    </div>
                    <LazyLoad index={subIndex}>
                        <PositionAllList/>
                        <PositionList/>
                    </LazyLoad>
                </div>
            </div>
        );
    }

}

function injectAction(){
    return {getPositionInfo}
}

module.exports = connect(null, injectAction())(Position);
