import CopyPositionItem from './CopyPositionItem';
import styles from './css/positionList.less'
import { flatOrder } from '../../actions/trade/tradeAction';


class CopyAllList extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
    }
    
    onItemclick = (data) => {
        var { onItemClick } = this.props;
        onItemClick && onItemClick(data);
    }

    renderList() {
        var { data = [] } = this.props;
        return data.map(item => {
            return <CopyPositionItem data={item} onChoose={this.onItemclick} />
        })
    }
    render() {

        return (
            <ul className={styles.list}>
                {this.renderList()}
            </ul>
        );
    }



}

module.exports = CopyAllList;
