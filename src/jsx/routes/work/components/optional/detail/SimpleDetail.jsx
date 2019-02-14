import Intro from './Intro';

import styles from './css/simpleDetail.less';

class SimpleDetail extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            index:0,
            showIntro:false
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

    //渲染函数
    render(){

        var {index, showIntro} = this.state;

        return(
            <div>
                <div className={this.mergeClassName("mg-lr-30", "overf-hid")}>
                    <div className={styles.icon_intro_list} onClick={this.introClick}></div>
                    <div className={styles.icon_full_screen}></div>
                </div>
                <div className="mg-lr-30">
                    <div className={styles.tran_panel}>
                        <h1>交易手数</h1>
                        <div className={styles.tran_icon}>
                            <div className={styles.icon_minus}></div>
                            <div className={styles.icon_num}>1.02</div>
                            <div className={styles.icon_plus}></div>
                        </div>
                        <div className={styles.tran_total}>
                            <span className={styles.total_span}>
                                <span>合计：</span>
                                <span>$510.00</span>&nbsp;&nbsp;
                                <span>可用保证金：</span>
                                <span>$0.00</span>
                            </span>
                        </div>
                        <div className={styles.tran_tabs}>
                            <ul>
                                <li className={index==0?styles.on:""} onClick={this.countClick(0)}><span>0.01手</span><i></i></li>
                                <li className={index==1?styles.on:""} onClick={this.countClick(1)}><span>0.1手</span><i></i></li>
                                <li className={index==2?styles.on:""} onClick={this.countClick(2)}><span>0.5手</span><i></i></li>
                                <li className={index==3?styles.on:""} onClick={this.countClick(3)}><span>1手</span><i></i></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom_btn_fixed}>
                    <div className={styles.btn_buy_bottom}>
                        <span>买</span>
                        <span className={"font-arial"}>1.34564</span>
                    </div>
                    <div className={styles.btn_sell_bottom}>
                        <span>卖</span>
                        <span className={"font-arial"}>1.34564</span>
                    </div>
                </div>
                {showIntro?(
                    <Intro onClose={this.closeIntro}/>
                ):null}
            </div>
        );
    }

}

module.exports = SimpleDetail;
