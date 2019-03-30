import { connect } from 'react-redux';
import { getCurTradeList } from '../../../actions/documentary/documentaryAction';

import styles from './css/curTradeList.less'

const pageSize = 20;

class CurTradeList extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            nextPage:1
        }
    }

    componentDidMount(){
        this.getData(1, false);
    }

    componentDidUpdate(){
        var {onDidUpdate} = this.props;
        onDidUpdate && onDidUpdate();
    }

    getData(pageNo, isAppend){
        var {followerId} = this.props,
            clientId = systemApi.getValue("clientId");
        this.props.getCurTradeList(this, {
            pageNo, followerId, clientId, pageSize
        }, isAppend, this.update);
    }

    update = (isAppend, list)=>{
        var {data, nextPage} = this.state;
        if(isAppend){
            data = data.concat(list);
        }
        else {
            data = list;
        }
        this.setState({data:data.slice(), nextPage:nextPage+1});
    }

    getNextPage(){
        var {nextPage} = this.state;
        this.getData(nextPage, true);
    }

    reloadData(){
        this.state.nextPage = 1;
        this.getData(1, false);
    }

    renderList() {
        var { data } = this.state;
        
        return data.map((item) => {
            var {buySell=0,closePrice="--",netProfit="--",prodName="--",timeStr="--",openPrice="--"} = item;
            var nameStr = buySell==0?("买入"+prodName):("卖出"+prodName);
            return (
                <tr className={styles.item}>
                    <td>
                        <p className="font26">{nameStr}</p>
                        <p className="c9">{timeStr}</p>
                    </td>
                    <td>
                        <p className="font26">{openPrice}</p>
                        <p className="c9">开仓价</p>
                    </td>
                    <td>
                        <p className="font26">{closePrice}</p>
                        <p className="c9">现价</p>
                    </td>
                    <td>
                        <p className={netProfit>=0?"font26 red":"font26 green"}>${netProfit}</p>
                        <p className="c9">收益</p>
                    </td>
                </tr>
            )
        });
    }

    render() {
        return (
            <div className={styles.home_frame}>
                <table className={styles.table}>
                    {this.renderList()}
                </table>
            </div>
        )
    }
}

function injectAction() {
    return { getCurTradeList };
}

module.exports = connect(null, injectAction(), null, {withRef:true})(CurTradeList);
