import { connect } from 'react-redux';
import { getBenefitList } from '../../actions/documentary/documentaryAction';

import styles from './css/multipleList.less'

class BenefitList extends CursorList {

    //构造函数
    constructor(props) {
        super(props);
    }

    //获取数据
    getData(pageNo, isAppend, cb, props) {
        this.props.getBenefitList({
            pageNo,
            pageSize: 20,
            followType:1
        }, isAppend, cb, this, this.update);

    }

    //更新数据
    update = (isAppend, data) => {
        var list = data;
        if (isAppend) {
            list = this.state.data.concat(data);
        }
        this.nextIndex++;
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
        return data.map((item) => {
            var {accuracy30d,
                downRate30d,
                followNmae,
                followerId,
                fowwerNumHis,
                incomeRate30d,
                lastDayPLRate,
                signature} =item;
            return (
                <tr className={styles.item} onClick={this.itemClick}>
                    <td>
                        <div className={styles.gs_pic}><img src="./images/documentary/img03.png" alt="" /></div>
                        <p className={styles.gs_name}>{followNmae}</p>
                    </td>
                    <td>
                        <p className={"font26"}>{accuracy30d}%</p>
                        <p className={"c9"}>近30日准确率</p>
                    </td>
                    <td>
                        <p className={"font26"}>{fowwerNumHis}</p>
                        <p className={"c9"}>历史跟随</p>
                    </td>
                    <td>
                        <p className={this.mergeClassName("font26", "red")}>{incomeRate30d}%</p>
                        <p className={"c9"}>近30日收益率</p>
                    </td>
                </tr>
            )
        });
    }
}
function injectProps(state){
    var {incomeDate} = state.base || {};
    return {
        incomeDate
        };
}
function injectAction() {
    return { getBenefitList };
}

module.exports = connect(injectProps, injectAction())(BenefitList);
