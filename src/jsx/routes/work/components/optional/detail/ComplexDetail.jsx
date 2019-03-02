import styles from './css/complexDetail.less';

class ComplexDetail extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            index:0,
            num:1.02,
            tradeDirect:"", //0-买 1-卖
            showIntro:false,
            showOpenSucc:false,
            showBuyDialog:false,
            trantype:true,
            tranDire:true,
        }
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
    }

    sellClick = ()=>{
        this.setState({tradeDirect:1, showBuyDialog:true});
    }

    tradeSubmit = (isChoose)=>{
        this.setState({showBuyDialog:false});
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

        var {index, showIntro, showOpenSucc, num, showBuyDialog, tradeDirect,trantype,tranDire} = this.state;

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
                      <div className={styles.hq_label}>交易类型</div>
                      <div className={styles.btn_buy_bottom +" "+styles.btn_buy_sm+" "+(tranDire?styles.on:"")} onClick={this.chooseTranDir(true)}>
                          <span>买</span>
                          <span className={styles.font_arial}>1.34564</span>
                      </div>
                      <div className={styles.btn_sell_bottom +" "+styles.btn_sell_sm+" "+(tranDire?"":styles.on)} onClick={this.chooseTranDir(false)}>
                          <span>卖</span>
                          <span className={styles.font_arial}>1.34564</span>
                      </div>
                  </div>


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
                    <div style={{height:"1.5rem"}}>
                    </div>
                </div>
                <div className={styles.bottom_btn_fixed}>
                    <div className={styles.mybtn_buy_bottom} onClick={this.buyClick}>
                        <div className={styles.confirm} >确认挂单</div>
                    </div>
                </div>

                 
            </div>
        );
    }

}

module.exports = ComplexDetail;
