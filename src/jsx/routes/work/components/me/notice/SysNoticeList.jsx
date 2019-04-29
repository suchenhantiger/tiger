import { connect } from 'react-redux';
import { getSysNoticeList } from '../../../actions/me/meAction';
import {formatTime} from '../../../../../utils/util';
import styles from './css/sysNoticeList.less'
import EmptyFrame from '../../trade/EmptyFrame';
const pageSize = 20;
class SysNoticeList extends CursorList {

    //构造函数
    constructor(props) {
        super(props);
    }

    
    componentDidMount(){
        this.getData(1, false);
    }

    getData(pageNo, isAppend,cb){

        this.props.getSysNoticeList(this, {
            msgType:0,
            pageNo, pageSize
        }, isAppend, this.update,cb);
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
            var {
                content,
                createdate,
                id,
                isread,
                msgtype,
                title
             } = item;
             var tmpdate = new Date();
             tmpdate.setTime(createdate);
             createdate = formatTime(tmpdate);
            return (
                <li className={styles.item}>
                    <p className={this.mergeClassName("font30", "mg-bt-10")}><span>{title}</span></p>
                    <p className={"c9"}>{createdate}</p>
                    <div className={"mg-tp-42"} dangerouslySetInnerHTML={{__html:content} }/>
                </li>
            )
        });
    }

    //渲染函数
    render(){
        var { data } = this.state;
        if(data.length==0){
            return (
                <div style={{marginTop:"2rem"}}>
                    <EmptyFrame detail="暂无消息" />
                </div >
            )
        }else
            return super.render();
    }


}

function injectAction() {
    return { getSysNoticeList };
}

module.exports = connect(null, injectAction())(SysNoticeList);
