import styles from './css/addItem.less';

class AddItem extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
    }

    itemClick = () => {
        var {id, onToggleClick} = this.props;
        onToggleClick && onToggleClick(id);
    }

    //渲染函数
    render() {

        var { selected } = this.props;

        return (
            <li className={styles.item} onClick={this.itemClick}>
                <div className={styles.currency_name}>
                    <p className={this.mergeClassName("c3", styles.c3)}>欧元美元</p>
                    <p className={this.mergeClassName("c9", "font-arial")}>EURUSD200</p>
                </div>
                <div className={styles.list_right_icon}>
                    <dl className={styles.choose_dl}>
                        <dd className={this.mergeClassName("mg_rt_0", selected?styles.on:"")}><i></i></dd>
                    </dl>
                </div>
            </li>
        );
    }

}

module.exports = AddItem;