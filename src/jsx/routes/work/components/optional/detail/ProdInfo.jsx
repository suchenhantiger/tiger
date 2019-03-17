
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

        var {prodName,prodCode,price={}} = this.props;
        var {ask="--",bid="--",updowndiff="--",updownratio="--"}  = price;
        return(
            <div className={styles.header}>
                        <div className={styles.blank}></div>
                        <div className={styles.whiteline}></div>
                        <div className={styles.optional_detail}>
                            <div className={styles.currency_name}>
                                <p className={this.mergeClassName("c3", styles.c3)}>{prodName}</p>
                                <p className={this.mergeClassName("c9", "font-arial")}>{prodCode}</p>
                            </div>
                            <div className={styles.icon_intro} onClick={this.gotoIntro}>?</div>
                            <div className={styles.optional_dt_price}>
                                <div className={this.mergeClassName("font56", "red", styles.font56)}>{bid}</div>
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
