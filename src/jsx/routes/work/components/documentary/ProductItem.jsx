import styles from './css/productItem.less';

class ProductItem extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
    }

    itemClick = ()=>{
        hashHistory.push({
            pathname:"/work/documentary/detail",
            query:{}
        })
    }

    //渲染函数
    render() {

        return (
            <li className={styles.item} onClick={this.itemClick}>
                <div className={styles.bk_pic}><img src="./images/documentary/img03.png" alt="" /></div>
                <div className={styles.bk_name}>中流砥柱</div>
                <div className={this.mergeClassName(styles.bk_num, "red")}>200.90%</div>
                <div className={styles.bk_text}>近30日收益率</div>
            </li>
        );
    }

}

module.exports = ProductItem;
