import { connect } from 'react-redux';
import { getCurTradeList } from '../../../actions/documentary/documentaryAction';

import styles from './css/curTradeList.less'

class CurTradeList extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.props.getCurTradeList({
            
        }, this, this.update);
    }

    //更新数据
    update = (data) => {
        this.setState({ data });
    };

    renderList() {
        var { data } = this.state;
        return [1,1,1,1,1,1,1,1,1,1].map((item) => {
            return (
                <tr className={styles.item}>
                    <td>
                        <p className="font26">买入黄金</p>
                        <p className="c9">持仓12小时</p>
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
    return { getCurTradeList };
}

module.exports = connect(null, injectAction())(CurTradeList);
