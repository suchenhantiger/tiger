
import styles from './css/static.less';
import { connect } from 'react-redux';
import { getMasterDetail ,queryFollReportProd} from '../../actions/documentary/documentaryAction';
import ReactEcharts from 'echarts-for-react';
import PieChart from './PieChart';
import LineChart from './LineChart';
import MonthPicker from './MonthPicker';
import CurrencyItem from './CurrencyItem';

class Static extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state={
            info:{},
            report:[],
            prodCodeList:[],
            monthArr:[],currMonth:null
        }

      
    }


    componentDidUpdate(){
        var {onDidUpdate} = this.props;
        onDidUpdate && onDidUpdate();
    }
    
    componentDidMount(){
        var {followerId,updateInfo} =this.props;
        this.props.getMasterDetail(this,{followerId},(data)=>{
            var {info,report,fowInfo} =data;
            
            var month=[];
            for(var i=report.length-1;i>=0;i--){
                month.push({value:report[i].reportDate,label:report[i].reportDate});
            }
            if(month.length>0){
                this.setState({info,report,monthArr:month,currMonth:month[0].value});
            }
            else this.setState({info,report});
            var {starLevel,
                maxFowBalance,
                suggestBalance,
                signature,
                incomeRate30d,downRate30d,lastDayPLRate,avatarUrl
                }= info;
                updateInfo && updateInfo({starLevel,signature,avatarUrl,
                    incomeRate30d,downRate30d,lastDayPLRate,
                    maxFowBalance,
                    suggestBalance,fowInfo});
                if(report.length>0){
                var {reportDate} =report[report.length-1];
                this.props.queryFollReportProd(this,{reportDate,followerId:followerId,reportTpye:0,},(prodCodeList)=>{
                    this.setState({prodCodeList});
                });
            }
            
        });
    }

    showMonth=()=>{
       this.setState({showPicker:true});
    }

    closeMonthPicker=()=>{
        this.setState({showPicker:false});
    }

    changeMonth=(newMonth)=>{
        var {currMonth}=this.state;
        if(currMonth!=newMonth){
            var {followerId} =this.props;
            this.props.queryFollReportProd(this,{reportDate:newMonth,followerId:followerId,reportTpye:0},(prodCodeList)=>{
                this.setState({prodCodeList});
            });
        }
        this.setState({showPicker:false,currMonth:newMonth});
    }
    renderCurrList=(prodCodeList)=>{
        return prodCodeList.map((item)=>{
            var {longTime,
                longTimeStr,
                prodCode,
                prodName,
                prodRatio,
                shortTime,
                shortTimeStr} =item;
                var buyRatio=0;
                if(shortTime==0){
                    buyRatio=1;
                }else{
                    buyRatio = longTime/(shortTime+longTime);
                }
            return <CurrencyItem buyRatio={buyRatio} currName={prodName} buy={longTimeStr} sell={shortTimeStr}/>
        })
    }

    //渲染函数
    render() {
        var {info,report,prodCodeList,showPicker,currMonth,monthArr} =this.state;
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
                <div className={"mg-lr-30"+" mg-tp-42"}>
                  <div className={"mg-bt-20"+" overf-hid"}>
                      <span className={"left" +" font32"}>表现</span>
                      <span className={"right" +" "+"c9"}>数据将于每日北京时间00：00更新</span>
                    </div>
                    <div style={{height:"3rem"}}>
                    {/* <ReactEcharts option={this.getOption()} /> */}
                    <LineChart data={report}/>
                    </div>
                    <div className={"clear"}></div>
                    <div className={"c9" +" "+"mg-tp-30"} style={{lineHeight:".3rem"}}>*过往表现并不代表未来交易的成功率，您需要理智地做出判断</div>
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
                                  <p className={"font26"}>{lastDayPLRate}%</p>
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

              <div className={"mg-lr-30"+" mg-tp-56"}>
                  <div className={"mg-bt-20"+" overf-hid"}>
                      <span className={"left" +" "+"font32"}>月交易品种</span>
                      <div className={"right"}>
                          <span className={"c9" +" "+"left"} onClick={this.showMonth} >{currMonth}</span>
                          <i className={styles.bot_arrow_down +" "+"right"}></i>
                      </div>
                  </div>
                  <div>
                    {prodCodeList.length>0?<PieChart data={prodCodeList} />:null}
                  </div>
                  <div className={styles.list}>
                    {this.renderCurrList(prodCodeList)}
                    
                  </div>
              </div>
              {showPicker?
              <MonthPicker data={monthArr} currMonth={currMonth} onClose={this.closeMonthPicker} onChange={this.changeMonth}/>
              :
              null}
              
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
