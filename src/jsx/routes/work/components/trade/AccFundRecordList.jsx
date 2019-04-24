import { connect } from 'react-redux';
import { getFundRecordList } from '../../actions/trade/tradeAction';

import styles from './css/historyList.less';
import FundItem from './FundItem';
import EmptyFrame from './EmptyFrame';

const pageSize = 20;

class AccFundRecordList extends PureComponent {

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
        this.props.getFundRecordList(this, {
            pageNo, mt4Id, clientId, pageSize
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
        
        this.refreshScroll();
    }

    refreshScroll=()=>{
        var {refreshScroll} =this.props;
        refreshScroll && refreshScroll();
    }

    reload =()=>{
        this.getData(1, false);
    }

    getNextPage(){
        var {nextPage} = this.state;
        this.getData(nextPage, true);
    }

    gotoRecharge=()=>{
        hashHistory.push("/work/me/recharge");
    }

    renderList() {
        var { data } = this.state;
        return data.map((item) => {
            return (
                <FundItem data={item}/>
            )
        });
    }

    render() {
        var { data = [] } = this.state;
        return (
            data.length==0?
            <EmptyFrame detail="没有资金记录" btnText="立即充值" btnClick={this.gotoRecharge} />:
            <ul className={styles.list}>
                {this.renderList()}
            </ul>
        );
    }
}

function injectAction() {
    return { getFundRecordList };
}

module.exports = connect(null, injectAction(),null,{withRef:true})(AccFundRecordList);
