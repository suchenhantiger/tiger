import { connect } from 'react-redux';
import { getSysNoticeList } from '../../../actions/me/meAction';

import styles from './css/sysNoticeList.less'
const pageSize = 20;
class SysNoticeList extends CursorList {

    //构造函数
    constructor(props) {
        super(props);
    }

    
    componentDidMount(){
        this.getData(1, false);
    }

    getData(pageNo, isAppend){

        this.props.getSysNoticeList(this, {
            msgType:1,
            pageNo, pageSize
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

    getScrollStyle() {
        return styles.frame;
    }

    renderList() {
        var { data } = this.state;
        return data.map((item) => {
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
