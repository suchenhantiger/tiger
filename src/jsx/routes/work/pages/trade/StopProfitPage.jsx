import {connect} from 'react-redux';

import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';

import styles from './css/stopProfitPage.less';

/********交易主页*********/
class StopProfitPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            stopPrice:null,
            profitPrice:null
        }

        var { 
            digits,minstDec,buySell
         }=this.props.prodInfo;
         this._buySell = buySell;

         this._digits = +digits;
         this._valueStep = Math.pow(10,-this._digits);
         this._minDis = (+minstDec) * this._valueStep;

    }
    //获取页面名称
    getPageName() { return "交易_止盈止损"; }

    plusClick =(type) =>  ()=>{
        var { 
            marketPrice=0
         }=this.props.prodInfo;
         marketPrice = +marketPrice;

        switch(type){
            case 1:
            var {stopPrice} = this.state;
            if(stopPrice){//已存在
                
                stopPrice =(+stopPrice)+this._valueStep;
                if(this._buySell==0){
                    if(stopPrice<(marketPrice-this._minDis)){
                        this.setState({stopPrice:stopPrice.toFixed(this._digits)});
                    }else{
                        this.setState({stopPrice:(marketPrice-this._minDis).toFixed(this._digits)});
                    }
                    
                }else{
                    if(stopPrice>(marketPrice+this._minDis))
                        this.setState({stopPrice:stopPrice.toFixed(this._digits)});
                    else
                        this.setState({stopPrice:(marketPrice+this._minDis).toFixed(this._digits)});
                }
           
            }else{//初始化
                
                    if(this._buySell==0){
                        stopPrice = (+marketPrice) -this._minDis;
                    }else{
                        stopPrice = (+marketPrice) +this._minDis;
                    }
                    this.setState({stopPrice:stopPrice.toFixed(this._digits)});
                   
            }
                break;
            case 2:
            var {profitPrice} = this.state;
            if(profitPrice){//已存在
                    profitPrice =(+profitPrice)+this._valueStep;
                    if(this._buySell==0){
                        if(profitPrice>(marketPrice+this._minDis)){
                            this.setState({profitPrice:profitPrice.toFixed(this._digits)});
                        }else{
                            this.setState({profitPrice:(marketPrice+this._minDis).toFixed(this._digits)});
                        }
                      
                    }else{
                        if(profitPrice<(marketPrice-this._minDis)){
                            this.setState({profitPrice:profitPrice.toFixed(this._digits)});
                        }else{
                            this.setState({profitPrice:(marketPrice-this._minDis).toFixed(this._digits)});
                        }
                    }
  
            }else{//初始化
                    if(this._buySell==0){
                        profitPrice = (+marketPrice) +this._minDis;
                    }else{
                        profitPrice = (+marketPrice) -this._minDis;
                    }
                    this.setState({profitPrice:profitPrice.toFixed(this._digits)});
                   
            }
                break;
        }
       
    }

    minusClick=(type) => ()=>{
        var { 
            marketPrice=0
         }=this.props.prodInfo;
         marketPrice = +marketPrice;

        switch(type){
            case 1:
            var {stopPrice} = this.state;
            if(stopPrice){//已存在
                
                stopPrice =(+stopPrice)-this._valueStep;
                if(this._buySell==0){
                    if(stopPrice<(marketPrice-this._minDis)){
                        this.setState({stopPrice:stopPrice.toFixed(this._digits)});
                    }else{
                        this.setState({stopPrice:(marketPrice-this._minDis).toFixed(this._digits)});
                    }
                    
                }else{
                    if(stopPrice>(marketPrice+this._minDis))
                        this.setState({stopPrice:stopPrice.toFixed(this._digits)});
                    else
                        this.setState({stopPrice:(marketPrice+this._minDis).toFixed(this._digits)});
                }
           
            }else{//初始化
                
                    if(this._buySell==0){
                        stopPrice = (+marketPrice) -this._minDis;
                    }else{
                        stopPrice = (+marketPrice) +this._minDis;
                    }
                    this.setState({stopPrice:stopPrice.toFixed(this._digits)});
                   
            }
                break;
            case 2:
            var {profitPrice} = this.state;
            if(profitPrice){//已存在
                    profitPrice =(+profitPrice)-this._valueStep;
                    if(this._buySell==0){
                        if(profitPrice>(marketPrice+this._minDis)){
                            this.setState({profitPrice:profitPrice.toFixed(this._digits)});
                        }else{
                            this.setState({profitPrice:(marketPrice+this._minDis).toFixed(this._digits)});
                        }
                      
                    }else{
                        if(profitPrice<(marketPrice-this._minDis)){
                            this.setState({profitPrice:profitPrice.toFixed(this._digits)});
                        }else{
                            this.setState({profitPrice:(marketPrice-this._minDis).toFixed(this._digits)});
                        }
                    }
  
            }else{//初始化
                    if(this._buySell==0){
                        profitPrice = (+marketPrice) +this._minDis;
                    }else{
                        profitPrice = (+marketPrice) -this._minDis;
                    }
                    this.setState({profitPrice:profitPrice.toFixed(this._digits)});
                   
            }
                break;
        }
       
    }


    closeEdit =()=>{
        var {onClose} =this.props;
        onClose && onClose();
    }

    onCommit =()=>{
        var {stopPrice,profitPrice} = this.state;
        var {onSure}=this.props;
        var tmpLoss = null;
        if(stopPrice!=0)  tmpLoss=stopPrice;
        var tmpProfit = null;
        if(profitPrice!=0)  tmpProfit=profitPrice;
        onSure && onSure(tmpLoss,tmpProfit);

    }



    render() {
        systemApi.log("StopProfitPage render");

        var {stopPrice, profitPrice} = this.state;

        var {prodInfo,price}=this.props;
        var { 
           marketPrice,
            openPrice="--"
        }=prodInfo;

        var {ask, bid} =price
        if(ask && bid){
            marketPrice = this._buySell==1?ask:bid;
       }
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
                                    <div className={styles.icon_num}>{stopPrice?stopPrice:"未设置"} </div>
                                    <div className={styles.icon_plus} onClick={this.plusClick(1)}></div>
                                </div>
                                <div className={styles.tran_total}>
                                    <span className={styles.total_span}>
                                    {this._buySell==0?<span>价格≤{(+marketPrice-this._minDis).toFixed(this._digits)}</span>
                                    :<span>价格≥{(marketPrice+this._minDis).toFixed(this._digits)}</span>
                                    }
                                    
                                        {/* <span>预计亏损：</span>
                                        <span>$--</span> */}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.tran_panel}>
                                <h1>止盈价格</h1>
                                <div className={styles.tran_icon}>
                                    <div className={styles.icon_minus} onClick={this.minusClick(2)}></div>
                                    <div className={styles.icon_num}>{profitPrice?profitPrice:"未设置"}</div>
                                    <div className={styles.icon_plus} onClick={this.plusClick(2)}></div>
                                </div>
                                <div className={styles.tran_total}>
                                    <span className={styles.total_span}>
                                    {this._buySell==0?<span>价格≥{(+marketPrice+this._minDis).toFixed(this._digits)}</span>
                                    :<span>价格≤{(marketPrice-this._minDis).toFixed(this._digits)}</span>
                                    }
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


