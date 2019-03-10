import { connect } from 'react-redux';
import { getSysNoticeList } from '../../../actions/me/meAction';

import styles from './css/sysNoticeList.less'

class SysNoticeList extends CursorList {

    //构造函数
    constructor(props) {
        super(props);
    }

    //获取数据
    getData(beginIndex, isAppend, cb, props) {
        // this.props.getSysNoticeList({
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
                    <p className={this.mergeClassName("font30", "mg-bt-10")}><span>红包通知</span></p>
                    <p className={"c9"}>2019-03-03 12：22：22</p>
                    <p className={"mg-tp-30"}>您收到红包，请进入"我的红包"查看</p>
                </li>
            )
        });
    }
}

function injectAction() {
    return { getSysNoticeList };
}

module.exports = connect(null, injectAction())(SysNoticeList);
