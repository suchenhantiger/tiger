import styles from './css/complexDetail.less';
import {connect} from 'react-redux';
import {openOrder} from '../../../actions/optional/optionalAction';
import {showMessage, ERROR, SUCCESS} from '../../../../../store/actions';

import DatePicker from './DatePicker';


class ComplexDetail extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);

        var {proInfo}=this.props;
        var {digits,volumeStep,minstDec,maxVolume,minVolume}=proInfo;
        this._digits = +digits;
        this._volumeStep = +volumeStep;
        this._valueStep = Math.pow(10,-this._digits);
        this._minDis = (+minstDec) * this._valueStep;
        this._minVolume=+minVolume;
        this._maxVolume =+maxVolume;
        this._volumeDigits=0;
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
                        profitPrice =(+profitPrice)+this._valueStep;
                        if(tranDire){
                            if(profitPrice>(+actualPrice+this._minDis)){
                                this.setState({profitPrice:profitPrice.toFixed(this._digits)});
                            }else{
                                this.setState({profitPrice:(ask+this._minDis).toFixed(this._digits)});
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

    buyClick = ()=>{
       // this.setState({showBuyDialog:true});
       var mt4Id = systemApi.getValue("mt4Id");
       if(mt4Id ==null || mt4Id.length==0 ){
           //没有账号或者账号异常
           this.props.showMessage(ERROR,"请选择交易账号");

            return;
       }
        var {prodCode,price}=this.props;
        
        var {num,trantype,tranDire,stopPrice,profitPrice,actualPrice} =this.state;
        var {ask,bid,ctm} = price;
        var tradePrice = tranDire?ask:bid;
        var expireTime = null;
        if(trantype==false){
            expireTime =  this.refs.timePicker.getTimeStamp();
            tradePrice = actualPrice;
            if(actualPrice == null){
                this.props.showMessage(ERROR,"请设置成交价格");
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
        this.props.openOrder(this,params,()=>{
            // hashHistory.goBack();
        }); 

    }

    tradeSubmit = (isChoose)=>{
        this.setState({showBuyDialog:false});
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
    //渲染函数
    render(){
        systemApi.log("ComplexDetail render");
        var {showIntro, showOpenSucc, num, actualPrice, showBuyDialog,
             trantype,tranDire,
             actualPrice,
             stopPrice,
             profitPrice
            } = this.state;

        var {price} =this.props;
        var {ask="--",bid="--",ctm,isClose=false}=price;
        return(
            <div>
                <div className="mg-lr-30">
                    <div className={styles.centerTab}>
                        <ul>
                            <li className={trantype?styles.on:""} onClick={this.chooseTranType(true)}>市价交易</li>
                            <li className={trantype?"":styles.on}onClick={this.chooseTranType(false)} >挂单交易</li>
                        </ul>
                    </div>
                    <div style={{clear:"both"}}></div>
                    <div className={styles.tran_type}>
                      <div className={styles.hq_label}>{trantype?"交易类型":"挂单类型"} </div>
                      <div className={styles.btn_buy_bottom +" "+styles.btn_buy_sm+" "+(tranDire?styles.on:"")} onClick={this.chooseTranDir(true)}>
                          <span>买</span>
                          <span className={styles.font_arial}>{ask}</span>
                      </div>
                      <div className={styles.btn_sell_bottom +" "+styles.btn_sell_sm+" "+(tranDire?"":styles.on)} onClick={this.chooseTranDir(false)}>
                          <span>卖</span>
                          <span className={styles.font_arial}>{bid}</span>
                      </div>
                  </div>

                    {trantype?null:
                        <div className={styles.tran_panel}>
                        <h1>成交价格</h1>
                        <div className={styles.tran_icon}>
                            <div className={styles.icon_minus} onClick={this.minusClick(1)}></div>
                            <div className={styles.icon_num}>{actualPrice?actualPrice:"未设置"} </div>
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
                        <h1>交易手数</h1>
                        <div className={styles.tran_icon}>
                            <div className={styles.icon_minus} onClick={this.minusClick(2)}></div>
                            <div className={styles.icon_num}>{num}</div>
                            <div className={styles.icon_plus} onClick={this.plusClick(2)}></div>
                        </div>
                        <div className={styles.tran_total}>
                            <span className={styles.total_span}>
                                {/* <span>合计：</span>
                                <span>$510.00</span>&nbsp;&nbsp;
                                <span>可用保证金：</span>
                                <span>$0.00</span> */}
                            </span>
                        </div>
                    </div>
                    <div className={styles.tran_panel}>
                        <h1>止损价格</h1>
                        <div className={styles.tran_icon}>
                            <div className={styles.icon_minus} onClick={this.minusClick(3)}></div>
                            <div className={styles.icon_num}>{stopPrice?stopPrice:"未设置"}</div>
                            <div className={styles.icon_plus} onClick={this.plusClick(3)}></div>
                        </div>
                        <div className={styles.tran_total}>
                            <span className={styles.total_span}>
                                {trantype && tranDire?<span>价格&lt;={(ask-this._minDis).toFixed(this._digits)}</span>:null}
                                {trantype && !tranDire?<span>价格&gt;={(bid+this._minDis).toFixed(this._digits)}</span>:null}
                                {!trantype && tranDire?<span>价格&lt;={(ask-this._minDis).toFixed(this._digits)}</span>:null}
                                {!trantype && !tranDire?<span>价格&gt;={(bid+this._minDis).toFixed(this._digits)}</span>:null} 
                                {/* <span>预计亏损--</span> */}
                            </span>
                        </div>
                    </div>
                    <div className={styles.tran_panel}>
                        <h1>止盈价格</h1>
                        <div className={styles.tran_icon}>
                            <div className={styles.icon_minus} onClick={this.minusClick(4)}></div>
                            <div className={styles.icon_num}>{profitPrice?profitPrice:"未设置"}</div>
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
                    {trantype?
                    null:
                    <div className={styles.tran_panel}>
                        <h1>截止时间</h1>
                        <div className={styles.tran_time}>
                            <DatePicker ref="timePicker" minTime={ctm} />  
                        
                        </div>
                    </div>
                    }
                    
                    <div style={{height:"1.5rem"}}>
                    </div>
                </div>

                <div className={styles.bottom_btn_fixed}>
                    <div className={styles.mybtn_buy_bottom}  onClick={this.buyClick}>
                        <div className={styles.confirm} style={isClose?{backgroundColor:"#b6b6b6"}:null}>{trantype?"确认交易":"确认挂单"}</div>
                    </div>
                </div>

                 
            </div>
        );
    }

}
function injectProps(state){
    var {accountArr} =state.base ||{};
    return {accountArr};
}
function injectAction(){
    return {openOrder,showMessage};
}

module.exports = connect(null,injectAction())(ComplexDetail);