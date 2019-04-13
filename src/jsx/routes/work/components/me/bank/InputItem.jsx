import styles from './css/inputItem.less';

class InputItem extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render() {

        var { name, value, placeholder,onChange } = this.props;

        return (
            <div className={this.mergeClassName(styles.item)}>
                <p><span className={this.mergeClassName(styles.label, "c9")}>{name}</span></p>
                <input className={styles.input} value={value} onChange={onChange} placeholder={placeholder} />
            </div>
        );
    }

}

module.exports = InputItem;
