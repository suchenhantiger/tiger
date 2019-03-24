import ReactEcharts from 'echarts-for-react';

class LineChart extends PureComponent {
  constructor(props) {
    super(props);
  }

  render(){
    systemApi.log("PieChart render");
    const {data,config} = this.props;
    var option = {
        legend:{
            height:50,
            padding:0
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        }]
    };
    

    return (
      <ReactEcharts option={option}/>
    );
  }
}

module.exports = LineChart;
