import styles from './css/productItem.less';

class ProductItem extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
    }

    itemClick = ()=>{
        var {accuracy30d,
            downRate30d,
            followNmae,
            followerId,
            fowwerNumHis,
            incomeRate30d,
            lastDayPLRate,
            signature} = this.props.data;
        hashHistory.push({
            pathname:"/work/documentary/detail",
            query:{accuracy30d,
                downRate30d,
                followNmae,
                followerId,
                fowwerNumHis,
                incomeRate30d,
                lastDayPLRate,
                signature}
        })
    }

    //渲染函数
    render() {
        var {incomeRate30d="--",followNmae} = this.props.data;

        return (
            <li className={styles.item} onClick={this.itemClick}>
                <div className={styles.bk_pic}><img src="./images/documentary/img03.png" alt="" /></div>
                <div className={styles.blank}></div>
                <div className={styles.cont}>
                    <div className={styles.bk_name}>{followNmae}</div>
                    <div className={this.mergeClassName(styles.bk_num, "red")}>{incomeRate30d}%</div>
                    <div className={styles.bk_text}>近30日收益率</div>
                </div>
            </li>
        );
    }

}

module.exports = ProductItem;
