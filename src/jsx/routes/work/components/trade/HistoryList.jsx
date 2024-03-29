import { connect } from 'react-redux';
import { getHistoryList } from '../../actions/trade/tradeAction';

import styles from './css/historyList.less';
import HistoryItem from './HistoryItem';
import EmptyFrame from './EmptyFrame';
const pageSize = 20;

class HistoryList extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            nextPage:1
        }
    }

    componentDidMount(){
        this.getData(1, false);
    }

    componentWillReceiveProps(nextProps){
        this.getData(1, false);
    }

    getData(pageNo, isAppend){
        var mt4Id = systemApi.getValue("mt4Id"),
            clientId = systemApi.getValue("clientId");
            if(mt4Id==null || mt4Id.length==0) return;
        this.props.getHistoryList(this, {
            pageNo, mt4Id, clientId, pageSize
        }, isAppend, this.update);
    }

    update = (isAppend, list, hasMore)=>{
        var {data, nextPage} = this.state;
        if(isAppend){
            data = data.concat(list);
        }
        else {
            data = list;
        }
      //  console.log(nextPage);
        this.setState({data:data.slice(), nextPage:nextPage+1});
        this.refreshScroll(hasMore);
    }

    refreshScroll=(hasMore)=>{
        var {refreshScroll} =this.props;
        refreshScroll && refreshScroll(hasMore);
    }

    reload =()=>{
        this.getData(1, false);
    }

    getNextPage(){
        var {nextPage} = this.state;
     //   console.log(nextPage);
        this.getData(nextPage, true);
    }

    gotoOptional =()=>{
        hashHistory.push("/work/optional");
    }
    
    renderList() {
        var { data } = this.state;
        return data.map((item) => {
            return (
                <HistoryItem data={item}/>
                // <li className={styles.item}>
                //     <div className={"left"}>
                //         <p className={this.mergeClassName("left", "font26")}>转账-来自钱包</p><br />
                //         <p className={this.mergeClassName("right", "c9", "mg-tp-10")}>2019-02-24 10:30:00</p>
                //     </div>
                //     <div className={"right"}>
                //         <span className={this.mergeClassName("left", "font30")}>$1000.00</span>
                //     </div>
                // </li>
            )
        });
    }

    render() {
        var { data } = this.state;
        
        return (
            data.length==0?
            <EmptyFrame detail="没有订单" btnText="去下个单" btnClick={this.gotoOptional} />:
            <ul className={styles.list}>
                {this.renderList()}
            </ul>
        );
    }
}

function injectAction() {
    return { getHistoryList };
}

module.exports = connect(null, injectAction(),null,{withRef:true})(HistoryList);
