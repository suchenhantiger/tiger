import ReactEcharts from 'echarts-for-react';

class PieChart extends PureComponent {
  constructor(props) {
    super(props);
  }

  render(){
    systemApi.log("PieChart render");
    const {data,config} = this.props;
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            x: 'center',
            data:['直接访问1','邮件营销1','联盟广告1','视频广告1','搜索引擎1','邮件营销1','联盟广告1','视频广告1','搜索引擎1']
            // (function(){
            //   if (data && data.length > 0) {
            //     return data.map((item)=>{
            //       return {
            //          name: item[config.dataConf.nameField],
            //          icon:'rect'
            //       }
            //     });
            //   }
            // })()
        },
        series: [
            {
                name: "schschsch",
                type:'pie',
                radius: ['50%', '70%'],
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: '{c}'
                    }//,
                    // emphasis: {
                    //     show: true,
                    //     textStyle: {
                    //         fontSize: '30',
                    //         fontWeight: 'bold'
                    //     }
                    // }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:
                [
                    {
                      value:335,
                      name:'直接访问',
                      itemStyle:{
                          normal:{
                              // color:'rgb(128,128,128)'
                          }
                      }
                    },
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'},
                    {value:310, name:'邮件营销1'},
                    {value:234, name:'联盟广告1'},
                    {value:135, name:'视频广告1'},
                    {value:1548, name:'搜索引擎1'}
                ]
                // (function(){
                //   if (data && data.length > 0) {
                //     return data.map((item)=>{
                //       return {
                //         value: item[config.dataConf.valueField],
                //         name: item[config.dataConf.nameField],
                //         itemStyle:{
                //             normal:{
                //                 color: item[config.dataConf.colorField]
                //             }
                //         }
                //       }
                //     });
                //   }
                // })()
            }
        ]
    };

    return (
      <ReactEcharts option={option}/>
    );
  }
}

module.exports = PieChart;
