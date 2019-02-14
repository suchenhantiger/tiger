import {connect} from 'react-redux';
import styles from '../../../../../css/routes/work/attendance/attendanceSignPage.css';
import { loginInfo,signInAndOut,
    getLocationInfo,
    getRangeInfo } from '../../actions/attendance/attendanceAction.jsx'
import { showMessage,showLoading } from '../../../../store/actions.jsx';
/*引入组件*/
import AppHeader from '../../../../components/common/appheader/AppHeader.jsx';
import AlertPopUp from '../../../../components/common/popup/AlertPopUp.jsx'
import ConfirmPopUp from '../../../../components/common/popup/ConfirmPopUp.jsx'
import UserPhoto from '../../../../components/common/user/UserPhoto';
import IScrollView from '../../../../components/common/iscroll/IScrollView.jsx'
class AttendanceSignPage extends PageComponent {
    static defaultProps={
        
    }

    constructor(props) {
        super(props);
        this.state = {
            signInFlag:false,//确认上班打卡标志 false-隐藏上班打卡成功弹出框 true-弹出上班打卡成功弹出框
            signOutFlag:false,//确认下班打卡标志 false-隐藏确认下班打卡弹出框 true-弹出确认下班打卡弹出框
            errorFlag:false,//打卡失败标志 false-隐藏打卡失败弹出框 true-弹出打卡失败弹出框
            signError:"打卡失败，请重新定位打卡",//未连接wifi时错误弹出框的内容
            signOutSuccFlag:false,//下班打卡成功标识， false-隐藏下班打卡成功弹出框 true-显示下班打卡成功弹出框
            locatedFlag:false,//定位完成标志位 false-定位中 true-定位完成（无论成功或者失败）
            signAudioPlayFlag:systemApi.getValue("signAudioPlayFlag") || "true",//播放打卡音效标志位
        }
    }
      //获取页面名称
    getPageName(){ return "考勤--打卡"; }
    componentWillMount(){
    }
    componentWillReceiveProps(nextProps){
        
    }
    componentDidUpdate(){

    }
    componentDidMount(){
      // if(browser.versions.ios)
        this.props.loginInfo(this,()=>{
          this.props.getLocationInfo(this,this.getLocationInfoCallBack,this.getLocationInfoCallBack);
        });
    }
    componentWillUnmount(){
        super.componentWillUnmount();
    }

    //获取定位信息回调函数
    getLocationInfoCallBack=()=>{
      this.setState({locatedFlag:true})
    }

     //签到
    signIn=()=>{
      var {punch} = this.props;
      var {userList=[]} = punch;
      var todayClockInfo = {};
      if(userList.length>0){
        todayClockInfo = userList[0];
      }
      var {clockSimpleInfoDTO={}} = todayClockInfo;
      var {step}=clockSimpleInfoDTO;
      if(step==1)
          this.clock("1");
      else
          this.setState({signOutFlag:true});
    }

    //确认下班打卡
    onSureSignOut=()=>{
      this.setState({signOutFlag:false});//隐藏确认下班打卡弹出框
      this.clock("2");
    }

     //确认上班打卡
     onSureSignIn=()=>{
      this.setState({signInFlag:false});
      this.props.loginInfo(this,()=>{
        this.props.getLocationInfo(this,this.getLocationInfoCallBack,this.getLocationInfoCallBack);
      });
    }

    onCancelSignOut=()=>{
      this.setState({signOutFlag:false});
    }

    //上班打卡成功回调
    signInSuccCallBack=(info_detail)=>{
      //弹出上班打卡成功弹出框
      this.setState({signInFlag:true});
    }

    onSureError=()=>{
      this.setState({errorFlag:false});
      this.props.getLocationInfo(this,this.getLocationInfoCallBack,this.getLocationInfoCallBack);
  
    }

    //下班打卡成功回调
    signOutSuccCallBack=()=>{
      //弹出下班打卡成功弹出框
      this.setState({signOutSuccFlag:true});
    }

    //打卡失败
    errorCallBack=(info_detail)=>{
      this.setState({errorFlag:true,signError:info_detail});
    }

        //打卡操作
    clock=(checkType)=>{
          var latitude="";
          var longitude="";
          var callBack = checkType=="1"?this.signInSuccCallBack:this.signOutSuccCallBack;
          this.props.showLoading();
          Client.getLocationInfo((data)=>{//获取经纬度成功
            var successFlag = data.success;
            if(successFlag!=true){
              latitude=0;
              longitude=0;
            }else{
              latitude=data.lat;
              longitude=data.lng;
            }
              this.props.signInAndOut(latitude,longitude,callBack,this.errorCallBack);
              this.setState({locatedFlag:false})
          });
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

     //确认下班打卡成功
     onSureSignOutSucc=()=>{
      //隐藏下班打卡成功弹出框
      this.setState({signOutSuccFlag:false});
 
      this.props.loginInfo(this,()=>{
        this.props.getLocationInfo(this,this.getLocationInfoCallBack,this.getLocationInfoCallBack);
      });
    }


     //获取当前定位信息
     locationInfo=()=>{
    
              var { coords } = this.props;
              var { is_inrange } = coords;
              var { locatedFlag } = this.state;
              if (locatedFlag) {
                if (is_inrange == "1") {
                  return (
                    <div className={styles.dk_enterbox}>
                      <span className={styles.dk_enter}>已进入考勤范围</span><span className={styles.dk_tomap} onClick={this.Relocate}>重新定位</span>
                    </div>);
                } else if (is_inrange == "0") {
                  return (
                    <div className={styles.dk_enterbox}>
                      <span className={styles.dk_enter + " " + styles.dk_enter_none}>未进入考勤范围</span> <span className={styles.dk_tomap} onClick={this.Relocate}>重新定位</span>
                    </div>);
                } else {
                  return (//因为判断是否进入考勤范围时在服务端进行，所以存在请求挂了的情况
                    <div className={styles.dk_enterbox}>
                      <p> <span className={styles.dk_enter + " " + styles.dk_enter_none}>定位失败</span><span className={styles.dk_tomap} onClick={this.Relocate}>重新定位</span></p>
                      <p>网络异常或未允许访问GPS</p>
                    </div>);
                }
              } else {
                return (
                  <div className={styles.dk_enterbox}>
                    <span className={styles.dk_enter + " " + styles.dk_position}>定位中...</span>
                  </div>);
              }
        
      }

          //重新定位
    Relocate=()=>{
      this.setState({locatedFlag:false});
      //判断当前位置是否进入到打卡范围
      this.props.getLocationInfo(this,this.getLocationInfoCallBack,this.getLocationInfoCallBack);
      

    }

    //打开或关闭音效按钮
    audioButton=()=>{
      var tem = this.state.signAudioPlayFlag;
      if (tem=="true") {
        tem = "false";
      }else{
        tem="true";
      }
      this.setState({signAudioPlayFlag:tem});
      systemApi.setValue("signAudioPlayFlag",tem);

    }


    //获得当前日期（2017.12.27）
    getNowFormatDate=(timestamp)=> {
        var date = new Date();
        if(timestamp) date = new Date(timestamp);
        else date = new Date();
       
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

    goToAttendanceCalendarPage=()=>{
        var path={
          pathname:'/work/attendance/attendancecalendar',
        }
        hashHistory.push(path);
      }

    //打卡失败错误提示
    renderHtml(errorMassage){
        return "<p>"+errorMassage+"</p>";
    }
    getScrollStyle=()=>{
        return styles.scrollView;
      }

          //无论请求成功与否，都要刷新iscoll，并隐藏转圈
    queryWorkCheckCallBack=()=>{
      if(this.refs.scroll){
          this.refs.scroll.refresh();
          this.refs.scroll.hideLoading();
      }
    }

    iscollUpfresh=()=>{
      this.props.loginInfo(this,()=>{
        this.queryWorkCheckCallBack();
        this.props.getLocationInfo(this,this.getLocationInfoCallBack,this.getLocationInfoCallBack);
      });
    }
    renderShiftList=()=>{
      var {punch} = this.props;
      var {attenceClockRecordDTOList=[]} =punch;
      return attenceClockRecordDTOList.map((item, index) => {
        var {shift,step,status,clockTime,robot} = item;
        var banci = this.getShiftStr(shift,step);
        var statusStr = "正常"; //2迟到，3早退，4缺勤
        var clockTimeStr = "打卡时间:"+clockTime;
        if(status==2)
          statusStr = "迟到";
        else if(status==3)
          statusStr = "早退";
        else if(status==4){
          statusStr = "缺勤";
        }
        if(robot&& robot==true)
          clockTimeStr=""
        return (
          <div>
            <div className={styles.dk_banci}>
                  <span style={{color:"#3492e9",fontSize:".3rem"}}>● </span>
                  <span className={styles.dk_slogn} style={{fontSize:".3rem"}} > {banci}</span>
            </div>
            <div className={styles.shift_status_div} >
                  <span className={status==1?styles.shift_status:styles.shift_status+" "+styles.shift_status_err} >{statusStr}</span>
                  <span className={styles.dk_slogn} style={{ "marginLeft": "0.2rem"}} >{clockTimeStr}</span>
            </div>
            
          </div>
        );
    });

    }

    render(){
        systemApi.log("AttendanceSignPage render");
        var {signInFlag,signOutFlag,errorFlag,signError,signOutSuccFlag,signAudioPlayFlag} = this.state;
        var {punch,coords} = this.props;
        var {stdTime="",stdTimeStamp,workDay,userName,userList=[]} = punch;
        var todayClockInfo = {};
        if(userList.length>0){
          todayClockInfo = userList[0];
        }
        var {clockSimpleInfoDTO={}} = todayClockInfo;
        var {shift,step,belongDate}=clockSimpleInfoDTO;
        var { is_inrange } = coords;
        //获取当日日期
        //var currentdate = this.getNowFormatDate();
        
        // var date = new Date(stdTime);
        // var h = date.getHours();
        // h = h < 10 ? ('0' + h) : h;
        // var minute = date.getMinutes();
        // var second = date.getSeconds();
        // minute = minute < 10 ? ('0' + minute) : minute;  
        // second = second < 10 ? ('0' + second) : second; 
        // var in_time = h+':'+minute+':'+second;


        var banci = "当前打卡："+this.getShiftStr(shift,step);

        // alert(signOutSuccFlag);

        return (
          <div>
            <div className='g_full_content_noheader_withbottom' style={{"overflow":"hidden"}}>
                {/*渲染头部的个人信息和当天日期*/}
                <div className={styles.floor}>
                    	<div className={styles.dk_people}>
                        	<div className={styles.dk_name}>
                            	<div className={styles.dk_user_image}><UserPhoto id={0} type="0" gender={1}/></div>
                              <p>{userName}</p>
                          </div>
                          <div className={styles.dk_time}>
                            	<a className={styles.icon_arrow}>{belongDate}</a>
                          </div>
                      </div>
                </div>
                {/***************************/}
                {/*渲染中部的鸡汤标题、上下班打卡以及打卡网络使用提示*/}
                <IScrollView
                  scrollclassName={this.getScrollStyle()}
                  canUpFresh={true}
                  upFresh={this.iscollUpfresh}
                  ref="scroll"
                >
                <div className={styles.floor}>
                    	<div className={styles.dk_main}>
                        	<div className={styles.dk_slogn}>坚持是世界上最难的事情，也是最容易的事情</div>
                            {this.renderShiftList()}
                            <div className={styles.dk_banci}>
                                  <span style={{color:"#3492e9",fontSize:".3rem"}}>● </span>
                                  <span className={styles.dk_slogn} style={{fontSize:".3rem",color:"#3492e9"}} > {banci}</span>
                            </div>
                          {workDay==true?
                          <div className={styles.dk_btn_box} style={{touchAction: "none"}}>
                                <a className={styles.morning} onClick={this.signIn}>
                                  <div className={styles.dk_work_over}>
                                  	<span>立即打卡</span>
                                  	{/* <span className={styles.dk_over_time}>{in_time?in_time:null}</span> */}
                                  </div>
                                </a>
                                <span className={styles.dk_tips}>使用GPS定位打卡</span>
                                {this.locationInfo()}

                          </div>:
                          <div className={styles.dk_btn_box+" "+styles.screencenter} style={{touchAction: "none"}}>
                                <a className={styles.on} >今天您休息</a>
                          </div>
                          }
                      </div>
                </div>
                </IScrollView>
   
                {signInFlag?
                  <AlertPopUp hidetitle={true} suretxt={ "打起精神 迎接挑战"} onSure={this.onSureSignIn}>
                    <div className={styles.pp_mid01} >
                      <div className={styles.dk_voice_box} >
                          {signAudioPlayFlag=="true"?
                            <a className={styles.dk_ico_voice} onClick={this.audioButton}>点击关闭
                              <audio src="./images/dk_img/check_in.mp3" autoPlay={true}  />
                            </a>:
                            <a className={styles.dk_ico_voice+" "+styles.dk_ico_voice_off} onClick={this.audioButton}>点击打开</a>
                          }
                      </div>
                      <span className={styles.dk_over+" "+styles.dk_blue}>打卡成功</span>
                      {/* <span className={styles.dk_tc_color}><i>{info_detail}</i></span> */}
                      <span className={styles.dk_bg_ok}></span>
                    </div>
                  </AlertPopUp>:null
                }
                {signOutSuccFlag?
                  <AlertPopUp hidetitle={true} suretxt={"下班打卡成功"} onSure={this.onSureSignOutSucc}>
                    <div className={styles.pp_mid01}>
                      <div className={styles.dk_voice_box}>
                          {signAudioPlayFlag=="true"?
                            <a className={styles.dk_ico_voice} onClick={this.audioButton}>点击关闭
                              <audio src="./images/dk_img/check_out.mp3" autoPlay={true} />
                            </a>:
                            <a className={styles.dk_ico_voice+" "+styles.dk_ico_voice_off} onClick={this.audioButton}>点击打开</a>
                          }
                      </div>
                      <span className={styles.dk_over+" "+styles.dk_blue}>打卡成功</span>
                      {/* <span className={styles.dk_tc_color}><i>{info_detail}</i></span> */}
                      <span className={styles.dk_bg_ok}></span>
                    </div>
                  </AlertPopUp>:null
                }
                {/***************************/}
                {/*下班打卡确认弹出框*/}
                {signOutFlag?
                  <ConfirmPopUp title="温馨提示" titlealign="center" titletheme="y" onSure={this.onSureSignOut} onCancel={this.onCancelSignOut} canceltxt="不打卡">
                    <div className={styles.pp_mid02}>
                       {/*<p>下班卡每天只能打一次，</p>*/}
                       <p>您确定打下班卡吗？</p>
                    </div>
                  </ConfirmPopUp>:null
                }
               
                {errorFlag?
                  <AlertPopUp hidetitle={true} suretxt="知道了" onSure={this.onSureError} btnBackColor='red'>
                    <div className={styles.pp_mid01}>
                        <div className={styles.dk_voice_box}>
                            {signAudioPlayFlag=="true"?
                              <a className={styles.dk_ico_voice} onClick={this.audioButton}>点击关闭
                                <audio src="./images/dk_img/fail.mp3" autoPlay={true} />
                              </a>:
                              <a className={styles.dk_ico_voice+" "+styles.dk_ico_voice_off} onClick={this.audioButton}>点击打开</a>
                            }
                        </div>
                    	  <span className={styles.dk_over+" "+styles.dk_lose_red}>打卡失败</span>
                       	<span className={styles.dk_lose_ok}></span>
                        <span className={styles.dk_lose_tips+" "+styles.dk_lose_red} dangerouslySetInnerHTML={{__html:this.renderHtml(signError)}}></span>
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
    var {punch,coords} = store.attendance || {
      punch:{
        is_in:0,//签到
        is_out:0,//签到
        info:"",
        info_detail:"",
        errorMassage:"",//错误信息
      },
      coords:{
        is_inrange: "0",//是否在打卡范围内 "0"-不在 "1"-在  "-1"-请求失败 "2"-GPS定位失败
          lat:"",//经度
          lone:"",//纬度
      },
    };
    return {punch,coords}
}
function injectAction(){
    return{loginInfo,signInAndOut,getLocationInfo,getRangeInfo,showMessage,showLoading};
}

module.exports = connect(injectProps, injectAction())(AttendanceSignPage);



