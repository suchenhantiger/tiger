import { connect } from 'react-redux';
import { getFundRecordList } from '../../actions/trade/tradeAction';

import styles from './css/historyList.less';
import FundItem from './FundItem';

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

    getData(pageNo, isAppend){
        var mt4Id = systemApi.getValue("mt4Id"),
            clientId = systemApi.getValue("clientId");
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
    }

    getNextPage(){
        var {nextPage} = this.state;
        this.getData(nextPage, true);
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
        return (
            <ul className={styles.list}>
                {this.renderList()}
            </ul>
        );
    }
}

function injectAction() {
    return { getFundRecordList };
}

module.exports = connect(null, injectAction())(AccFundRecordList);
