import {connect} from 'react-redux';
import styles from './css/K_chart.less';
import TimeChoose from './TimeChoose';
import Chart from './Chart';
import KSet from './KSet';
import {getHistoryKList} from '../../../actions/optional/optionalAction';
import SmallLoading from "../../../../../components/common/loading/SmallLoading";
class K_chart extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state={
            timeL:5,
            showKchart:false,
            index1:1,
            index2:0
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
            case 9:
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
    updatePrice=(data,type)=>{
        var {updatePrice}=this.props;
        var {quotedUD={},recentBars=[]} = data;
        
        if(type!=1){
            updatePrice && updatePrice(quotedUD);
        }
            

        if(typeof(recentBars)=="string")
            recentBars = JSON.parse(recentBars);
        if(recentBars.length>0){
            if(recentBars.length==1){
                var newone = recentBars[0];
            }else
                var newone = recentBars[1];
            
            
            //判断是否要更新
             var oldone = this._kdata[this._kdata.length-1];
             if(oldone.opentime == newone.opentime ){
                if(oldone.open != newone.open || 
                    oldone.close != newone.close || 
                    oldone.low != newone.low || 
                    oldone.high != newone.high || 
                    oldone.vol != newone.vol ){
                        //有一个不同就需要更新
                        newone.date= new Date(newone.opentime*1000);
                        this._kdata[this._kdata.length-1] = newone;
                        if(this.refs.chart)
                        this.refs.chart.getWrappedInstance().updateOne(newone);
                }
             }else{

               newone.date= new Date(newone.opentime*1000);
               this._kdata.push(newone);
               if(this.refs.chart)
               this.refs.chart.getWrappedInstance().addOne(newone);
             }             
        }

    }

    updateDetail=(data)=>{
        var {updateDetail,ticket}=this.props;
        if(ticket){
            var {ticket:wsTicket}=data;
            if(wsTicket && wsTicket == ticket)
                updateDetail && updateDetail();
        }
       

    }

    updateAllInfo=(data)=>{
        var {updateInfo}=this.props;
        updateInfo && updateInfo(data);

    }

    setChart2 =(index)=>{
        this.setState({index2:index});
    }

    setChart1 =(index)=>{
        this.setState({index1:index});
    }

    getOneK=()=>{
        var {prodCode,ticket} = this.props;
        this._mt4Id = systemApi.getValue("mt4Id");
        var reqStr = "";
        if(ticket){
            reqStr = JSON.stringify({"ticket":ticket,"funCode":"3010011","prodCode":prodCode,"period":this._period,"mt4Id":this._mt4Id});
        }else{
            reqStr = JSON.stringify({"funCode":"3010011","prodCode":prodCode,"period":this._period,"mt4Id":this._mt4Id});
        }
        
        //重置回调函数
        WebSocketUtil.onClose=()=>{
            console.log("WebSocketClosed!");
           };
        WebSocketUtil.onMessage=(wsData)=>{
            //    console.log("---onmessage");
            wsData = JSON.parse(wsData);
            // console.log(wsData);
            for(var i=0,l=wsData.length;i<l;i++){
                var {funCode,data} = wsData[i];
                if(funCode=="3010011"){
                    this.updatePrice(data);
                }else if(funCode=="30100112"){
                    this.updatePrice(data,1);
                }else if(ticket && funCode=="3010032"){
                    this.updateAllInfo(data);
                    
                }else if(ticket && funCode=="3010031"){
                    this.updateDetail(data);
                    
                }
            }

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
                      if(this.refs.chart)
                      this.refs.chart.getWrappedInstance().handleDownloadMore(start,end,this._kdata);
                  }
              });
    }


    //渲染函数
    render(){
        systemApi.log("k_chart render");

        var {timeL,showKchart,index1,index2} = this.state;
        var {fullscreen,digits=2,chartWidth=300,chartHeight=210} = this.props;
        var kdlist = this._kdata.slice(0);


  
        return(
            <div style={{position:"relative",height:"100%"}}>
                <div className={styles.k_frame} style={fullscreen?{marginRight:"0.9rem"}:{width:"100%"}}>
                        <TimeChoose  timeL={timeL} onChoose={this.chooseTime}/>
                        <div style={{height:"94%"}}>
                            {showKchart?
                            <Chart 
                            index1={index1} index2={index2}
                            width={chartWidth} 
                            height ={chartHeight} 
                            digits={digits} level={timeL} fullscreen={fullscreen} ref="chart" data={kdlist} loadMore={this.getMore} />
                            :<div style={{position:"absolute",left: "38%"}}><SmallLoading /></div>
                            }
                        </div>
                        {fullscreen? <KSet index1={index1} index2={index2} setChart1={this.setChart1} setChart2={this.setChart2} /> :null} 
                </div>
          </div>
        );
    }

}
function injectAction(){
    return {getHistoryKList};
}

module.exports = connect(null,injectAction())(K_chart);