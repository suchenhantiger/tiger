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
        return data.map(item => {
            return <CopyItem type={2} data={item} onChoose={this.onItemclick} />
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

function injectAction() {
    return {myfollowers}
}

module.exports = connect(null, injectAction())(HistoryCopyList);
