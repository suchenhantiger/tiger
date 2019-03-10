import { connect } from 'react-redux';
import { getBenefitList } from '../../actions/documentary/documentaryAction';

import styles from './css/multipleList.less'

class BenefitList extends CursorList {

    //构造函数
    constructor(props) {
        super(props);
    }

    //获取数据
    getData(beginIndex, isAppend, cb, props) {
        // this.props.getBenefitList({
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

    renderListFrame(list) {
        return (
            <div className={styles.home_frame}>
                <table className={styles.table}>
                    {list}
                </table>
            </div>
        )
    }

    itemClick = ()=>{
        hashHistory.push({
            pathname:"/work/documentary/detail",
            query:{}
        })
    }

    renderList() {
        var { data } = this.state;
        return [1, 1, 1, 1, 1, 1].map((item) => {
            return (
                <tr className={styles.item} onClick={this.itemClick}>
                    <td>
                        <div className={styles.gs_pic}><img src="./images/documentary/img03.png" alt="" /></div>
                        <p className={styles.gs_name}>重仓起起起起起起起起起起程科</p>
                    </td>
                    <td>
                        <p className={"font26"}>100.00%</p>
                        <p className={"c9"}>近30日准确率</p>
                    </td>
                    <td>
                        <p className={"font26"}>38</p>
                        <p className={"c9"}>历史跟随</p>
                    </td>
                    <td>
                        <p className={this.mergeClassName("font26", "red")}>100.00%</p>
                        <p className={"c9"}>近30日收益率</p>
                    </td>
                </tr>
            )
        });
    }
}

function injectAction() {
    return { getBenefitList };
}

module.exports = connect(null, injectAction())(BenefitList);
