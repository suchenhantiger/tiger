import PositionItem1 from './PositionItem1';
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
        var { data = [] ,floatTrade=[]} = this.props;
         
        for(var i=0,l=data.length;i<l;i++){

            var prodCode = data[i].prodCode;
            for(var j=0,l2=floatTrade.length;j<l2;j++){

                if(prodCode == floatTrade[j].symbol){
                    data[i] = Object.assign({}, data[i],floatTrade[j]);
                    break;
                }
            }
        }

        return data.map(item => {
            return <PositionItem1 data={item} onChoose={this.onItemclick} />
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
