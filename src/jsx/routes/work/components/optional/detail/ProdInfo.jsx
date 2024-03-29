
import styles from './css/prodInfo.less';

class ProdInfo extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    gotoIntro =()=>{
        var {prodName,prodCode} = this.props;
        hashHistory.push({
            pathname:"/work/optional/detail/intro",
            query:{prodName,prodCode}
        })
    }


    //渲染函数
    render(){

        var {prodName,prodCode,price={},digit} = this.props;
        var {ask,bid,updowndiff,updownratio}  = price;
        if(ask){
            ask = ask.toFixed(digit);
        }else ask = "--";

        if(bid){
            bid= bid.toFixed(digit);
        }else bid = "--";

        if(updowndiff){
            updowndiff = updowndiff.toFixed(digit);
        }else updowndiff = "--";

        if(updownratio){
          //  updownratio = updownratio.toFixed(2);
        }else updownratio = "--";


        return(
            <div className={styles.header}>
                        <div className={styles.blank}></div>
                        <div className={styles.whiteline}></div>
                        <div className={styles.optional_detail}>
                            <div className={styles.currency_name}>
                                <p className={this.mergeClassName("c3 font30", styles.c3)}>{prodName}</p>
                                <p className={this.mergeClassName("c9 font24", "font-arial")}>{prodCode}</p>
                            </div>
                            <div className={styles.icon_intro} onClick={this.gotoIntro}>?</div>
                            <div className={styles.optional_dt_price}>
                                <div className={this.mergeClassName("red", styles.font56)}>{bid}</div>
                                <div className={this.mergeClassName("font24", (updownratio>=0?"red":"green"), "text-al-right")}>
                                    <span>{updownratio}%</span>/
                                    <span>{updowndiff}</span>
                                </div>
                            </div>
                        </div>
               
                    </div>
        );
    }

}

module.exports = ProdInfo;
