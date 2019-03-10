import ProductItem from './ProductItem';
import styles from './css/classifyFrame.less';

class ClassifyFrame extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render() {

        return (
            <div>
                <div className={styles.home_banner}>
                    <img src="./images/documentary/banner.png" alt="" />
                </div>
                <div className={styles.home_list}>
                    <div className={this.mergeClassName("left", "mg-bt-20")}>
                        <div className={styles.list_tit}>
                            <span className={this.mergeClassName("font32", "left")}>收益高手</span>
                            <span className={this.mergeClassName("c9", "right", "pd-rt-30")}>收益领先，表现突出</span>
                        </div>
                        <ul>
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                        </ul>
                    </div>
                </div>

            </div>
        );
    }

}

module.exports = ClassifyFrame;
