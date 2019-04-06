import { connect } from 'react-redux';
import { myfollowers} from "../../actions/trade/tradeAction";
import CopyItem from './CopyItem';
import styles from './css/positionList.less'

class CurrFowList extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state={
            allList:[]
        }
    }
    
    componentDidMount(){

        var {fowMt4Id} =this.props;
        if(fowMt4Id && fowMt4Id.length>0){
            this.props.myfollowers(this,false, { fowMt4Id,fowType:0 }, (data) => {
                this.setState({ allList: data });
            });
                

        }

        
        
    }
    
    onItemclick = (data) => {
        var { onItemClick } = this.props;
        onItemClick && onItemClick(data);
    }

    renderList() {
        var {allList:data} = this.state;
        var {couplist} = this.props;
        return data.map(item => {
            var pl = 0;
            var {followerId} = item;
            for(var i=0,l=couplist.length;i<l;i++){
                if(followerId == couplist[i].followerId){
                    pl+= couplist[i].netProfit;
                }
            }

            return <CopyItem pl={pl} type={1} data={item} onChoose={this.onItemclick} />
        })
    }
    render() {

        return (
            <ul className={styles.list}>
                {this.renderList()}
            </ul>
        );
    }



}
// function injectProps(state) {
//     var { infoEquity ,floatTrade} = state.trade || {};
//     return { infoEquity,floatTrade };
// }
function injectAction() {
    return {myfollowers}
}

module.exports = connect(null, injectAction())(CurrFowList);
