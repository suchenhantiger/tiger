import ReactEcharts from 'echarts-for-react';

class LineChart extends PureComponent {
  constructor(props) {
    super(props);
  }

  render(){
    systemApi.log("PieChart render");
    const {data,config} = this.props;
    
    var xd=[],
        sd=[];
    var l=data.length;
    for(var i=0;i<l;i++){
        xd.push(data[i].reportDate);
        sd.push(data[i].ratioPL);
    }

    // var l=7;
    // var xd=[201801,201802,201803,201804,201805,201806,201807];
    // var sd=[0.3,0.1,1.2,0.7,0.2,0.4,0.36];
    var end=100;
    var start=0;
    if(l>5){
        var winsize = 5*100/l;
        start=100-winsize;
    }


    var option = {
        animation:false,
        tooltip: {
            trigger: 'item',
            formatter: "{c}%"
            // formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        dataZoom:[

            {
                zoomLock:true,
                type: 'inside',
                xAxisIndex: [0],
                start: start,
                end: end,
            }
        ],
        xAxis: {
            axisLine: {show: true,//x轴的线
                lineStyle:{
                    color:['#bbb'],
                }
             },

             axisTick:{
                 show:false
             },
            type: 'category',
            lineStyle:{
                color:['#062161'],
            },
            data: xd
        },
        grid: {
            left: '0',
            right: '0',
            bottom: '60%',
            top:'0'
        },
        yAxis: {
            show:true,
            type: 'value',
            splitLine:{
                show:true
            },
            axisLine: {
                show: false,//x轴的线
                lineStyle:{
                    color:['#bbb'],
                }
             }
        },
        series: [{
            data: sd,
            type: 'line',
            smooth: false,
            color:['#647dce']
        }]
    };
    
    

    return (
      <ReactEcharts option={option}/>
    );
  }
}

module.exports = LineChart;
