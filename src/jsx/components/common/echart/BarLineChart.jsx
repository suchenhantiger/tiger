import ReactEcharts from 'echarts-for-react';

class BarLineChart extends PureComponent {
  constructor(props) {
    super(props);
  }

  render(){
    systemApi.log("BarLineChart render");
    const {data, config}= this.props;
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:///['蒸发量','降水量','平均温度']
            (function(){
              const {series} = config;
              if (series) {
                return series.map((item)=>{
                  return {
                    name: item.name
                  }
                });
              }
            })()
        },
        grid: {
            left: '18%',//13
            right: '18%',//13
            bottom: '18%',//16%
            top:'18%'
        },
        xAxis: [
            {
                type: 'category',//,category
                axisLabel:{
                  interval: 0,
                  rotate:40
                },
                data:
                //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                (function(){
                  const {xField} = config;
                  if (data && data.length > 0) {
                    return data.map((item)=>item[xField]).sort((a,b)=>{
                      if (a > b) {
                        return 1;
                      }
                      else {
                        return -1;
                      }
                    });
                  }
                  else {
                    return [];
                  }
                })()
            }
        ],
        yAxis:
        //[
        //     {
        //         type: 'value',
        //         name: '水量',
        //         min: 0,
        //         max: 250,
        //         interval: 50,
        //         axisLabel: {
        //             formatter: '{value} ml'
        //         }
        //     },
        //     {
        //         type: 'value',
        //         name: '温度',
        //         min: 0,
        //         max: 25,
        //         interval: 5,
        //         axisLabel: {
        //             formatter: '{value} °C'
        //         }
        //     }
        // ],
        (function(){
          const {yAxis} = config;
          if (yAxis) {
            return yAxis.map((item)=>{
              return {
                  type: 'value',
                  name: item.name,
                  nameLocation:item.nameLocation,
                  nameTextStyle:{
                    fontSize:14
                  },
                  nameGap:item.nameGap,

                  min: item.min,
                  max: item.max,
                  interval: item.interval,

                  axisLine:{
                    show:item.axisLineshow
                  },
                  axisTick:{
                    show:false
                  },
                  axisLabel: {
                      formatter: function(value){
                        if (item.multiplier) {
                          return value*item.multiplier;
                        }
                        else {
                          return value;
                        }
                      }
                  },
                  splitLine:{
                    show:item.splitLineshow
                  }
              }
            });
          }
        })(),
        series:
        // [
        //     {
        //         name:'蒸发量',
        //         type:'bar',
        //         data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        //     },
        //     {
        //         name:'降水量',
        //         type:'bar',
        //         data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        //     },
        //     {
        //         name:'平均温度',
        //         type:'line',
        //         yAxisIndex: 1,
        //         data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        //     }
        // ]
        (function(){
          const {series, xField} = config;
          if (series) {
            return series.map((item)=>{
              const {name, type, yAxisIndex, valueField, color} = item;
              return {
                name:name,
                type:type,
                yAxisIndex: yAxisIndex,
                itemStyle:{
                    normal:{
                        color: color
                    }
                },
                data:(function(){
                  if (data && data.length > 0) {
                    return data.map((it)=>{
                      return [it[xField], it[valueField]];
                    });
                  }
                })()
              }
            });
          }
        })()
    };

    return (
      <ReactEcharts option={option}/>
    );
  }
}

module.exports = BarLineChart;
