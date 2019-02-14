/*引入css页面*/
import styles from '../../../../../css/routes/work/attendance/attendanceStatsMyPage.css'

/*引入函数*/
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getMyAttendenceTotal } from '../../actions/attendance/attendanceAction.jsx'

/*引入组件*/
import MyAttendenceLogList from '../../components/attendance/MyAttendanceLogList.jsx';


/********考勤-统计-我的页*********/
class AttendanceStatsMyPage extends PageComponent{
    static defaultProps={

    }

    constructor(props,context) {
        super(props,context);
        this.state = {
          selectdate:this.getNowFormatMonth(),
          premonth:this.getPreDate(),//当前月份前一个月的最后一天
        }
        this.defaultProps={

        }
    }
      //获取页面名称
    getPageName(){ return "考勤之我的页"; }

    componentWillMount(){
    }
    componentDidMount(){

        this.getPreDate();

        super.componentDidMount();
    }

    componentWillUnmount(){

        super.componentWillUnmount();

    }
    //获得当前月份（2017-12）
    getNowFormatMonth=()=> {
       var date = new Date();
       var seperator1 = "-";
       var year = date.getFullYear();
       var month = date.getMonth() + 1;
       var strDate = date.getDate();
       if (month >= 1 && month <= 9) {
           month = "0" + month;
       }
       var currentdate = year + seperator1 + month
       return currentdate;
    }

    //获取当前日期前两个月
    getPreDate=()=>{
//       let date = new Date();
//       var curdate = date.getDate();
//   //    date.setDate(-1);//上一月，当前月为一月时这种写法会退到上一年十二月
//       date.setDate(0)//获取上月最后一天日期
    var pre = new Date();
    pre.setFullYear(pre.getFullYear()-1);
      return pre;

    }


    onDatePick=(date)=>{
       var day = date.substring(0, date.indexOf(' '));
       var datearr=day.split('-')
       this.setState({selectdate:datearr[0]+'-'+datearr[1]});


    }
    renderList=()=>{

    }

    render(){
        systemApi.log("AttendenceStatsMyPage render");
        var {mycheckTotal} = this.props;
        var {islater,isearly,isabsent,isnormal} = mycheckTotal;
        var {selectdate,premonth}=this.state;
        var datearr=selectdate.split('-');
        var currentData = datearr[0]+datearr[1]+'';
        var currentYear = Number(datearr[0]);
        var currentMonth = Number(datearr[1]);
        console.log("----------------->");
        console.log(premonth);


        return (

          <div className={styles.floor_gray}>
            <div className={styles.dk_month_datebox}>
              	<div className={styles.left}>我的打卡记录</div>
              	<div className={styles.right}>
                  	<a className={styles.ico_arrow_left+" "+styles.on}></a>
                      <span className={styles.datebox}>
       
                      </span>
                </div>
            </div>
            <div className={styles.dk_my_all}>
                <ul>
                    <li><p>正常考勤</p><span>{isnormal}</span></li>
                    <li><p>迟到</p><span className={styles.red}>{islater}</span></li>
                    <li><p>早退</p><span className={styles.red}>{isearly}</span></li>
                    <li className={styles.border_none01}><p>缺勤</p><span className={styles.red}>{isabsent}</span></li>
                </ul>
            </div>
            <MyAttendenceLogList canupfresh={true} candownfresh={false} ref="MyAttendenceLogList" 
            currentYear={currentYear}
            currentMonth={currentMonth}
            currentData={currentData}/>
            {this.props.children}
          </div>

        );
    }

}

function injectProps(store) {
    var {mycheckTotal} = store.attendance || {
      mycheckTotal:{
        earlier_cnt:0,//早退
        late_cnt:0,//迟到
        miss_cnt:0,//缺卡
        month:"",//年月（yyyyxx格式）
        normal_cnt:0,//正常
      }
    };
    return {mycheckTotal}
}

function injectAction(){
    return{getMyAttendenceTotal};
}

module.exports = connect(injectProps,injectAction())(AttendanceStatsMyPage);
