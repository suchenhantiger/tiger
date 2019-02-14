/*引入css页面*/
import styles from '../../../../../css/components/work/attendance/myAttendanceLogList.css';
/*引入函数*/
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getMyAttendenceLogList } from '../../actions/attendance/attendanceAction.jsx'

/*引入组件*/


/****考勤-统计-我的-考勤日志列表****/
class MyAttendenceLogList extends CursorList{
  //构造函数
  constructor(props,context) {
      super(props,context);
  }

  getScrollStyle(){
      return styles.scrollView;
  }
  getCanUpFreshFlag(){
      return this.props.canupfresh;
  }
  getCanDownFreshFlag(){
      return this.props.candownfresh;
  }

  getListStyle(){
    return styles.scrollView;
  }

  /**
  * getData 获取数据
  * @param page 页码
  * @param isAppend 请求数据是否追加在尾部
  */
  getData(page,isAppend,cb,nextProps){
    if(nextProps){
      var {currentData,currentYear,currentMonth} = nextProps;
    }
    const pagesize = 40;
    var params = {
        currentYear,
        currentMonth
    }
    console.log(params);
    this.props.getMyAttendenceLogList(params, isAppend, cb,this.getMyAttendenceLogList_succb(page, isAppend));
  }

  getMyAttendenceLogList_succb(page, isAppend){
    return (data)=>{
      var list = data;

      if (list) {
        if (isAppend) {
          list = this.state.data.concat(list);
          this.nextIndex++;
        }else if (page==0 && !isAppend) {
          this.nextIndex++;
        }
        this.setState({data: list});
      }
    }
  }

  getStatusColor=(status)=>{
      if (status !=1) {
        return this.mergeClassName(styles.dk_mu_ztlist, styles.red);
      }else {
        return this.mergeClassName(styles.dk_mu_ztlist, styles.blue);
      }
  }

  getShiftStr(shift,step){
    var shiftStr="";
    if(shift==1){
        shiftStr = "上午";
    }else if(shift==2){
        shiftStr = "下午";
    }else{
        shiftStr = "-";
    }
    if(step==1){
        shiftStr += "上班";
    }else if(step==2){
        shiftStr += "下班";
    }else
        shiftStr += "-";
    return shiftStr;
}


  renderList=()=>{
    var list=[];
    var {data}=this.state;
    if (data.length && data.length>0) {
        var belongDataTem ="";
        var calendar ="";
      for (var i = 0; i < data.length; i=i+1) {
        var{status,step,shift,clockTime,belongClockDate,robot}=data[i];
        var statusStr = "正常";
        if(status==2)statusStr = "迟到";
        else if(status==3)statusStr = "早退";
        else if(status==4)statusStr = "缺勤";
        if(belongDataTem != belongClockDate){
            belongDataTem = belongClockDate;
            calendar =belongClockDate;
        }else{
            calendar="";
        }
        var banci = this.getShiftStr(shift,step);
        list.push(
          <div className={styles.dk_my_list}>
          {calendar.length>1?
            <ul style={{paddingTop:"0.02rem",borderTop: "1px solid #F00",borderColor: "#f0f1f5"}}>
                <li className={styles.dk_my_w30}>{calendar}</li>     
            </ul>
            :null
            }
            	
            <ul>
                <li className={styles.dk_my_w30}><span><i>{banci} </i></span></li>
                  <li className={styles.status_str} style={{    width: "15%"}}>
                    <span className={status==1?styles.shift_status:styles.shift_status+" "+styles.shift_status_err} >{statusStr}</span>
                </li>
                <li ><span> {robot==true?"无":clockTime} </span></li>
              </ul>

          </div>
        );
      }
    }
    return list;
  }
  //渲染函数
  render(){
      //打印渲染日志，必写
      systemApi.log("MyAttendenceLogList render");
      return super.render();
  }
}

function injectAction(){
  return {getMyAttendenceLogList};
}

module.exports = connect(null, injectAction())(MyAttendenceLogList);
