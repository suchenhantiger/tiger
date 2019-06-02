import { connect } from 'react-redux';
import { myfollowers} from "../../actions/trade/tradeAction";
import CopyItem from './CopyItem';
import styles from './css/positionList.less'
import EmptyFrame from './EmptyFrame';
class CurrFowList extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state={
            allList:[]
        }
    }
    
    componentDidMount(){
        this.getMyfollowers();
        Event.register("refresh_CurrFowList",this.getMyfollowers);
    }
    componentWillUnmount(){
        Event.unregister("refresh_CurrFowList",this.getMyfollowers);
        
    }

    getMyfollowers=()=>{
        var {fowMt4Id,refreshScroll} =this.props;
        if(fowMt4Id && fowMt4Id.length>0){
            this.props.myfollowers(this,false, { fowMt4Id,fowType:0 }, (data) => {
                this.setState({ allList: data },()=>{
                    refreshScroll && refreshScroll();
                });
                
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

    gotoDocumentary =()=>{
        setTimeout(()=>{
            hashHistory.push("/work/documentary");
        },50);
    }


    render() {
        var {allList=[]} = this.state;
        return (
            allList.length==0?
            <EmptyFrame detail="没有跟随高手" btnText="逛逛高手榜" btnClick={this.gotoDocumentary} />:
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
