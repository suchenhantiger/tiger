import {connect} from 'react-redux';
import styles from './css/K_chart.less';
import TimeChoose from './TimeChoose';
import Chart from './Chart';
import {getHistoryKList} from '../../../actions/optional/optionalAction';
class K_chart extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state={
            timeL:5,
            showKchart:false
        };
        this._kdata=[];
        this._openTime=null;
        this._tmpcount=0;
        this._period=60;
        this._hasMore=true;
    }

    getHistoryKline=(cbf)=>{
        var {prodCode} = this.props;
        var {timeL,showKchart} =this.state;
        this._openTime=null;
        this._hasMore= true;
        switch(timeL){
            case 1:
                this._period=1;
                break;
            case 2:
                this._period=5;
                break;
            case 3:
                this._period=15;
                break;
            case 4:
                this._period=30;
                break;
            case 5:
                this._period=60;
                break;
            case 6:
                this._period=240;
                break;
            case 7:
                this._period=1440;
                break;
            case 8:
                this._period=10080;
                break;
            case 8:
               this._period=43200;
                break;
            default:
                 break;

        }
        this.props.getHistoryKList(this,{period:this._period,pageSize:150,prodCode},(data,hasmore)=>{
            this._hasMore=hasmore;
            if(data.length>0){
                this._kdata=data;
                this._openTime=data[0].opentime;
                this.setState({showKchart:true});
                cbf && cbf();
            }else{
                this._kdata=[]
            }

        });
    }

    componentDidMount(){
       this.getHistoryKline(()=>{
        this.getOneK();
       });
    }

    updatePrice=(data)=>{
        // console.log(data);
        var {updatePrice}=this.props;
        if(data.length>0){
            var {ask,bid,recentBars}=data[0];
            updatePrice && updatePrice({ask,bid});
            if(recentBars.length>0)
            var newone = recentBars[0];
            //判断是否要更新
             var oldone = this._kdata[this._kdata.length-1];
             if(oldone.opentime == newone.opentime ){
                 return;//这里逻辑还需要优化
             }
             console.log(oldone);
             console.log(newone);
            newone.date= new Date(newone.opentime*1000);
           
            this._kdata.push(newone);
            this.refs.chart.getWrappedInstance().updateOne(newone);
           // this.setState({});
        }

    }

    getOneK=()=>{
        var {prodCode} = this.props;
        var reqStr = JSON.stringify({"funCode":"301001","prodCode":prodCode,"period":this._period,"clientId":"","agentId":"","sign":""});
        //重置回调函数
        WebSocketUtil.onClose=()=>{
            console.log("WebSocketClosed!");
           };
        WebSocketUtil.onMessage=(data)=>{
            //    console.log("---onmessage");
            data = JSON.parse(data);
            // console.log(data);
            this.updatePrice(data);

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

    itemClick = ()=>{
    }

    chooseTime =(timeL)=>{
        this.setState({
            timeL,showKchart:false
        },()=>{
            this.getHistoryKline(()=>{
                this.getOneK();
               });
        });
    }

    getMore =(start,end)=>{
        if(!this._hasMore){
            return;
        }
        var {prodCode} = this.props;
        this.props.getHistoryKList(this,{period:this._period,
            openTime:this._openTime,
            pageSize:150,prodCode}
            ,(data,hasmore)=>{
                this._hasMore=hasmore;
                  if(data.length>0){
                      this._kdata = data.concat(this._kdata);
                      this._openTime=data[0].opentime;
                      this.refs.chart.getWrappedInstance().handleDownloadMore(start,end,this._kdata);
                  }
              });
    }


    //渲染函数
    render(){

        var {timeL,showKchart} = this.state;
        var {fullscreen} = this.props;
        var kdlist = this._kdata.slice(0);
        return(
            <div style={{position:"relative",height:"100%"}}>
          <div className={styles.k_frame} style={fullscreen?{marginRight:"0.9rem"}:{width:"100%"}}>
                <TimeChoose fullscreen={ fullscreen}timeL={timeL} onChoose={this.chooseTime}/>
                <div style={{
                     height:"94%",
            
                }}>
                    {showKchart?<Chart level={timeL} fullscreen={fullscreen} ref="chart" data={kdlist} loadMore={this.getMore}/>:null}
                </div>
                {fullscreen?
                <div className={styles.chart_rt} >
                    <div className={styles.icon_reset}></div>
                    <ul>
                        <li>MA</li>
                        <li>BOLL</li>
                        <li>MACD</li>
                        <li>PSI</li>
                        <li>KDJ</li>
                    </ul>
                    <div className={styles.btn_quick}>快速<br></br>下单</div>
                </div> 
                :null}           
              
          </div>
          </div>
        );
    }

}
function injectAction(){
    return {getHistoryKList};
}

module.exports = connect(null,injectAction())(K_chart);
