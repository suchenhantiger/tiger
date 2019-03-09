import { connect } from 'react-redux';
import { getPositionAllOrder } from '../../actions/trade/tradeAction';

import styles from './css/positionList.less'

class PositionAllList extends CursorList{

    //构造函数
    constructor(props) {
        super(props);
    }

    //获取数据
    getData(beginIndex,isAppend,cb,props){
        // this.props.getPositionAllOrder({
        //     beginIndex,
        //     pageSize:20,
        //     isHot:0
        // }, isAppend, cb, this, this.update);
        cb();
    }

    //更新数据
    update = (isAppend, data) => {
        var list = data;
        if(isAppend){
            list = this.state.data.concat(data);
        }
        this.nextIndex = list.length + 1;
        this.setState({data:list});
    };

    getScrollStyle(){
        return styles.frame;
    }

    getListStyle(){
        return styles.list;
    }

    renderList(){
        var {data} = this.state;
        return [1,1,1,1,1].map((item)=>{
            return (
                <li className={styles.item}>
                    <div className={"left"}>
                        <p>
                            <span className={this.mergeClassName("left", "font26")}>美元瑞郎 USDCHF</span>&nbsp;
                            <span className={"red"}>买入</span>
                        </p>
                        <p className={"mg-tp-10"}>
                            <span className={"c9"}>开仓价：</span>
                            <span className={"c9"}>1.000712</span>&nbsp;
                            <span className={"c9"}>现价：</span>
                            <span className={"c9"}>0.988888</span>
                        </p>
                    </div>
                    <div className={"right"}>
                        <p><span className={this.mergeClassName("left", "font30", "green")}>-$6.81</span></p>
                        <p className={"mg-tp-42"}><span className={"c9"}>浮动盈亏</span></p>
                    </div>
                </li>
            )
        });
    }
}

function injectAction(){
    return {getPositionAllOrder};
}

module.exports = connect(null,injectAction())(PositionAllList);
