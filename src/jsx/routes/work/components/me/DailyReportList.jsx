import { connect } from 'react-redux';
import { getDailyReportList } from '../../actions/me/noticeAction';

import styles from './css/dailyReportList.less'

class DailyReportList extends CursorList {

    //构造函数
    constructor(props) {
        super(props);
    }

    //获取数据
    getData(beginIndex, isAppend, cb, props) {
        // this.props.getDailyReportList({
        //     beginIndex,
        //     pageSize: 20,
        //     isHot: 0
        // }, isAppend, cb, this, this.update);
        cb();
    }

    //更新数据
    update = (isAppend, data) => {
        var list = data;
        if (isAppend) {
            list = this.state.data.concat(data);
        }
        this.nextIndex = list.length + 1;
        this.setState({ data: list });
    };

    getScrollStyle() {
        return styles.frame;
    }

    renderList() {
        var { data } = this.state;
        return [1, 1, 1, 1, 1, 1].map((item) => {
            return (
                <li className={styles.item}>
                    <h2><span>汇评标题汇评标题汇评标题汇评标题汇评标题汇评标题汇评标题汇评标题汇评标题汇评标题</span><span className={styles.hp_mn}>早评</span></h2>
                    <p className={"c9"}><span>2019-03-03 12:22:22</span>&nbsp;&nbsp;<span>分析师</span><span>张三</span></p>
                    <p className={this.mergeClassName("mg-tp-20", "c6")}>汇评文字内容汇评文字内容汇评文字内容汇评文字内容汇评文字内容汇评文字内容汇评文字内容汇评文字内容汇评文字内容</p>
                    <p className={this.mergeClassName("blue", "mg-tp-10")}>查看详情&gt;</p>
                </li>
            )
        });
    }
}

function injectAction() {
    return { getDailyReportList };
}

module.exports = connect(null, injectAction())(DailyReportList);
