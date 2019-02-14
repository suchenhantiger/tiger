import Disclaimer from './Disclaimer';

import styles from './css/intro.less';

class Intro extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            index:0,
            showDisclaimer:false
        }
    }

    strategyClick = (index)=>()=>{
        this.setState({index});
    }

    openDisclaimer = ()=>{
        this.setState({showDisclaimer:true});
    }

    closeDisclaimer = ()=>{
        this.setState({showDisclaimer:false});
    }

    //渲染函数
    render(){

        var {index, showDisclaimer} = this.state,
            {onClose} = this.props;

        return(
            <div className={styles.bottom_pop}>
                <div>
                    <div className={styles.bot_arrow_down} onClick={onClose}></div>
                    <div className={styles.strategy}>
                        <ul>
                            <li className={index==0?styles.on:""}>
                                <h1 onClick={this.strategyClick(0)}>
                                    <i></i>
                                    <span className={this.mergeClassName("font28", styles.font28)}>今日策略</span>
                                    <span className={"font24"}>转折点：</span>
                                    <span className={"font24"}>1.33300</span>
                                </h1>
                                {index==0?[
                                    <p>在1.3330之下，看跌，目标价为1.2880，然后为1.2660。</p>,
                                    <p>在1.3330之下，看跌，目标价为1.345，然后为1.3660。</p>
                                ]:null}
                            </li>
                            <li className={index==1?styles.on:""}>
                                <h1 onClick={this.strategyClick(1)}>
                                    <i></i>
                                    <span className={this.mergeClassName("font28", styles.font28)}>短期策略</span>
                                    <span className={"font24"}>转折点：</span>
                                    <span className={"font24"}>1.33300</span>
                                </h1>
                                {index==1?[
                                    <p>在1.3330之下，看跌，目标价为1.2880，然后为1.2660。</p>,
                                    <p>在1.3330之下，看跌，目标价为1.345，然后为1.3660。</p>
                                ]:null}
                            </li>
                            <li className={index==2?styles.on:""}>
                                <h1 onClick={this.strategyClick(2)}>
                                    <i></i>
                                    <span className={this.mergeClassName("font28", styles.font28)}>中期策略</span>
                                    <span className={"font24"}>转折点：</span>
                                    <span className={"font24"}>1.33300</span>
                                </h1>
                                {index==2?[
                                    <p>在1.3330之下，看跌，目标价为1.2880，然后为1.2660。</p>,
                                    <p>在1.3330之下，看跌，目标价为1.345，然后为1.3660。</p>
                                ]:null}
                            </li>
                        </ul>
                    </div>
                    <div className={this.mergeClassName("bd_tp", "clear-bth", "mg-lr-30")}>
                        <div className={styles.text_disclaimer} onClick={this.openDisclaimer}>免责申明</div>
                        <div className={styles.text_from}>数据来源：TC 11 Feb 19 | 18:05:30</div>
                    </div>
                </div>
                {showDisclaimer?(
                    <Disclaimer onClose={this.closeDisclaimer} onSure={this.closeDisclaimer}/>
                ):null}
          </div>
        );
    }

}

module.exports = Intro;
