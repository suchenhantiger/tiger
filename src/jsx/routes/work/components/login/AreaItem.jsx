import styles from './css/areaItem.less';

class AreaItem extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render() {

        var {areaName, areaCode} = this.props;

        return (
            <tr className={styles.item}>
                <td className="font30">{areaName}</td>
                <td className={this.mergeClassName("font26", "blue", "text-al-right")}>{areaCode}</td>
            </tr>
        );
    }

}

module.exports = AreaItem;
