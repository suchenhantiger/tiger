/*引入css页面*/
import styles from '../../../../../css/routes/work/attendance/attendenceStatsPage.css';
/*引入函数*/
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getLeaderAuth,confirmMonthReport } from '../../actions/attendance/attendanceAction.jsx';

/*引入组件*/
import AppHeader from '../../../../components/common/appheader/AppHeader.jsx';
import SubTabs from '../../../../components/common/subtabs/SubTabs.jsx';
import UlineTab from '../../../../components/common/subtabs/UlineTab.jsx';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad.jsx';
import AttendenceStatsDayPage from '../attendance/AttendenceStatsDayPage.jsx';
import AttendenceStatsMonthPage from '../attendance/AttendenceStatsMonthPage.jsx';
import AttendenceStatsMyPage from '../attendance/AttendenceStatsMyPage.jsx';
import AttendanceStatsConfirmPage from '../attendance/AttendanceStatsConfirmPage.jsx';
import AlertPopUp from '../../../../components/common/popup/AlertPopUp.jsx';


/********考勤-统计*********/
class AttendenceStatsPage extends PageComponent{


    constructor(props,context) {
        super(props,context);
        this.state = {
          index:Cache.getValue("attendance_stats_index") || 0,//标签切换 0-日统计 1-月统计 2-我的 3-考勤确认
          ismanager:false,//是否具有日统计和月统计权限
          isdeptleader:false,//是否具有考勤月报确认权限（1级部门负责人）
          dateparam:props.query || this.getNowFormatMonth(),
          confirmFlag:"0",//判断月报状态 "0"-未生成 "1"-生成未确认 "2"-生成已确认
          confirmAlert:false//月报审批成功，弹窗标识 false-隐藏弹窗 true 显示弹窗
        }
    }
      //获取页面名称
    getPageName(){ return "考勤-统计"; }

    componentWillMount(){
      this.props.getLeaderAuth(this,(data)=>{
        this.setState({ismanager:data.ismanager==0?false:true,isdeptleader:data.isdeptleader==0?false:true})
      });
    }
    componentDidMount(){
        Cache.remove("attendance_stats_index");
        super.componentDidMount();
    }

    //切换tab函数
    tabChange=(index)=>{
        this.setState({index});
    }
    renderTabs=()=>{
      var {ismanager, isdeptleader}=this.state;
      var list=[];
      if(ismanager){
        list.push(<UlineTab text="日统计" />);
        list.push(<UlineTab text="月统计" />);
        //高管过滤"我的"页
        if(this.isleader!='1'){
          list.push(<UlineTab text="我的" />);
        }
        if (isdeptleader) {
          list.push(<UlineTab text="考勤确认" />);
        }

      }
      else{
          list.push(<UlineTab text="我的" />);
      }
      return list;
    }
    renderPages=()=>{
      var {ismanager}=this.state,
          {isincheckday, query} = this.props;

      var list=[];
      if(ismanager){
        list.push(<AttendenceStatsDayPage />);
        list.push(<AttendenceStatsMonthPage />);
        list.push(<AttendenceStatsMyPage />);
        list.push(<AttendanceStatsConfirmPage cb={this.getDateParam} date={query} getConfirmStatus={this.isConfirm} />);
      }
      else{
          list.push(<AttendenceStatsMyPage />);
      }
      return list;

    }
    /**模块右上角编辑按钮渲染**/
    renderRightIcon=()=>{
        var {index,confirmFlag} = this.state;
        var {isincheckday} = this.props;
        // alert(isincheckday);
        //alert(confirmFlag);
        if (index=="3") {
          // if (confirmFlag=="1") {//未确认
          //   return (<a onClick={isincheckday=="1"?this.confirmClick:null} style={isincheckday=="1"?null:{color:'#b3b3b3'}}>确认</a>);
          // }else if (confirmFlag=="2") {//已确认
          //   return (<a  style={{color:'#b3b3b3'}}>已确认</a>);
          // }else {
          //   return null;
          // }

          if (confirmFlag=="1") {//未确认
            if (isincheckday=="1") {//到了可以确认的时间
              return (<a onClick={this.confirmClick}>确认</a>);
            }else {
              return null;
            }
          }else if (confirmFlag=="2") {//已确认
            return (<a  style={{color:'#b3b3b3'}}>已确认</a>);
          } else {
            return null;
          }

        }else {
          return null;
        }

    }
    //获得当前月份（201712）
    getNowFormatMonth=()=> {
       var date = new Date();
       var seperator1 = "-";
       var year = date.getFullYear();
       var month = date.getMonth() + 1;
       var strDate = date.getDate();
       if (month >= 1 && month <= 9) {
           month = "0" + month;
       }
       var currentdate = year + seperator1 + month;
       return currentdate;
    }

    getDateParam=(date)=>{
      this.setState({dateparam:date});
    }

    confirmClick=()=>{
      var {dateparam} = this.state;
      var datearr=dateparam.split('-');
      var date = datearr[0]+""+datearr[1];
      var params = {
        month:[date,1],
      }
      this.props.confirmMonthReport(params,null,this,this.updateList);
    }
    updateList=()=>{
      this.setState({confirmFlag:"2",confirmAlert:true});
      Event.fire("UPDATE_REPORT_LIST");
    }

    isConfirm=(isconfirm)=>{
      this.setState({confirmFlag:isconfirm});
      //alert(isconfirm);
    }

    onSureConfirm=()=>{
      this.setState({confirmAlert:false});
    }

    render(){
        systemApi.log("AttendenceStatsPage render");
        var {index,confirmAlert} = this.state;
        return (

          <div>
            <AppHeader headerName="统计" showBack={true}  iconRight={this.renderRightIcon()} />
            <div className='g_full_content_bggray' style={{"overflow":"hidden"}}>
              <SubTabs onTabChange={this.tabChange} index={index}>
                  {this.renderTabs()}
              </SubTabs>

              <LazyLoad index={index}>
                  {this.renderPages()}
              </LazyLoad>
              {/*考勤月报确认成功弹出框*/}
              {confirmAlert?
                <AlertPopUp title="温馨提示" titlealign="center" titletheme="y" suretxt="确认" onSure={this.onSureConfirm}>
                  <div className={styles.pp_mid01}>
                        <span className={styles.dk_over}>考勤月报确认成功</span>
                        {/*<span className={styles.dk_tc_color}>{info_detail}</span>*/}
                  </div>
                </AlertPopUp>:null
              }

            </div>
            {this.props.children}
          </div>

        );
    }

}

function injectProps(store) {
    var {isincheckday} = store.attendance || {
      isincheckday:"0"
    };
    return {isincheckday}
}

function injectAction(){
    return{getLeaderAuth,confirmMonthReport};
}

module.exports = connect(injectProps,injectAction())(AttendenceStatsPage);
