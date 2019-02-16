import styles from './css/optionalItem.less';

class OptionalItem extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    itemClick = ()=>{
        hashHistory.push("/work/optional/detail");
    }

    //渲染函数
    render(){

        var {editable} = this.props;

        return(
            <li className={styles.item} onClick={this.itemClick}>
                <div className={styles.currency_name}>
                    <p className={this.mergeClassName("c3", styles.c3)}>欧元美元</p>
                    <p className={this.mergeClassName("c9", "font-arial")}>EURUSD200</p>
                </div>
                <div className={styles.currency_price}>
                    <div className={this.mergeClassName(styles.price_box, styles.buy, "font-arial")}>
                        <span>1.13</span>
                        <span className={this.mergeClassName(styles.font50, styles.text)}>28</span>
                        <span className={"vertical-top"}>0</span>
                    </div>
                    <div className={this.mergeClassName(styles.price_box, styles.sell, "font-arial")}>
                        <span>1.13</span>
                        <span className={this.mergeClassName(styles.font50, styles.text)}>26</span>
                        <span className={"vertical-top"}>1</span>
                    </div>
                </div>
            </li>
        );
    }

}

module.exports = OptionalItem;
