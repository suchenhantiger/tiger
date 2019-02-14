import styles from '../../../../css/components/common/commonTable/CommonItem.css';

class CommonItem extends PureComponent {
    static defaultProps = {
        itemdata: []
    }
    constructor(props) {
        super(props);
    }
    renderElem() {
        var list = [];
        for (var i = 0; i < this.props.itemdata.length; i++) {
            list.push(
                <td key={i}>
                    <span>{this.props.itemdata[i]}</span>
                </td>
            );
        }
        return list;
    }
    render() {

        systemApi.log("CommonItem render");
        return (
            <tr className={styles.tr}>
                {this.renderElem()}
            </tr>
        )
    }

}

module.exports = CommonItem;
