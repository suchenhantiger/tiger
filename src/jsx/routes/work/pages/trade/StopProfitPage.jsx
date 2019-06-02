import {connect} from 'react-redux';

import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import InputFormate from '../../components/optional/detail/InputFormate';
import styles from './css/stopProfitPage.less';
import Confirm from '../../../../components/common/popup/Confirm';
/********交易主页*********/
class StopProfitPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
     
        var { 
            digits,minstDec,buySell,profitPrice,stopPrice
         }=this.props.prodInfo;
         this._buySell = buySell;
         this._digits = +digits;
         this._valueStep = Math.pow(10,-this._digits);
         this._minDis = (+minstDec) * this._valueStep;

         if(profitPrice==null|| profitPrice==0){
            profitPrice=null;
         }else{
            profitPrice= profitPrice.toFixed(this._digits);
         }
         if(stopPrice==null || stopPrice==0){
            stopPrice=null;
         }else{
            stopPrice =stopPrice.toFixed(this._digits);
         }

         


         this.state = {
            stopPrice,
            profitPrice,
            keyBoard:false,
            showConfirm:false
        }





    }

    componentDidMount(){
        var g_deviceMessage=systemApi.getDeviceMessage();
        if(g_deviceMessage.isAndroid)
            window.addEventListener("resize", this.onResize);
    }

    componentWillUnmount(){
        super.componentWillUnmount();
        var g_deviceMessage=systemApi.getDeviceMessage();
        if(g_deviceMessage.isAndroid)
            window.removeEventListener("resize", this.onResize);
     
    }


    //界面尺寸变化回调
    onResize = ()=>{
        var {activeElement} = document,
            {tagName} = activeElement,
            {availHeight} = screen,
            {innerHeight} = window;

        if(availHeight-innerHeight > 100)
            this.setState({keyBoard:true});
        else
            this.setState({keyBoard:false});
        if(tagName=="INPUT" || tagName=="TEXTAREA") {
           window.setTimeout(function() {
               activeElement.scrollIntoViewIfNeeded(true);
           },0);
        }
    }



    //获取页面名称
    getPageName() { return "交易_止盈止损"; }

    plusClick =(type) =>  ()=>{
        var { 
            marketPrice=0
         }=this.props.prodInfo;
         var {price} = this.props;

         var {ask, bid} =price;
         if(ask && bid){
             marketPrice = this._buySell==1?ask:bid;
        }

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
         var {price} = this.props;

         var {ask, bid} =price;
         if(ask && bid){
             marketPrice = this._buySell==1?ask:bid;
        }

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
        this.setState({showConfirm:true});

    }

    stopPriceChange= (stopPrice)=>{
        this.setState({stopPrice});
    }


    profitPriceChange= (profitPrice)=>{
        this.setState({profitPrice});
    }

    defStopValue=()=>{
        this.plusClick(1)();
    }

    defProfitValue=()=>{
        this.plusClick(2)();
    }

    onSureConfirm =()=>{
        this.setState({showConfirm:false});
        var {stopPrice,profitPrice} = this.state;
        var {onSure}=this.props;
        var tmpLoss = null;
        if(stopPrice!=0)  tmpLoss=stopPrice;
        var tmpProfit = null;
        if(profitPrice!=0)  tmpProfit=profitPrice;
        onSure && onSure(tmpLoss,tmpProfit);
  
    } 
    onCancelConfirm =()=>{
        this.setState({showConfirm:false});
    }



    render() {
        systemApi.log("StopProfitPage render");

        var {stopPrice, showConfirm,profitPrice,keyBoard} = this.state;

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
                                    <div className={styles.icon_num}>
                                    <InputFormate
                                        getDefault={this.defStopValue}
                                        valueChange={this.stopPriceChange}
                                        value={stopPrice} 
                                        digit={this._digits}  />
                                    </div>
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
                                    <div className={styles.icon_num}>
                                    <InputFormate 
                                        getDefault={this.defProfitValue}
                                        valueChange={this.profitPriceChange}
                                        value={profitPrice} 
                                        digit={this._digits}  />
                                    
                                    </div>
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
                            <p className={this.mergeClassName("c9", "mg-tp-10")}>修改止盈、止损价格，参考范围以现在的价格为准</p>
                        </div>
                    </div>
                    {keyBoard?null:
                    <div className={styles.bottom_btn_fixed}>
                        <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}><button onClick={this.onCommit}>确认修改</button></div>
                    </div>
                    
                    }
                    {showConfirm?
                    <Confirm onSure={this.onSureConfirm} onCancel={this.onCancelConfirm}>
                        <div>
                            <p className="font30 mg-bt-30 center">您确定要修改止盈止损价格吗？</p>
                        </div>
                    </Confirm>:null}
                    
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


