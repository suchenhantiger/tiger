import {connect} from 'react-redux';
import {getOptionalList,updatePrice} from '../../actions/optional/optionalAction';

import OptionalItem from './OptionalItem';
import styles from './css/optionalList.less'
import IScrollView from '../../../../components/common/iscroll/IScrollView.jsx'


class OptionalList extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this._optLength=0;
    }
    componentWillMount(){
    }

    componentDidMount(){
        //初次渲染  根据自选股发出行情请求
     //   var {OptionalList=[]} =this.props;
        this._optLength = this.props.OptionalListData.length;
        this.sendWS(this.props);
        // console.log("sch componentDidMount send");
    }
    sendWS=(curProps)=>{
        var {OptionalList=[]}=curProps;
          //进入自选股开始推送，离开时关闭推送
          var reqStr = JSON.stringify(
            {"funCode":"301001",
            "prodCode":OptionalList.join(','),
            "clientId":systemApi.getValue("clientId"),
            "agentId":"",
            "sign":""});
        WebSocketUtil.onOpen=()=>{
            console.log("----open-----");

            WebSocketUtil.send(reqStr)            
        };
        
        WebSocketUtil.onClose=()=>{
         console.log("WebSocketClosed!");
        };
        WebSocketUtil.onMessage=(data)=>{
         //   console.log("sch optList ws new data");

            data = JSON.parse(data);
            console.log(data);
            this.props.updatePrice(data);
        };
        WebSocketUtil.onError=(evt)=>{
         console.log("WebSocketError!");
         };
         if(!WebSocketUtil.send(reqStr)){
            //发送失败就重新创建一个
            WebSocketUtil.onOpen=()=>{
                console.log("----open kline-----");
                WebSocketUtil.send(reqStr)
            };
            
            WebSocketUtil.creatWebSocket(systemApi.getValue("websocketUrl"));
        }
    }

    componentWillReceiveProps(nextProps){
        // 自选股更新的时候重新发一次
        var {OptionalList} = this.props;
        var {OptionalList:newoptl} = nextProps;
        if(newoptl.length!=this._optLength){
            this._optLength =newoptl.length;
            //console.log("sch componentWillReceiveProps");//解决 初始化数据信息的异步问题
            this.sendWS(nextProps);
        }
       // 
     }
    // componentDidUpdate(){

    // }
    iscollUpfresh=()=>{

         this.sendWS(this.props);
      }

    getScrollStyle=()=>{
        return styles.frame;
    }

    // digits: 3
    // isClose: false
    // maxVolume: 50
    // minVolume: 0.01
    // minstDec: 5
    // prodCode: "CHFJPY"
    // prodName: "瑞日"
    // prodSize: 100000
    // volumeStep: 0.01
    renderList(){
        var  {editable,OptionalListData,ProductList} = this.props;
         //   console.log("sch renderlist");

        return OptionalListData.map(item=>{
            return <OptionalItem  
            name={item.prodName} isClose={item.isClose} 
            type ={item.categoryId} code={item.prodCode} 
            ask={item.ask} bid={item.bid} 
            digits={item.digits} maxVolume={item.maxVolume} 
            minVolume={item.minVolume} minstDec={item.minstDec} 
            volumeStep={item.volumeStep} prodSize={item.prodSize}  
            
            />
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
                {this.renderList()}
                
                </IScrollView>
   
                
        );
    }



}

function injectProps(state){
    var {OptionalListData,ProductList,OptionalList} = state.base || {};
    return {OptionalListData,OptionalList,ProductList};
}
function injectAction(){
    return {getOptionalList,updatePrice};
}

module.exports = connect(injectProps,injectAction())(OptionalList);
