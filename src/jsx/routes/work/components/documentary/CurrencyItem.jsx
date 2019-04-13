import styles from './css/currencyItem.less';

class CurrencyItem extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render() {

        var {currName, buyRatio, buy, sell} = this.props;

        return (
            <li className={styles.item}>
                <div className={styles.currency}>{currName}</div>
                <div className={styles.ratio}>
                    <div className={styles.full} style={{width:buyRatio*100+"%"}}></div>
                </div>
                <div className={styles.buysell}>
                    <div className={styles.buy}>买入单:{buy}</div>
                    <div className={styles.sell}>卖出单:{sell}</div>
                </div>
            </li>
        );
    }

}

module.exports = CurrencyItem;
