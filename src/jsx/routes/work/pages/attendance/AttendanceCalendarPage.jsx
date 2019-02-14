/*引入css页面*/
import styles from '../../../../../css/routes/work/attendance/attendanceCalendarPage.css'

/*引入函数*/
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getScheduleCalendar,queryWorkCheckBySpecifiedDate } from '../../actions/attendance/attendanceAction.jsx'
/*引入组件*/
import AppHeader from '../../../../components/common/appheader/AppHeader.jsx';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import ScheduleBar from '../../../work/components/attendance/myschedule/ScheduleBar.jsx';
import DatePicker from '../../../../components/common/popup/DatePicker.jsx'


/********考勤-日历页*********/
class AttendanceCalendarPage extends PageComponent{


    static defaultProps={

    }

    constructor(props,context) {
        super(props,context);
        this.state = {
          calendardata:[], //日历
          type:0,
          showdatepicker:false,
          selectdate:this.getNowFormatDate().split('.').join('-'),
          scheduleloadflag:false,
        }
        this.myDateStr = this.getNowFormatDate();
        this.nowDateStr=this.myDateStr.split('.').join('-');
        this.chDateStr='';
        this.daysinMonth=this.getCountDays((new Date()).getFullYear(),(new Date()).getMonth()+1);
        this.defaultProps={

        }
    }
    //获取页面名称
    getPageName(){ return "考勤-日历页"; }

    componentWillMount(){
      this.queryCalendarData();
    }
    componentDidMount(){
        super.componentDidMount();

    }

    componentWillUnmount(){

    }
    calendarItemClick=(date,chday)=>{
      this.chDateStr=chday;
      this.setState({selectdate:date,scheduleloadflag:false,scheduledata:[]});
      var temselectdate = date.split('-');
      var today = temselectdate[0]+temselectdate[1]+temselectdate[2]+"";
      this.props.queryWorkCheckBySpecifiedDate(this,today,this.queryWorkCheckBySpecifiedDateCallBack);
      //this.props.getScheduleList(date,this,this.getScheduleListCallBack);
    }
    getNowFormatDate=()=> {
       var date = new Date();
       var seperator1 = ".";
       var year = date.getFullYear();
       var month = date.getMonth() + 1;
       var strDate = date.getDate();
       if (month >= 1 && month <= 9) {
           month = "0" + month;
       }
       if (strDate >= 0 && strDate <= 9) {
           strDate = "0" + strDate;
       }
       var currentdate = year + seperator1 + month + seperator1 + strDate
       return currentdate;
    }
    getNowWeekDate=()=> {
       var showdate=this.state.selectdate.split('-')
       var week = new Date(showdate[0],showdate[1]-1,showdate[2]).getDay();
       var str="";
         if (week == 0) {
                 str = "日";
         } else if (week == 1) {
                 str = "一";
         } else if (week == 2) {
                 str = "二";
         } else if (week == 3) {
                 str = "三";
         } else if (week == 4) {
                 str = "四";
         } else if (week == 5) {
                 str = "五";
         } else if (week == 6) {
                 str = "六";
         }
         return str;
    }
    getCountDays=(year,month)=> {
         var daysinmonth=new Date(year, month, 0).getDate();
         return daysinmonth;
    }
    //根据年、月获取当月的所有日期，并将值赋给calendardata
    queryCalendarData=()=>{
         var {selectdate}=this.state;
         var year=selectdate.split('-')[0];
         var month=parseInt(selectdate.split('-')[1]);
         this.props.getScheduleCalendar(year,month,this,this.getScheduleCalendarCallBack);
    }
    getScheduleCalendarCallBack=(data)=>{

         this.setState({calendardata:data});
         var {selectdate}=this.state;

         var temObj = data.find((item)=>item.date==selectdate);
         this.chDateStr = temObj.lunar;

         var temselectdate = selectdate.split('-');
         var today = temselectdate[0]+temselectdate[1]+temselectdate[2]+"";
         this.props.queryWorkCheckBySpecifiedDate(this,today,this.queryWorkCheckBySpecifiedDateCallBack);
    }
    queryWorkCheckBySpecifiedDateCallBack=(data)=>{
      this.setState({scheduleloadflag:true})
    }
    onDatePick=(date)=>{
       var day = date.substring(0, date.indexOf(' '));
       this.daysinMonth=this.getCountDays(day.split('-')[0],day.split('-')[1]);
       this.state.selectdate=day;
       this.setState({selectdate:day});
       this.queryCalendarData();
    }
    render(){
        systemApi.log("AttendanceCalendarPage render");
        var program_todayCls=this.mergeClassName(styles.program_today,styles["theme_blue"]);
        var {calendardata,type,scheduledata,selectdate}=this.state;
        var showdate=selectdate.split('-').join('.');
        var week=this.getNowWeekDate();

        var {attanceBehavior} = this.props;//指定日期当天的打卡情况
        var signcnt = 0;
        if (attanceBehavior[0]) {
          if (attanceBehavior[0].btime && attanceBehavior[0].etime) {
            signcnt = 2;
          }else if (attanceBehavior[0].btime || attanceBehavior[0].etime) {
            signcnt = 1;
          }
        }

        // console.log("xxxxxxxxxxxx");
        // console.log(attanceBehavior);

        return (

          <FullScreenView>
            <AppHeader headerName="我的考勤" showBack={true}     />
            <div className='g_full_content_bggray' style={{"overflow":"hidden"}}>
              {/*第一部分——日期选择*/}
              <div className={program_todayCls}>
                  <div className={styles.left}>
                        <div className={styles.program_date}>
                            <DatePicker mode="date" onDatePick={this.onDatePick}
                                        onDatePickCancel=""
                                        minDate={new Date(2017,12,1)}
                                        maxDate="" nowDate="" title="" dismissText="" okText="">
                              <input type="button" value={showdate || showdate}
                                  className={styles.choose} ref='bdateBtn'></input>
                            </DatePicker>
                        </div>
                        <div className={styles.program_detail}>星期{week} 农历{this.chDateStr}</div>
                  </div>
                  <div className={styles.right}>
                          <p>{this.nowDateStr==selectdate?"今天":""}</p>
                  </div>
                  <div className={styles.program_triangle}></div>
              </div>
              {/**************************************************************************************/}
              {/*第二部分——横向滑动日历*/}
              <ScheduleBar data={calendardata} initDate={selectdate} daysinMonth={this.daysinMonth} onSelect={this.calendarItemClick}/>
              {/**************************************************************************************/}
              {/*第三部分——今日打卡次数*/}
              <div className={styles.floor}>
              	<div className={styles.dk_wdkqrl_tj}>
                  	<div className={styles.dk_wdkqrl_count}>今日打卡<span>{signcnt}</span>次</div>
                </div>
              </div>
              {/**************************************************************************************/}
              <div>

              </div>

              {/*第四部分——打卡记录*/}
              {attanceBehavior[0]?
                <div className={styles.floor}>
                	<div className={styles.dk_wdkqrl_main}>
                    	<div className={styles.dk_wdkqrl_box}>
                          {/*考勤状态*/}
                          {attanceBehavior[0].status?
                            <div className={styles.dk_wdkqrl_tags}>
                        
                            </div>:null
                          }
                          {/*上班打卡*/}
                          {attanceBehavior[0].btime?
                            <div className={styles.dk_wdkqrl_list}>
                              	<div className={styles.dk_wdkqrl_detail}>
                                  	<div className={styles.dk_wdkqrl_time}><span>上班打卡时间:{attanceBehavior[0].btime || ""}</span></div>
                                    <div className={styles.dk_ico_fs}>{attanceBehavior[0].btype}</div>
                                    <div className={styles.dk_ico_dz}>{attanceBehavior[0].barea}</div>
                                </div>
                                <div className={styles.dk_wdkqrl_xf}>
                                  	<span className={styles.dk_wdkqrl_round01}></span>
                                  	<span className={styles.dk_wdkqrl_round}></span>
                                </div>
                            </div>:null
                          }
                          {/*下班打卡*/}
                          {attanceBehavior[0].etime?
                            <div className={styles.dk_wdkqrl_list+" "+styles.border_none}>
                              	<div className={styles.dk_wdkqrl_detail}>
                                  	<div className={styles.dk_wdkqrl_time}><span>下班打卡时间:{attanceBehavior[0].etime || ""}</span></div>
                                    <div className={styles.dk_ico_fs}>{attanceBehavior[0].etype}</div>
                                    <div className={styles.dk_ico_dz}>{attanceBehavior[0].earea}</div>
                                </div>
                                <div className={styles.dk_wdkqrl_xf}>
                                  	<span className={styles.dk_wdkqrl_round01+" "+styles.bg_none}></span>
                                  	<span className={styles.dk_wdkqrl_round}></span>
                                </div>
                            </div>:null
                          }
                        </div>
                    </div>
                </div>:null
              }

              {/**************************************************************************************/}
              {/*第五部分——无打卡记录*/}
              {signcnt==0?
                <div className={styles.floor}>
                  <div className={styles.loading_failed}>
                      <span className={styles.dk_jl_none}></span>
                      <p>无打卡记录</p>
                  </div>
                </div>:""
              }

              {/**************************************************************************************/}
            </div>
            {this.props.children}
          </FullScreenView>

        );
    }

}

function injectProps(store) {
    var {attanceBehavior} = store.attendance || {
      attanceBehavior:[]
    };
    return {attanceBehavior}
}

function injectAction(){
    return{getScheduleCalendar,queryWorkCheckBySpecifiedDate};
}

module.exports = connect(injectProps,injectAction())(AttendanceCalendarPage);
