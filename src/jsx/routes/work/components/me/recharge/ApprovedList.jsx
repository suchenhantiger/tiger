import { connect } from 'react-redux';
import { getToUploadList } from '../../../actions/me/rechargeAction';
import EmptyFrame from '../../trade/EmptyFrame';
import styles from './css/rechargeList.less'

class ApprovedList extends CursorList {

    //构造函数
    constructor(props) {
        super(props);
    }

    
    //获取数据
    getData(pageNo, isAppend, cb, props) {
        this.props.getToUploadList({
            pageNo,
            pageSize: 20,
            certificate:3
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

    uploadClick = ()=>{
        
    }

    renderList() {
        var { data } = this.state;
        return data.map((item) => {
            var {

                adddate,
                amount,
                certificateid,
                clientid,
                createdate,
                id,
                isrequired,
                orderid,
                status,
                title,
                updatedate,remarks

            } = item;

            return (
                <li className={styles.item}>
                    <p className={styles.lines}>
                        <span className={this.mergeClassName("left", styles.header)}>
                        {isrequired==1? <span className="red">*</span>:null}
                        {title}</span>
                        <span className={this.mergeClassName("right", styles.header)}>${amount}</span>
                    </p>
                    <p className={styles.lines}>
                        <span className={this.mergeClassName("left", styles.thin)}>{createdate}</span>
                        <span className={this.mergeClassName("right", styles.thin)}>{remarks}</span>
                    </p>
                    <p className={styles.lines}>
                        <span className={this.mergeClassName("right", styles.btn, styles.disable)} >上传凭证</span>
                    </p>
                </li>
            )
        });
    }

    //渲染函数
    render(){
        var { data } = this.state;
        if(data.length==0){
            return (
                <div style={{marginTop:".2rem"}}>
                    <EmptyFrame detail="暂无记录" />
                </div >
            )
        }else
            return super.render();
    }

}

function injectAction() {
    return { getToUploadList };
}

module.exports = connect(null, injectAction())(ApprovedList);
