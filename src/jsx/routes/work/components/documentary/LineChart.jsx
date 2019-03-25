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
        legend:{
            height:50,
            padding:0
        },
        xAxis: {
            type: 'category',
            data: xd
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: sd,
            type: 'line'
        }]
    };
    

    return (
      <ReactEcharts option={option}/>
    );
  }
}

module.exports = LineChart;
