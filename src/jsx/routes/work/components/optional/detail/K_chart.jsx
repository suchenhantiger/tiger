import {connect} from 'react-redux';
import styles from './css/K_chart.less';
import TimeChoose from './TimeChoose';
import Chart from './Chart';
import {getKList} from '../../../actions/optional/optionalAction';
class K_chart extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state={
            timeL:5,
            showKchart:false
        };
        this._kdata=[];
    }
    componentDidMount(){
//"date":"1543603620","open":"1220.725","low":"1220.495","high":"1220.725","close":"1220.688","volume":"0","position":"0"
        this.props.getKList({curr:0},(data)=>{
            if(data.length>0){
                this._kdata=data.slice(0);
                this.setState({showKchart:true},()=>{
                //    setInterval(()=>{
                //        var lastOne = this._kdata[this._kdata.length - 1];
                //        var newone={};
                //        newone.timestamp = lastOne.timestamp +=60;
                //        newone.date = new Date(newone.timestamp*1000);
                //        newone.open = lastOne.open ;
                //        newone.high = lastOne.high ;
                //        newone.low = lastOne.low;
                //        newone.close = lastOne.close;
                //        newone.volume = 0;
                //        this.refs.chart.getWrappedInstance().updateOne(newone);
                //    },5000);
                });
            }else{
                this._kdata=[]
            }
          
            
        });
    }

    itemClick = ()=>{
    }

    chooseTime =(timeL)=>{
        this.setState({
            timeL
        });
    }

    getMore =(start,end)=>{
        this.props.getKList({curr:this._kdata.length},(data2)=>{
           // var {data} = this.state;
           this._kdata = data2.concat(this._kdata).slice(0);
        //    console.log(this._kdata);
           this.refs.chart.getWrappedInstance().handleDownloadMore(start,end,this._kdata);
         //   this.setState({newdata});


        });
    }


    //渲染函数
    render(){

        var {timeL,showKchart} = this.state;
        return(
          <div className={styles.k_frame}>
                <TimeChoose timeL={timeL} onChoose={this.chooseTime}/>
                <div style={{height:"4.3rem"}}>
                    {showKchart?<Chart ref="chart" data={this._kdata} loadMore={this.getMore}/>:null}
                </div>
                
              
          </div>
        );
    }

}
function injectAction(){
    return {getKList};
}

module.exports = connect(null,injectAction())(K_chart);
