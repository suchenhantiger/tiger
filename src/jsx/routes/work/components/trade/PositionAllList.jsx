import PositionItem1 from './PositionItem1';
import EmptyFrame from './EmptyFrame';
import styles from './css/positionList.less'
import { flatOrder } from '../../actions/trade/tradeAction';


class PositionAllList extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
    }
    
    onItemclick = (data) => {
        var { onItemClick } = this.props;
        onItemClick && onItemClick(data);
    }

    renderList() {
        var { data = []} = this.props;

        return data.map(item => {
            return <PositionItem1 data={item} onChoose={this.onItemclick} />
        })
    }
    gotoOptional =()=>{
        hashHistory.push("/work/optional");
    }
    render() {
        var { data = []} = this.props;
        return (
            data.length==0?
            <EmptyFrame detail="没有订单" btnText="去下个单" btnClick={this.gotoOptional} />:
            <ul className={styles.list}>
                {this.renderList()}
            </ul>
        );
    }



}

module.exports = PositionAllList;
