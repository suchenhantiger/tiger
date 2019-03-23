import { connect } from 'react-redux';
import { getHisTradeList } from '../../../actions/documentary/documentaryAction';

import styles from './css/curTradeList.less'

const pageSize = 20;

class HisTradeList extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        this.getData(1, false);
    }

    getData(pageNo, isAppend){
        var mt4Id = systemApi.getValue("mt4Id"),
            clientId = systemApi.getValue("clientId");
        this.props.getHisTradeList(this, {
            pageNo, mt4Id, clientId, pageSize
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

    renderList() {
        var { data } = this.state;
        return [1,1,1].map((item) => {
            return (
                <tr className={styles.item}>
                    <td>
                        <p className="font26">买入黄金</p>
                        <p className="c9">手动平仓</p>
                        <p className="c9">12小时前</p>
                    </td>
                    <td>
                        <p className="font26">1255.86</p>
                        <p className="c9">开仓价</p>
                    </td>
                    <td>
                        <p className="font26">1255.86</p>
                        <p className="c9">现价</p>
                    </td>
                    <td>
                        <p className="font26 green">$-123.44</p>
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
    return { getHisTradeList };
}

module.exports = connect(null, injectAction())(HisTradeList);
