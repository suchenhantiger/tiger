import PositionItem1 from './PositionItem1';
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
        var { data = [] ,floatTrade=[]} = this.props;
        //   console.log("sch renderlist");
        for(var i=0,l=data.length;i<l;i++){
            var tmpTicket = data[i].ticket;
            for(var j=0,l2=floatTrade.length;j<l2;j++){
                if(tmpTicket == floatTrade[j].ticket){
                    var {marketPrice,
                        marketTime,
                        netProfit,
                        }=floatTrade[j];
                    data[i].marketPrice=marketPrice;
                    data[i].marketTime=marketTime;
                    data[i].netProfit=netProfit;
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

module.exports = PositionAllList;
