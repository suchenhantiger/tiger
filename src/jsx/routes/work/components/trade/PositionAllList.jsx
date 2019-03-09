import PositionItem1 from './PositionItem1';
import styles from './css/positionList.less'
import IScrollView from '../../../../components/common/iscroll/IScrollView.jsx'


class PositionAllList extends PureComponent{

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
            return <PositionItem1 data = {item} onChoose={this.onItemclick}/>
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

module.exports = PositionAllList ;
