import {connect} from 'react-redux';

import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';

import styles from './css/stopProfitPage.less';

/********交易主页*********/
class StopProfitPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            lossValue:"1.00",
            profitValue:"2.00"
        }
    }
    //获取页面名称
    getPageName() { return "交易_止盈止损"; }

    lossMinus = ()=>{

    }

    lossPlus = ()=>{

    }

    profitMinus = ()=>{

    }

    profitPlus = ()=>{
        
    }

    render() {
        systemApi.log("StopProfitPage render");

        var {lossValue, profitValue} = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName="修改止盈止损" />
                <Content>
                    <div className={styles.content}>
                        <div className={styles.account_dt3}>
                            <ul>
                                <li>
                                    <p className={"font36"}>$1888.00</p>
                                    <p className={this.mergeClassName("c9", "mg-tp-10")}>开仓价格</p>
                                </li>
                                <li>
                                    <p className={"font36"}>$688.00</p>
                                    <p className={this.mergeClassName("c9", "mg-tp-10")}>现在价格</p>
                                </li>
                            </ul>
                        </div>
                        <div className={"clear"}></div>
                        <div className={this.mergeClassName(styles.floor, "mg-lr-30", "mg-tp-30")}>
                            <div className={styles.tran_panel}>
                                <h1>止损价格</h1>
                                <div className={styles.tran_icon}>
                                    <div className={styles.icon_minus} onClick={this.lossMinus}></div>
                                    <div className={styles.icon_num}>{lossValue}</div>
                                    <div className={styles.icon_plus} onClick={this.lossPlus}></div>
                                </div>
                                <div className={styles.tran_total}>
                                    <span className={styles.total_span}>
                                        <span>价格≤</span>
                                        <span>1.00046</span>&nbsp;&nbsp;
                                        <span>预计亏损：</span>
                                        <span>$0.00</span>
                                    </span>
                                </div>
                            </div>
                            <div className={styles.tran_panel}>
                                <h1>止盈价格</h1>
                                <div className={styles.tran_icon}>
                                    <div className={styles.icon_minus} onClick={this.profitMinus}></div>
                                    <div className={styles.icon_num}>{profitValue}</div>
                                    <div className={styles.icon_plus} onClick={this.profitPlus}></div>
                                </div>
                                <div className={styles.tran_total}>
                                    <span className={styles.total_span}>
                                        <span>价格≥</span>
                                        <span>1.00046</span>&nbsp;&nbsp;
                                        <span>预计盈利：</span>
                                        <span>$0.00</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={this.mergeClassName("mg-lr-30", "mg-tp-30")}>
                            <p className={"font28"}>注意事项</p>
                            <p className={this.mergeClassName("c9", "mg-tp-10")}>修改止盈、止损价格，参考范围已现在的价格为准</p>
                        </div>
                    </div>
                    <div className={styles.bottom_btn_fixed}>
                        <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}><button>确认修改</button></div>
                    </div>
                </Content>
                {this.props.children}
            </FullScreenView>
        );
    }

}

function injectAction(){
    return {};
}

module.exports = connect(null, injectAction())(StopProfitPage);
