import HangItem from './HangItem';
import styles from './css/positionList.less'


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

    renderList(){
        var { data = [] } = this.props;
        return data.map(item=>{
            // console.log(item);
            return <HangItem data = {item} onChoose={this.onItemclick}/>
        })
    }
    render(){
        return (
            <ul className={styles.list}>
                {this.renderList()}
            </ul>
        );
    }



}

module.exports = HangList ;
