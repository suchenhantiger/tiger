import styles from './css/complexDetail.less';
import {connect} from 'react-redux';
import {openOrder} from '../../../actions/optional/optionalAction';
import {showMessage,showConfirm,showComplete,showCertification, ERROR, SUCCESS} from '../../../../../store/actions';
import OpenSuccComplex from './OpenSuccComplex';
import BuyDialog from './BuyDialog';
import DatePicker from './DatePicker';
import InputFormate from './InputFormate';

class ComplexDetail extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);

        var {proInfo}=this.props;
        var {digits,volumeStep,minstDec,maxVolume,minVolume,prodSize,marginPercentage}=proInfo;
        this._digits = +digits;
        this._volumeStep = +volumeStep;
        this._valueStep = Math.pow(10,-this._digits);
        this._minDis = (+minstDec) * this._valueStep;
        this._minVolume=+minVolume;
        this._maxVolume =+maxVolume;
        this._marginRate = prodSize*marginPercentage;
        this._volumeDigits=0;
        this._mt4Id = systemApi.getValue("mt4Id");
        this._mt4AccType = systemApi.getValue("mt4AccType");
        if(volumeStep.indexOf(".")>-1)
            this._volumeDigits = volumeStep.split(".")[1].length;

        this.state = {
            num:this._minVolume,
            actualPrice:null,
            stopPrice:null,
            profitPrice:null,
            showIntro:false,
            showOpenSucc:false,
            showBuyDialog:false,
            deadline:null,
            trantype:true,
            tranDire:true,
            openInfo:{},
            keyBoard:false
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



    introClick = ()=>{
        this.setState({showIntro:true});
    }

    closeIntro = ()=>{
        this.setState({showIntro:false});
    }

    openSucc = ()=>{
        this.setState({showOpenSucc:true});
    }

    closeOpenSucc = ()=>{
        this.setState({showOpenSucc:false});
    }

    tradeDetail = ()=>{
        hashHistory.push("/work/trade");
    }

    plusClick =(type) =>  ()=>{
        var {price={}}=this.props;
        var {ask="--",bid="--"} = price;
        var {tranDire,trantype} =this.state;
        // this._minVolume=minVolume;
        // this._maxVolume = maxVolume;


        switch(type){
            case 1:
                var {actualPrice} = this.state;
                if(actualPrice){
                    actualPrice=(+actualPrice)+ this._valueStep ;
                }else{
                    actualPrice = (+bid)+this._minDis+ this._valueStep ;
                }
                this.setState({actualPrice:actualPrice.toFixed(this._digits)});
                
                break;
            case 2:
                var {num} = this.state;
                num=+num+this._volumeStep;
                if(num>=this._maxVolume) num =this._maxVolume;
                this.setState({num:num.toFixed(this._volumeDigits)});
                
                break;
            case 3:
                var {stopPrice} = this.state;
                if(stopPrice){//已存在
                    if(trantype){
                        stopPrice =(+stopPrice)+this._valueStep;
                        if(tranDire){
                            if(stopPrice<(ask-this._minDis)){
                                this.setState({stopPrice:stopPrice.toFixed(this._digits)});
                            }else{
                                this.setState({stopPrice:(ask-this._minDis).toFixed(this._digits)});
                            }
                          
                        }else{
                            if(stopPrice>(bid+this._minDis))
                                this.setState({stopPrice:stopPrice.toFixed(this._digits)});
                            else
                                this.setState({stopPrice:(bid+this._minDis).toFixed(this._digits)});
                        }
                          
                    }else{
                        stopPrice =(+stopPrice)+this._valueStep;
                        var {actualPrice} = this.state;
                        if(tranDire){
                            if(stopPrice<(+actualPrice-this._minDis)){
                               
                                this.setState({stopPrice:stopPrice.toFixed(this._digits)});
                            }else{
                                this.setState({stopPrice:(+actualPrice-this._minDis).toFixed(this._digits)});
                            }
                          
                        }else{
                            if(stopPrice>(+actualPrice+this._minDis))
                                this.setState({stopPrice:stopPrice.toFixed(this._digits)});
                            else
                                this.setState({stopPrice:(+actualPrice+this._minDis).toFixed(this._digits)});
                        }


                    }
                    
                    
                }else{//初始化
                    if(trantype){
                        if(tranDire){
                            stopPrice = (+ask) -this._minDis;
                        }else{
                            stopPrice = (+bid) +this._minDis;
                        }
                        this.setState({stopPrice:stopPrice.toFixed(this._digits)});
                    }else{
                        var {actualPrice} = this.state;
                        if(actualPrice){
                            if(tranDire){
                                stopPrice = (+actualPrice) -this._minDis;
                            }else{
                                stopPrice = (+actualPrice) +this._minDis;
                            }
                            this.setState({stopPrice:stopPrice.toFixed(this._digits)});
                        }               
                    }    
                }
                break;
            case 4:
                var {profitPrice} = this.state;
                if(profitPrice){//已存在
                    if(trantype){
                        profitPrice =(+profitPrice)+this._valueStep;
                        if(tranDire){
                            if(profitPrice>(ask+this._minDis)){
                                this.setState({profitPrice:profitPrice.toFixed(this._digits)});
                            }else{
                                this.setState({profitPrice:(ask+this._minDis).toFixed(this._digits)});
                            }
                          
                        }else{
                            if(profitPrice<(bid-this._minDis)){
                                this.setState({profitPrice:profitPrice.toFixed(this._digits)});
                            }else{
                                this.setState({profitPrice:(bid-this._minDis).toFixed(this._digits)});
                            }
                        }
                          
                    }else{
                        var {actualPrice} = this.state;
                        profitPrice =(+profitPrice)+this._valueStep;
                        if(tranDire){
                            if(profitPrice>(+actualPrice+this._minDis)){
                                this.setState({profitPrice:profitPrice.toFixed(this._digits)});
                            }else{
                                this.setState({profitPrice:(+actualPrice+this._minDis).toFixed(this._digits)});
                            }
                          
                        }else{
                            if(profitPrice<(+actualPrice-this._minDis)){
                                this.setState({profitPrice:profitPrice.toFixed(this._digits)});
                            }else{
                                this.setState({profitPrice:(+actualPrice-this._minDis).toFixed(this._digits)});
                            }
                        }

                    }
                    
                    
                }else{//初始化
                    if(trantype){
                        if(tranDire){
                            profitPrice = (+ask) +this._minDis;
                        }else{
                            profitPrice = (+bid) -this._minDis;
                        }
                        this.setState({profitPrice:profitPrice.toFixed(this._digits)});
                    }else{
                        var {actualPrice} = this.state;
                        if(actualPrice){
                            if(tranDire){
                                profitPrice = (+actualPrice) +this._minDis;
                            }else{
                                profitPrice = (+actualPrice) -this._minDis;
                            }
                            this.setState({profitPrice:profitPrice.toFixed(this._digits)});
                        }               
                    }    
                }
                break;

        }
       
    }
//浮点计算要特别注意
    minusClick=(type) => ()=>{
        var {price}=this.props;
        var {ask,bid} = price;
        var {tranDire,trantype} =this.state;


        switch(type){
            case 1:
                var {actualPrice} = this.state;
                if(actualPrice){
                    actualPrice=(+actualPrice)-this._valueStep;
                }else{
                    actualPrice = bid-this._minDis-this._valueStep;
                }
                this.setState({actualPrice:actualPrice>0?actualPrice.toFixed(this._digits):"0"});

                break;
            case 2:
                var {num} = this.state;
                num = +num-this._volumeStep;
                if(num<=this._minVolume) num =this._minVolume;
                this.setState({num:num.toFixed(this._volumeDigits)});
                
                break;
            case 3:
                var {stopPrice} = this.state;
                if(stopPrice){//已存在
                    if(trantype){
                        stopPrice =(+stopPrice)-this._valueStep;
                        if(tranDire){
                            this.setState({stopPrice:stopPrice.toFixed(this._digits)});
                        }else{
                            if(stopPrice>(bid+this._minDis)){
                                this.setState({stopPrice:stopPrice.toFixed(this._digits)});
                            }else{
                                this.setState({stopPrice:(bid+this._minDis).toFixed(this._digits)});
                            }
                        }
                          
                    }else{
                        stopPrice =(+stopPrice)-this._valueStep;
                        var {actualPrice} = this.state;
                        if(tranDire){
                            if(stopPrice<(+actualPrice-this._minDis)){
                               
                                this.setState({stopPrice:stopPrice.toFixed(this._digits)});
                            }else{
                                this.setState({stopPrice:(+actualPrice-this._minDis).toFixed(this._digits)});
                            }
                          
                        }else{
                            if(stopPrice>(+actualPrice+this._minDis))
                                this.setState({stopPrice:stopPrice.toFixed(this._digits)});
                            else
                                this.setState({stopPrice:(+actualPrice+this._minDis).toFixed(this._digits)});
                        }


                    }
                    
                    
                }else{//初始化
                    if(trantype){
                        if(tranDire){
                            stopPrice = (+ask) -this._minDis;
                        }else{
                            stopPrice = (+bid) +this._minDis;
                        }
                        this.setState({stopPrice:stopPrice.toFixed(this._digits)});
                    }else{
                        var {actualPrice} = this.state;
                        if(actualPrice){
                            if(tranDire){
                                stopPrice = (+actualPrice) -this._minDis;
                            }else{
                                stopPrice = (+actualPrice) +this._minDis;
                            }
                            this.setState({stopPrice:stopPrice.toFixed(this._digits)});
                        }               
                    }    
                }
                break;
            case 4:
            var {profitPrice} = this.state;
            if(profitPrice){//已存在
                if(trantype){
                    profitPrice =(+profitPrice)-this._valueStep;
                    if(tranDire){
                        if(profitPrice>(ask+this._minDis)){
                            this.setState({profitPrice:profitPrice.toFixed(this._digits)});
                        }else{
                            this.setState({profitPrice:(ask+this._minDis).toFixed(this._digits)});
                        }
                      
                    }else{
                        if(profitPrice<(bid-this._minDis)){
                            this.setState({profitPrice:profitPrice.toFixed(this._digits)});
                        }else{
                            this.setState({profitPrice:(bid-this._minDis).toFixed(this._digits)});
                        }
                    }
                      
                }else{
                    var {actualPrice} = this.state;
                    profitPrice =(+profitPrice)-this._valueStep;
                    if(tranDire){
                        if(profitPrice>(+actualPrice+this._minDis)){
                            this.setState({profitPrice:profitPrice.toFixed(this._digits)});
                        }else{
                            this.setState({profitPrice:(+actualPrice+this._minDis).toFixed(this._digits)});
                        }
                      
                    }else{
                        if(profitPrice<(+actualPrice-this._minDis)){
                            this.setState({profitPrice:profitPrice.toFixed(this._digits)});
                        }else{
                            this.setState({profitPrice:(+actualPrice-this._minDis).toFixed(this._digits)});
                        }
                    }

                }
                
                
            }else{//初始化
                if(trantype){
                    if(tranDire){
                        profitPrice = (+ask) +this._minDis;
                    }else{
                        profitPrice = (+bid) -this._minDis;
                    }
                    this.setState({profitPrice:profitPrice.toFixed(this._digits)});
                }else{
                    var {actualPrice} = this.state;
                    if(actualPrice){
                        if(tranDire){
                            profitPrice = (+actualPrice) +this._minDis;
                        }else{
                            profitPrice = (+actualPrice) -this._minDis;
                        }
                        this.setState({profitPrice:profitPrice.toFixed(this._digits)});
                    }               
                }    
            }
                break;

        }
    }

    checkComplete=(cb)=>{
        let emailIsActive = systemApi.getValue("emailIsActive");
      //  let isReal = systemApi.getValue("isReal");
        if(emailIsActive==0){
            this.props.showComplete("完善资料后可开通体验账号");
        }else{
            cb && cb();
        }
        
    }

    checkIsReal=(cb)=>{
        // let emailIsActive = systemApi.getValue("emailIsActive");
         let isReal = systemApi.getValue("isReal");
         if(emailIsActive==0){
 
         }else{
             cb && cb();
         }
         
     }

    buyClick = ()=>{
        var {price} =this.props;
        var {isClose=false}=price;
        
        this.checkComplete(()=>{
            if(isClose){
                //this.props.showMessage("error","闭市中");
                this.props.showConfirm("闭市中");
                return;
            }
            if(this._mt4AccType==2){
                this.props.showConfirm("请使用交易账户下单");
                return;
            }

            var {trantype} =this.state;
            if(trantype){
                 this.setState({showBuyDialog:true});
                
            }else{
                this.confirmSubmit();
            }
           
        });
    
      
    }

    tradeSubmit = (isChoose)=>{
        this.setState({showBuyDialog:false});
        this.confirmSubmit();
    }

    confirmSubmit = ()=>{

        
       var mt4Id = systemApi.getValue("mt4Id");
       if(mt4Id ==null || mt4Id.length==0 ){
           //没有账号或者账号异常
           this.props.showConfirm("请选择交易账号");

            return;
       }
       var {num,trantype,tranDire,stopPrice,profitPrice,actualPrice} =this.state;
        var {prodCode,price,prodName}=this.props;
        var {ask,bid,ctm} = price;
        var tradePrice = tranDire?ask:bid;
        var expireTime = null;
        if(trantype==false){
          //  expireTime =  this.refs.timePicker.getTimeStamp();
            tradePrice = actualPrice;
            if(actualPrice == null){
                this.props.showConfirm("请设置成交价格");
                return;
            }
        }
            
        
        var params={};

        if(stopPrice) params.stopPrice = stopPrice;
        if(profitPrice) params.profitPrice = profitPrice;
        if(expireTime) params.expireTime = parseInt(expireTime/1000);

        params.tradePrice=tradePrice;
        params.tradeTime=ctm;
        params.buySell=(tranDire?0:1);
        params.prodCode=prodCode;
        params.totalQty=num;
        params.mt4Id=mt4Id;
        params.openType=(trantype?0:1)
        this.props.openOrder(this,params,(success)=>{
            // hashHistory.goBack();
            if(success){
                params.prodName= prodName;
                this.setState({showOpenSucc:true,openInfo:params});
            }
      
        }); 


    }

    tradeCancel = ()=>{
        this.setState({showBuyDialog:false});
    }
    chooseTranDir=(type)=>()=>{
        this.setState({tranDire:type,stopPrice:null,profitPrice:null});
    }
    chooseTranType=(type)=>()=>{
        this.setState({trantype:type,stopPrice:null,profitPrice:null,});
    }
    numChange = (num)=>{
        this.setState({num});
    }
    stopPriceChange= (stopPrice)=>{
        this.setState({stopPrice});
    }

    actualPriceChange= (actualPrice)=>{
        this.setState({actualPrice});
    }

    profitPriceChange= (profitPrice)=>{
        this.setState({profitPrice});
    }

    defActualValue = ()=>{
        this.plusClick(1)();
    }

    defStopValue = ()=>{
      
        this.plusClick(3)();
    }

    defProfitValue = ()=>{
        
          this.plusClick(4)();
      }
    
    //渲染函数
    render(){
        systemApi.log("ComplexDetail render");
        var {showIntro, showOpenSucc, num, showBuyDialog,keyBoard,
             trantype,tranDire,
             actualPrice,
             stopPrice,
             profitPrice,openInfo
            } = this.state;

        var {price} =this.props;
        var {ask=0,bid=0,ctm,isClose=false,exchangeRate=0}=price;

        var totalMoney=0;
        if(trantype){
            totalMoney = num*exchangeRate*ask*this._marginRate;
        }else{
            if(actualPrice){
                totalMoney = num*exchangeRate*(+actualPrice)*this._marginRate;
            }else{
                totalMoney = 0;
            }
            
        }
   
        
        return(
            <div>
                <div className="mg-lr-30">
                    <div className={styles.centerTab}>
                        <ul>
                            <li className={trantype?styles.on:""} onClick={this.chooseTranType(true)}>{McIntl.message("market")}</li>
                            <li className={trantype?"":styles.on}onClick={this.chooseTranType(false)} >{McIntl.message("pending")}</li>
                        </ul>
                    </div>
                    <div style={{clear:"both"}}></div>
                    <div className={styles.tran_type}>
                      <div className={styles.hq_label}>{trantype?McIntl.message("trade_action"):McIntl.message("pending_action")} </div>
                      <div className={styles.btn_buy_bottom +" "+styles.btn_buy_sm+" "+(tranDire?styles.on:"")} onClick={this.chooseTranDir(true)}>
                          <span>{McIntl.message("buy")+" "}</span>
                          <span className={styles.font_arial}>{ask.toFixed(this._digits)}</span>
                      </div>
                      <div className={styles.btn_sell_bottom +" "+styles.btn_sell_sm+" "+(tranDire?"":styles.on)} onClick={this.chooseTranDir(false)}>
                          <span>{McIntl.message("sell")+" "}</span>
                          <span className={styles.font_arial}>{bid.toFixed(this._digits)}</span>
                      </div>
                  </div>

                    {trantype?null:
                        <div className={styles.tran_panel}>
                        <h1>成交价格</h1>
                        <div className={styles.tran_icon}>
                            <div className={styles.icon_minus} onClick={this.minusClick(1)}></div>
                            <div className={styles.icon_num}>
                            <InputFormate
                                getDefault={this.defActualValue}
                                valueChange={this.actualPriceChange}
                                value={actualPrice} 
                                digit={this._digits}  />

                            </div>
                            <div className={styles.icon_plus} onClick={this.plusClick(1)}></div>
                        </div>
                        <div className={styles.tran_total}>
                            <span className={styles.total_span}>
                                <span>价格(&lt;={(bid-this._minDis).toFixed(this._digits)}或&gt;={(bid+this._minDis).toFixed(this._digits)})</span>

                            </span>
                        </div>
                        </div>
                    }
                   

                    <div className={styles.tran_panel}>
                        <h1>{McIntl.message("lots")}</h1>
                        <div className={styles.tran_icon}>
                            <div className={styles.icon_minus} onClick={this.minusClick(2)}></div>
                            <div className={styles.icon_num}>
                            <InputFormate 
                                valueChange={this.numChange}
                                value={num} 
                                minValue={this._minVolume} 
                                maxValue={this._maxVolume} 
                                digit={this._volumeDigits}  />
                            </div>
                            
                            <div className={styles.icon_plus} onClick={this.plusClick(2)}></div>
                        </div>
                        <div className={styles.tran_total}>
                            <span className={styles.total_span}>
                                <span>预计保证金：</span>
                                <span>${totalMoney.toFixed(2)}</span>&nbsp;&nbsp;
                             {/*    <span>可用保证金：</span>
                                <span>$0.00</span> */}
                            </span>
                        </div>
                    </div>
                    <div className={styles.tran_panel}>
                        <h1>{McIntl.message("slp")}</h1>
                        <div className={styles.tran_icon}>
                            <div className={styles.icon_minus} onClick={this.minusClick(3)}></div>
                            <div className={styles.icon_num}>
                            <InputFormate 
                                getDefault={this.defStopValue}
                                valueChange={this.stopPriceChange}
                                value={stopPrice} 
                                digit={this._digits}  />
                            
                            </div>
                            <div className={styles.icon_plus} onClick={this.plusClick(3)}></div>
                        </div>
                        <div className={styles.tran_total}>
                            <span className={styles.total_span}>
                                {trantype && tranDire?<span>价格&lt;={(ask-this._minDis).toFixed(this._digits)}</span>:null}
                                {trantype && !tranDire?<span>价格&gt;={(bid+this._minDis).toFixed(this._digits)}</span>:null}
                                {!trantype && tranDire && actualPrice?<span>价格&lt;={(+actualPrice-this._minDis).toFixed(this._digits)}</span>:null}
                                {!trantype && !tranDire && actualPrice?<span>价格&gt;={(+actualPrice+this._minDis).toFixed(this._digits)}</span>:null} 
                                {/* <span>预计亏损--</span> */}
                            </span>
                        </div>
                    </div>
                    <div className={styles.tran_panel}>
                        <h1>{McIntl.message("tpp")}</h1>
                        <div className={styles.tran_icon}>
                            <div className={styles.icon_minus} onClick={this.minusClick(4)}></div>
                            <div className={styles.icon_num}>
                            <InputFormate 
                                getDefault={this.defProfitValue}
                                valueChange={this.profitPriceChange}
                                value={profitPrice} 
                                digit={this._digits}  />
                            </div>
                            <div className={styles.icon_plus} onClick={this.plusClick(4)}></div>
                        </div>
                        <div className={styles.tran_total}>
                            <span className={styles.total_span}>
                                {trantype && tranDire?<span>价格&gt;={(ask+this._minDis).toFixed(this._digits)}</span>:null}
                                {trantype && !tranDire?<span>价格&lt;={(bid-this._minDis).toFixed(this._digits)}</span>:null} 
                                {!trantype && tranDire && actualPrice?<span>价格&gt;={(+actualPrice+this._minDis).toFixed(this._digits)}</span>:null}
                                {!trantype && !tranDire && actualPrice?<span>价格&lt;={(+actualPrice-this._minDis).toFixed(this._digits)}</span>:null} 
                                {/* <span>预计盈利--</span> */}
                            </span>
                        </div>
                    </div>
                    {/* {trantype?
                    null:
                    <div className={styles.tran_panel}>
                        <h1>{McIntl.message("deadline")}</h1>
                        <div className={styles.tran_time}>
                            <DatePicker ref="timePicker" minTime={ctm} />  
                        
                        </div>
                    </div>
                    } */}
                    
                    <div style={{height:"1.5rem"}}>
                    </div>
                </div>

                {keyBoard?null:
                <div className={styles.bottom_btn_fixed}>
                    <div className={styles.mybtn_buy_bottom}  onClick={this.buyClick}>
                        <div className={styles.confirm} style={isClose || this._mt4AccType==2?{backgroundColor:"#b6b6b6"}:null}>{trantype?McIntl.message("confirm_trade"):McIntl.message("confirm_hang")}</div>
                    </div>
                </div>
                }
                

                {showOpenSucc?(
                    <OpenSuccComplex data={openInfo} onClose={this.closeOpenSucc} onSure={this.tradeDetail}/>
                ):null}
                {showBuyDialog?(
                    <BuyDialog direction={tranDire==0} num={num} onSure={this.tradeSubmit} onCancel={this.tradeCancel}/>
                ):null}

                 
            </div>
        );
    }

}
function injectProps(state){
    var {accountArr} =state.base ||{};
    return {accountArr};
}
function injectAction(){
    return {openOrder,showComplete,showCertification,showMessage,showConfirm};
}

module.exports = connect(null,injectAction())(ComplexDetail);