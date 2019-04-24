import CopyPositionItem from './CopyPositionItem';
import styles from './css/positionList.less'
import { flatOrder } from '../../actions/trade/tradeAction';
import EmptyFrame from './EmptyFrame';

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

    gotoDocumentary =()=>{
        setTimeout(()=>{
            hashHistory.push("/work/documentary");
        },50);
       
    }

    render() {
        var { data = [] } = this.props;
        return (
            data.length==0?
            <EmptyFrame detail="没有订单" btnText="逛逛高手榜" btnClick={this.gotoDocumentary} />:
            <ul className={styles.list}>
                {this.renderList()}
            </ul>
        );
    }



}

module.exports = CopyAllList;
