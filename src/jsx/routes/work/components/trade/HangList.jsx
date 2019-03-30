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
        var { data = [] ,floatTrade=[]} = this.props;
        
       for(var i=0,l=data.length;i<l;i++){

           var prodCode = data[i].prodCode;
           for(var j=0,l2=floatTrade.length;j<l2;j++){
               if(prodCode == floatTrade[j].symbol){
                   data[i] = Object.assign({}, data[i],floatTrade[j]);
                   console.log(data[i]);
                   break;
               }
           }
       }


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
