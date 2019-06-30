import { connect } from 'react-redux';
import { myfollowers} from "../../actions/trade/tradeAction";
import FollowMeItem from './FollowMeItem';
import styles from './css/positionList.less'
import EmptyFrame from './EmptyFrame';
class MyCurrFowList extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state={
            allList:[]
        }
    }
    
    componentDidMount(){
        this.getMyfollowers(true);
      //  Event.register("refresh_MyCurrFowList",this.getMyfollowers);
    }
    componentWillUnmount(){
     //   Event.unregister("refresh_MyCurrFowList",this.getMyfollowers);
     console.log("sch111componentWillUnmount");
        
    }

    getMyfollowers=(showloading)=>{
        var {fowMt4Id,refreshScroll} =this.props;
        if(fowMt4Id && fowMt4Id.length>0){
            this.props.myfollowers(this,showloading, { fowMt4Id,fowType:2 }, (data) => {
                this.setState({ allList: data },()=>{
                    refreshScroll && refreshScroll();
                });
                
            });
        }
    }
    
    onItemclick = (data) => {
      //  var { onItemClick } = this.props;
      //  onItemClick && onItemClick(data);
    }

    renderList() {
        var {allList:data} = this.state;
        return data.map(item => {
 //nickname clientAvatarUrl  balance totalPL
            return <FollowMeItem  data={item} onChoose={this.onItemclick} />
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
            <EmptyFrame detail="没有跟随的用户"  />:
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

module.exports = connect(null, injectAction())(MyCurrFowList);
