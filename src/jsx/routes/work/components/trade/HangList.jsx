import HangItem from './HangItem';
import styles from './css/positionList.less'
import IScrollView from '../../../../components/common/iscroll/IScrollView.jsx'


class HangList extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }
    componentWillMount(){
    }

    componentDidMount(){
       
    }

    getScrollStyle=()=>{
        return styles.frame;
    }
    onItemclick =(data)=>{
        var {onItemClick} = this.props;
        onItemClick && onItemClick(data);
    }

    renderList(){
        var  {data=[]} = this.props;
         //   console.log("sch renderlist");
        return data.map(item=>{
            // console.log(item);
            return <HangItem data = {item} onChoose={this.onItemclick}/>
        })
    }
    render(){
       
        return (

                <IScrollView
                  className={this.getScrollStyle()}
                  canUpFresh={true}
                  upFresh={this.iscollUpfresh}
                  ref="scroll"
                >
                <ul>
                {this.renderList()}
                </ul>
                </IScrollView>
   
                
        );
    }



}

module.exports = HangList ;
