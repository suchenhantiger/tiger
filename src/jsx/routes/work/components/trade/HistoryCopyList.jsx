import { connect } from 'react-redux';
import { myfollowers} from "../../actions/trade/tradeAction";
import CopyItem from './CopyItem';
import styles from './css/positionList.less'
import EmptyFrame from './EmptyFrame';
class HistoryCopyList extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state={
            allList:[]
        }
    }
    
    componentDidMount(){

        var {fowMt4Id,refreshScroll} =this.props;
        if(fowMt4Id && fowMt4Id.length>0){
            this.props.myfollowers(this,true, { fowMt4Id,fowType:1 }, (data) => {
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
        return data.map(item => {
            return <CopyItem type={2} data={item} onChoose={this.onItemclick} />
        })
    }

    gotoDocumentary =()=>{
        hashHistory.push("/work/documentary");
    }

    render() {
        var {allList=[]} = this.state;
        return (
            allList.length==0?
            <EmptyFrame detail="没有跟随高手" btnText="逛逛高手榜单" btnClick={this.gotoDocumentary} />:
            <ul className={styles.list}>
                {this.renderList()}
            </ul>
        );
    }



}

function injectAction() {
    return {myfollowers}
}

module.exports = connect(null, injectAction())(HistoryCopyList);
