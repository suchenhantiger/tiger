
import styles from './css/static.less';
import { connect } from 'react-redux';
import { getMasterDetail ,queryFollReportProd} from '../../actions/documentary/documentaryAction';
import ReactEcharts from 'echarts-for-react';
import PieChart from './PieChart';
import LineChart from './LineChart';
class Static extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state={
            info:{},
            report:[],
            prodCodeList:[]
        }

      
    }


    componentDidUpdate(){
        var {onDidUpdate} = this.props;
        onDidUpdate && onDidUpdate();
    }
    
    componentDidMount(){
        var {followerId} =this.props;
        this.props.getMasterDetail(this,{followerId},(data)=>{
            var {info,report} =data;
            this.setState({info,report});
            if(report.length>0){
                var {reportDate} =report[report.length-1];
                this.props.queryFollReportProd(this,{reportDate,followerId:followerId,reportTpye:0,},(prodCodeList)=>{

                    this.setState({prodCodeList});
                });
            }
            
        });
    }


 
    // accuracy
    // ratioPL
    // downRate
    // fowwerNumHis
    // lastDayPLRate
    // plRate30d
    // maxQty
    // totalCount
    // profitCount
    // lossCount
    // avgPosTime
    // profitLong
    // profitShort
    // AvgMonthlyCount
    
    //渲染函数
    render() {

        var {info,report,prodCodeList} =this.state;
        var {  accuracy="--",
            ratioPL="--",
            downRate="--",
            fowwerNumHis="--",
            lastDayPLRate="--",
            plRate30d="--",
            maxQty="--",
            totalCount="--",
            profitCount="--",
            lossCount="--",
            avgPosTime="--",
            profitLong="--",
            profitShort="--",
            avgMonthlyCount="--"} =info;


        return (
            <div>
                <div className={"mg-lr-30"+" mg-tp-30"}>
                  <div className={"mg-bt-20"+" overf-hid"}>
                      <span className={"left" +" font32"}>表现</span>
                      <span className={"right" +" "+"c9"}>数据将于每日北京时间00：00更新</span>
                    </div>
                    <div >
                    {/* <ReactEcharts option={this.getOption()} /> */}
                    <LineChart data={report}/>
                    </div>
                    <div className={"clear"}></div>
                    <div className={"c9" +" "+"mg-tp-20"}>*过往表现并不代表未来交易的成功率，您需要理智地做出判断</div>
                </div>
        

                <div className={"mg-lr-30" +" "+"mg-tp-42"}>
                  <div className={"mg-bt-20" +" "+"overf-hid"}>
                      <span className={"left" +" font32"}>数据统计</span>
                  </div>
                  <div className={styles.tj_list}>
                      <table width="100%" cellSpacing="0" cellPadding="0">
                          <tbody>
                          <tr>
                              <td>
                                  <p className={"font26"}>{accuracy}%</p>
                                  <p className={"c9"}>准确率</p>
                              </td>
                              <td>
                                  <p className={"font26"}>{maxQty}手</p>
                                  <p className={"c9"}>最大开仓</p>
                              </td>
                              <td>
                                  <p className={"font26"}>{totalCount}笔</p>
                                  <p className={"c9"}>总平仓交易</p>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <p className={"font26"}>{profitCount}笔</p>
                                  <p className={"c9"}>盈利订单</p>
                              </td>
                              <td>
                                  <p className={"font26"}>{lossCount}笔</p>
                                  <p className={"c9"}>亏损订单</p>
                              </td>
                              <td>
                                  <p className={"font26"}>{avgPosTime}</p>
                                  <p className={"c9"}>平均持仓时间</p>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <p className={"font26"}>{profitLong}笔</p>
                                  <p className={"c9"}>成功做多交易</p>
                              </td>
                              <td>
                                  <p className={"font26"}>{profitShort}笔</p>
                                  <p className={"c9"}>成功做空交易</p>
                              </td>
                              <td>
                                  <p className={"font26"}>{profitShort}%</p>
                                  <p className={"c9"}>上一日交易</p>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <p className={"font26"}>{plRate30d}%</p>
                                  <p className={"c9"}>近七日交易</p>
                              </td>
                              <td>
                                  <p className={"font26"}>{avgMonthlyCount}笔</p>
                                  <p className={"c9"}>月平均交易笔数</p>
                              </td>
                              <td>
                                  <p className={"font26"}>{fowwerNumHis}人</p>
                                  <p className={"c9"}>历史复制人数</p>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <p className={"font26"}>{ratioPL}%</p>
                                  <p className={"c9"}>总收益率</p>
                              </td>
                              <td>
                                  <p className={"font26"}>{downRate}%</p>
                                  <p className={"c9"}>最大跌幅</p>
                              </td>
                    
                          </tr>
                          </tbody>
                      </table>
                  </div>

              </div>

              <div className={"mg-lr-30"+" mg-tp-30"}>
                  <div className={"mg-bt-20"+" overf-hid"}>
                      <span className={"left" +" "+"font32"}>月交易品种</span>
                      <div className={"right"}>
                          <span className={"c9" +" "+"left"}>2019-02-13 13:57</span>
                          <i className={styles.bot_arrow_down +" "+"right"}></i>
                      </div>
                  </div>
                  <div>
                    {prodCodeList.length>0?<PieChart data={prodCodeList} />:null}
                  </div>
              </div>
                
            </div>
        );
    }

}
// function injectProps(state){
//     var {incomeDate} = state.base || {};
//     return {
//         incomeDate
//         };
// }
function injectAction() {
    return { getMasterDetail ,queryFollReportProd};
}

module.exports = connect(null, injectAction(), null, {withRef:true})(Static);
