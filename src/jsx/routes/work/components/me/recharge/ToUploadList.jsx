import { connect } from 'react-redux';
import { getToUploadList } from '../../../actions/me/rechargeAction';

import styles from './css/rechargeList.less'

class ToUploadList extends CursorList {

    //构造函数
    constructor(props) {
        super(props);
    }

    //获取数据
    getData(beginIndex, isAppend, cb, props) {
        // this.props.getToUploadList({
        //     beginIndex,
        //     pageSize: 20
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

    uploadClick = ()=>{
        
    }

    renderList() {
        var { data } = this.state;
        return [1, 1, 1, 1, 1, 1].map((item) => {
            return (
                <li className={styles.item}>
                    <p className={styles.lines}>
                        <span className={this.mergeClassName("left", styles.header)}><span className="red">*</span>充值成功</span>
                        <span className={this.mergeClassName("right", styles.header)}>$1400.00</span>
                    </p>
                    <p className={styles.lines}>
                        <span className={this.mergeClassName("left", styles.thin)}>2018-08-30</span>
                        <span className={this.mergeClassName("right", styles.thin)}>入金凭证信息不符</span>
                    </p>
                    <p className={styles.lines}>
                        <span className={this.mergeClassName("right", styles.btn)} onClick={this.uploadClick}>上传凭证</span>
                    </p>
                </li>
            )
        });
    }
}

function injectAction() {
    return { getToUploadList };
}

module.exports = connect(null, injectAction())(ToUploadList);
