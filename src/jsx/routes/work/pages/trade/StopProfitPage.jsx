import {connect} from 'react-redux';

import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';

import styles from './css/stopProfitPage.less';

/********交易主页*********/
class StopProfitPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            lossValue:0,
            profitValue:0
        }
    }
    //获取页面名称
    getPageName() { return "交易_止盈止损"; }

    plusClick =(type) =>  ()=>{
        var { 
            marketPrice=0,buySell
         }=this.props.prodInfo;
         marketPrice = +marketPrice;
        // var {price}=this.props;
        // var {ask,bid} = price;
        // var {tranDire} =this.state;
        // var refPrice  = tranDire?ask:bid;
        var step=0.01;
        switch(type){
            case 1:
                var {lossValue} = this.state;
                if(lossValue==0){
                    lossValue=marketPrice+step;
                    this.setState({lossValue});
                }else{
                    lossValue += step;
                    this.setState({lossValue});
                }
                break;
            case 2:
                var {profitValue} = this.state;
                if(profitValue==0){
                    profitValue=marketPrice+step;
                    this.setState({profitValue});
                }else{
                    profitValue += step;
                    this.setState({profitValue});
                }
                break;
        }
       
    }

    minusClick=(type) => ()=>{
        var { 
            marketPrice=0,buySell
         }=this.props.prodInfo;
         marketPrice = +marketPrice;
        // var {price}=this.props;
        // var {ask,bid} = price;
        // var {tranDire} =this.state;
        // var refPrice  = tranDire?ask:bid;
        var step=0.01;
        switch(type){
            case 1:
                var {lossValue} = this.state;
                if(lossValue==0){
                    lossValue=marketPrice-step;
                    this.setState({lossValue});
                }else{
                    lossValue -= step;
                    this.setState({lossValue});
                }
                break;
            case 2:
                var {profitValue} = this.state;
                if(profitValue==0){
                    profitValue=marketPrice-step;
                    this.setState({profitValue});
                }else{
                    profitValue += step;
                    this.setState({profitValue});
                }
                break;
        }
    }


    closeEdit =()=>{
        var {onClose} =this.props;
        onClose && onClose();
    }

    onCommit =()=>{
        var {lossValue,profitValue} = this.state;
        var {onSure}=this.props;
        var tmpLoss = null;
        if(lossValue!=0)  tmpLoss=lossValue;
        var tmpProfit = null;
        if(profitValue!=0)  tmpProfit=profitValue;
        onSure && onSure(tmpLoss,tmpProfit);

    }



    render() {
        systemApi.log("StopProfitPage render");

        var {lossValue, profitValue} = this.state;

        var {prodInfo}=this.props;
        var { 
           marketPrice="--",
            openPrice="--"
        }=prodInfo;

        return (
            <FullScreenView>
                <AppHeader onBackClick={this.closeEdit} headerName="修改止盈止损" />
                <Content>
                    <div className={styles.content}>
                        <div className={styles.account_dt3}>
                            <ul>
                                <li>
                                    <p className={"font36"}>${openPrice}</p>
                                    <p className={this.mergeClassName("c9", "mg-tp-10")}>开仓价格</p>
                                </li>
                                <li>
                                    <p className={"font36"}>${marketPrice}</p>
                                    <p className={this.mergeClassName("c9", "mg-tp-10")}>现在价格</p>
                                </li>
                            </ul>
                        </div>
                        <div className={"clear"}></div>
                        <div className={this.mergeClassName(styles.floor, "mg-lr-30", "mg-tp-30")}>
                            <div className={styles.tran_panel}>
                                <h1>止损价格</h1>
                                <div className={styles.tran_icon}>
                                    <div className={styles.icon_minus} onClick={this.minusClick(1)}></div>
                                    <div className={styles.icon_num}>{lossValue==0?"未设置":lossValue} </div>
                                    <div className={styles.icon_plus} onClick={this.plusClick(1)}></div>
                                </div>
                                <div className={styles.tran_total}>
                                    <span className={styles.total_span}>
                                        <span>价格≤</span>
                                        <span>--</span>&nbsp;&nbsp;
                                        <span>预计亏损：</span>
                                        <span>$--</span>
                                    </span>
                                </div>
                            </div>
                            <div className={styles.tran_panel}>
                                <h1>止盈价格</h1>
                                <div className={styles.tran_icon}>
                                    <div className={styles.icon_minus} onClick={this.minusClick(2)}></div>
                                    <div className={styles.icon_num}>{profitValue==0?"未设置":profitValue}</div>
                                    <div className={styles.icon_plus} onClick={this.plusClick(2)}></div>
                                </div>
                                <div className={styles.tran_total}>
                                    <span className={styles.total_span}>
                                        <span>价格≥</span>
                                        <span>--</span>&nbsp;&nbsp;
                                        <span>预计盈利：</span>
                                        <span>$--</span>
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
                        <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}><button onClick={this.onCommit}>确认修改</button></div>
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
