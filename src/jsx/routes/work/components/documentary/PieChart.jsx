import ReactEcharts from 'echarts-for-react';

class PieChart extends PureComponent {
  constructor(props) {
    super(props);
  }

  render(){
    systemApi.log("PieChart render");
    const {data,config} = this.props;
    console.log(data);
    var option = {
        animation:false,
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}:{d}%"
            // formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          
            // type:"scroll",
            orient: 'horizontal',
            x: 'center',
            y: 160,
            show:true,
            selectedMode:false,
            formatter:function (name) {
              for(var i=0,l=data.length;i<l;i++){
                var {prodName,prodRatio} = data[i];
                if(prodName == name){
                  name = name+" "+prodRatio+"%";
                }
              }
              return  name;
          },
            
            data://["邮件营销","联盟广告","视频广告","搜索引擎"]
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
                radius: [40, 60],
                center: ['50%', '30%'],
                label: {
                    normal: {
                        show: false,
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
