import { connect } from 'react-redux';
import { myfollowers} from "../../actions/trade/tradeAction";
import CopyItem from './CopyItem';
import styles from './css/positionList.less'

class HistoryCopyList extends PureComponent {

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
            this.props.myfollowers(this,false, { fowMt4Id,fowType:1 }, (data) => {
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
        var {floatTrade=[]} = this.props;
         
        for(var i=0,l=data.length;i<l;i++){

            var prodCode = data[i].prodCode;
            for(var j=0,l2=floatTrade.length;j<l2;j++){

                if(prodCode == floatTrade[j].symbol){
                    data[i] = Object.assign({}, data[i],floatTrade[j]);
                    break;
                }
            }
        }

        return data.map(item => {
            return <CopyItem type={1} data={item} onChoose={this.onItemclick} />
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

module.exports = connect(null, injectAction())(HistoryCopyList);
