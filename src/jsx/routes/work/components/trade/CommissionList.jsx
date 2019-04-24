import { connect } from 'react-redux';
import { getCommissionList } from '../../actions/trade/tradeAction';

import styles from './css/commissionList.less';
import CommissionItem from './CommissionItem';

const pageSize = 20;

class CommissionList extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            nextPage:1
        }

    }

    componentDidMount(){
       // this.getData(1, false);
      //  console.log("sch componentDidMount");
    }

    componentWillReceiveProps(nextProps){
        this.getData(1, false);
    }

    getData(pageNo, isAppend){
        var {mt4Id,accType} = this.props;
        // console.log("sch mt4Id  "+mt4Id);
        if(mt4Id && mt4Id.length>0)
        this.props.getCommissionList(this, {
            pageNo, fowMt4Id:mt4Id, pageSize
        }, isAppend, this.update);
    }

    update = (isAppend, list,hasMore)=>{
        var {data, nextPage} = this.state;
        var {updateList } =this.props;
        if(isAppend){
            data = data.concat(list);
        }
        else {
            data = list;
        }
        this.setState({data:data.slice(), nextPage:nextPage+1,hasMore},()=>{
            updateList && updateList(data.length,hasMore);
        });
    }

    getNextPage(){
        var {nextPage} = this.state;
        this.getData(nextPage, true);
    }

    renderList() {
        var { data } = this.state;
        var {accType} = this.props;
        return data.map((item) => {
            return (
                <CommissionItem accType={accType} data={item}/>
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
    return { getCommissionList };
}

module.exports = connect(null, injectAction(),null,{withRef:true})(CommissionList);
