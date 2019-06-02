import HangItem from './HangItem';
import styles from './css/positionList.less'
import EmptyFrame from './EmptyFrame';

class HangList extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    getScrollStyle=()=>{
        return styles.frame;
    }
    onItemclick =(data)=>{
        var {onItemClick} = this.props;
        onItemClick && onItemClick(data);
    }

    gotoOptional =()=>{
        hashHistory.push("/work/optional");
    }

    renderList(){
        var { data = [] } = this.props;
        return data.map(item=>{
            return <HangItem data = {item} onChoose={this.onItemclick}/>
        })
    }
    render(){
        var { data = [] } = this.props;
        return (
            data.length==0?
            <EmptyFrame detail="没有订单" btnText="去下个单" btnClick={this.gotoOptional} />:
            <ul className={styles.list}>
                {this.renderList()}
            </ul>
        );
    }



}

module.exports = HangList ;
