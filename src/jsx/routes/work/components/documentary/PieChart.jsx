import ReactEcharts from 'echarts-for-react';

class PieChart extends PureComponent {
  constructor(props) {
    super(props);
  }

  render(){
    systemApi.log("PieChart render");
    const {data,config} = this.props;
    var option = {
        animation:false,
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}:{d}%"
            // formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            
            orient: 'horizontal',
            x: 'center',
            y: 'bottom',
            
            data:
            (function(){
              if (data && data.length > 0) {
                return data.map((item)=>{
                  return {
                     name: item.prodName,
                     icon:'circle'
                  }
                });
              }
            })()
        },
        series: [
            {
                height:20,
                name:"月交易品种",
                type:'pie',
                radius: ['25%', '40%'],
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: '{d}%'
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
                // [
                //     {
                //       value:335,
                //       name:'直接访问',
                //       itemStyle:{
                //           normal:{
                //               // color:'rgb(128,128,128)'
                //           }
                //       }
                //     },
                //     {value:310, name:'邮件营销'},
                //     {value:234, name:'联盟广告'},
                //     {value:135, name:'视频广告'},
                //     {value:1548, name:'搜索引擎'},
                //     {value:310, name:'邮件营销1'},
                //     {value:234, name:'联盟广告1'},
                //     {value:135, name:'视频广告1'},
                //     {value:1548, name:'搜索引擎1'}
                // ]
                (function(){
                  if (data && data.length > 0) {
                    return data.map((item)=>{
                      return {
                        value: item.prodRatio,
                        name: item.prodName,
                        // itemStyle:{
                        //     normal:{
                        //         color: item[config.dataConf.colorField]
                        //     }
                        // }
                      }
                    });
                  }
                })()
            }
        ]
    };

    return (
      <ReactEcharts option={option}/>
    );
  }
}

module.exports = PieChart;
