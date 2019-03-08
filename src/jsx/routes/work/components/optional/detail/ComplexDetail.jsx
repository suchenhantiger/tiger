import styles from './css/complexDetail.less';
import {connect} from 'react-redux';
import {openOrder} from '../../../actions/optional/optionalAction';
import { DatePicker } from 'antd-mobile';

Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}


class ComplexDetail extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            index:0,
            num:1.02,
            tradeDirect:0, //0-买 1-卖
            showIntro:false,
            showOpenSucc:false,
            showBuyDialog:false,
            deadline:null,
            trantype:true,
            tranDire:true,
        }
        var {price={}} =props;
        var {ctm}= price;
        this._minDate = new Date(ctm*1000);
        this._deadline = new Date(ctm*1000);
        console.log(this._minDate);
        console.log("sch"+this._deadline);
    }

    countClick = (index)=>()=>{
        this.setState({index});
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

    plusClick = ()=>{
        var {index, num} = this.state,
            diffs = [0.01, 0.1, 0.5, 1],
            num = (+num)+diffs[index];
        this.setState({num:(+num).toFixed(2)});
    }

    minusClick = ()=>{
        var {index, num} = this.state,
            diffs = [0.01, 0.1, 0.5, 1],
            num = num-diffs[index];
        this.setState({num:num>0?(+num).toFixed(2):"0.00"});
    }

    buyClick = ()=>{
        this.setState({tradeDirect:0, showBuyDialog:true});


        var {prodCode,price,accountArr}=this.props;
        var {mt4Id} = accountArr[0];
        var {num} =this.state;
        var {ask,bid,ctm} = price;
        var tradePrice = ask-1 ;



        this.props.openOrder(this,{
            tradePrice,
            tradeTime:ctm,
            buySell:0,
            tradeTime:ctm,
            expireTime:1552059173,
            prodCode,
            openType:1,
            totalQty:0.1,
            mt4Id},()=>{
            
        });

    }

    sellClick = ()=>{
        this.setState({tradeDirect:1, showBuyDialog:true});
    }

    tradeSubmit = (isChoose)=>{
        this.setState({showBuyDialog:false});
    }
    onChangeDate=(data)=>{
        //console.log(data);
        this.setState({ deadline:data })
    }

    tradeCancel = ()=>{
        this.setState({showBuyDialog:false});
    }
    chooseTranDir=(type)=>()=>{
        this.setState({tranDire:type});
    }
    chooseTranType=(type)=>()=>{
        this.setState({trantype:type});
    }
    //渲染函数
    render(){
        systemApi.log("ComplexDetail render");
        var {index, showIntro, showOpenSucc, num, showBuyDialog, tradeDirect,trantype,tranDire,selectdate} = this.state;

        var {price} =this.props;
        var {ask="--",bid="--"}=price;
        var {deadline}=this.state;
        if(deadline==null ){
            var selectdate="";
        }else
            var selectdate = deadline.Format('yyyy-MM-dd hh:mm');

        console.log(selectdate);

        return(
            <div>
                <div className="mg-lr-30">
                    <div className={styles.centerTab}>
                        <ul>
                            <li className={trantype?styles.on:""} onClick={this.chooseTranType(true)}>市场交易</li>
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
                            <div className={styles.icon_minus} onClick={this.minusClick}></div>
                            <div className={styles.icon_num}>{num}</div>
                            <div className={styles.icon_plus} onClick={this.plusClick}></div>
                        </div>
                        <div className={styles.tran_total}>
                            <span className={styles.total_span}>
                                <span>合计：</span>
                                <span>$510.00</span>&nbsp;&nbsp;
                                <span>可用保证金：</span>
                                <span>$0.00</span>
                            </span>
                        </div>
                        </div>
                    }
                   

                    <div className={styles.tran_panel}>
                        <h1>交易手数</h1>
                        <div className={styles.tran_icon}>
                            <div className={styles.icon_minus} onClick={this.minusClick}></div>
                            <div className={styles.icon_num}>{num}</div>
                            <div className={styles.icon_plus} onClick={this.plusClick}></div>
                        </div>
                        <div className={styles.tran_total}>
                            <span className={styles.total_span}>
                                <span>合计：</span>
                                <span>$510.00</span>&nbsp;&nbsp;
                                <span>可用保证金：</span>
                                <span>$0.00</span>
                            </span>
                        </div>
                    </div>
                    <div className={styles.tran_panel}>
                        <h1>止损价格</h1>
                        <div className={styles.tran_icon}>
                            <div className={styles.icon_minus} onClick={this.minusClick}></div>
                            <div className={styles.icon_num}>{num}</div>
                            <div className={styles.icon_plus} onClick={this.plusClick}></div>
                        </div>
                        <div className={styles.tran_total}>
                            <span className={styles.total_span}>
                                <span>合计：</span>
                                <span>$510.00</span>&nbsp;&nbsp;
                                <span>可用保证金：</span>
                                <span>$0.00</span>
                            </span>
                        </div>
                    </div>
                    <div className={styles.tran_panel}>
                        <h1>止盈价格</h1>
                        <div className={styles.tran_icon}>
                            <div className={styles.icon_minus} onClick={this.minusClick}></div>
                            <div className={styles.icon_num}>{num}</div>
                            <div className={styles.icon_plus} onClick={this.plusClick}></div>
                        </div>
                        <div className={styles.tran_total}>
                            <span className={styles.total_span}>
                                <span>合计：</span>
                                <span>$510.00</span>&nbsp;&nbsp;
                                <span>可用保证金：</span>
                                <span>$0.00</span>
                            </span>
                        </div>
                    </div>

                    <div className={styles.tran_panel}>
                        <h1>截止时间</h1>
                        <div className={styles.tran_time}>
                            <DatePicker
                            value={this._deadline}
                            onChange={this.onChangeDate}
                            minDate={this._minDate}
                            mode="datetime">
                   
                              <div >{selectdate.length>0?selectdate:"未设置"}</div>
                            </DatePicker>
                        </div>
                    </div>


                    <div style={{height:"1.5rem"}}>
                    </div>
                </div>

                <div className={styles.bottom_btn_fixed}>
                    <div className={styles.mybtn_buy_bottom} onClick={this.buyClick}>
                        <div className={styles.confirm} >{trantype?"确认交易":"确认挂单"}</div>
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
    return {openOrder};
}

module.exports = connect(null,injectAction())(ComplexDetail);