import { connect } from 'react-redux';
import { getHistoryList } from '../../actions/trade/tradeAction';

import styles from './css/historyList.less'

class HistoryList extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    renderList() {
        var { data } = this.state;
        return [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => {
            return (
                <li className={styles.item}>
                    <div className={"left"}>
                        <p className={this.mergeClassName("left", "font26")}>转账-来自钱包</p><br />
                        <p className={this.mergeClassName("right", "c9", "mg-tp-10")}>2019-02-24 10:30:00</p>
                    </div>
                    <div className={"right"}>
                        <span className={this.mergeClassName("left", "font30")}>$1000.00</span>
                    </div>
                </li>
            )
        });
    }

    render() {
        return (
            <ul className={styles.list}>
                {this.renderList()}
            </ul>
        );
    }
}

function injectAction() {
    return { getHistoryList };
}

module.exports = connect(null, injectAction())(HistoryList);
