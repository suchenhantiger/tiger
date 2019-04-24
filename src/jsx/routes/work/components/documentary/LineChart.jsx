import ReactEcharts from 'echarts-for-react';

class LineChart extends PureComponent {
  constructor(props) {
    super(props);
  }

  render(){
    systemApi.log("PieChart render");
    const {data,config} = this.props;
    console.log(data);
    var xd=[],
        sd=[];
    for(var i=0,l=data.length;i<l;i++){
        xd.push(data[i].reportDate);
        sd.push(data[i].ratioPL);
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
                type: 'inside',
                xAxisIndex: [0],
                start: 1,
                end: 35
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
