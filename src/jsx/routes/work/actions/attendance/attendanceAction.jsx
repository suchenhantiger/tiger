import {showLoading, hideLoading, showMessage,showPopup,hidePopup} from '../../../../store/actions.jsx';
/*查询是否签到与签退*/
export function loginInfo(component,success_cb,fail_cb){
  return function(dispatch, state){
    dispatch(showLoading());
    Client.sendRequestWS("loginInfo",{actionName:"loginInfo"},(data,success)=>{
      console.log(data);
      dispatch(hideLoading());
      if(success==true){
        var {userUcpId} = data;
          systemApi.setValue("userUcpId",userUcpId);
          dispatch({type:"QUERY_WORKCHECK_DATA",data});
          success_cb && success_cb();
      }else{
          fail_cb && fail_cb();
      }
    });

  }
}


/*向服务端发送经纬度，判断是否进入到考勤范围*/
export function getRangeInfo(component,latitude,longitude,success_cb,fail_cb){
  return function(dispatch, state){
    Client.sendRequestWS("judgeDistance",{
      actionName:"judgeDistance",
      lng:longitude,//当前经度
      lat:latitude,//当前纬度
    },(resData,success)=>{
      if(success == true){
        var coords={};
        coords.is_inrange = resData.status==1?"1":"0";
        coords.lat = resData.lat;
        coords.lon = resData.lng;
        dispatch({type:"QUERY_CHECKRANGE_DATA",data:coords});
        if (success_cb) {
          success_cb(coords);
        };
      }else{
        dispatch({type:"QUERY_NETWORK_ERROR"});
        if (fail_cb) {
          fail_cb();
        };
      }
    });
  }
}

/*通过壳获取当前经纬度，根据获取的经纬度判断是否进入到考勤范围*/
export function getLocationInfo(component,success_cb,fail_cb){
  return function(dispatch, state){
      Client.getLocationInfo((data)=>{//定位成功
        var successFlag = data.success;
        if(successFlag!=true){
          var coords={};
          coords.is_inrange = 2;
          coords.lat = 0;
          coords.lon = 0;
          dispatch({type:"QUERY_CHECKRANGE_DATA",data:coords});
          fail_cb && fail_cb();
          return;
        }
          Client.sendRequestWS("judgeDistance",{
            actionName:"judgeDistance",
            lng:data.lng,//当前经度
            lat:data.lat,//当前纬度
          },(resData,success)=>{
            if(success ==true ){
              var coords={};
              coords.is_inrange = resData.status==1?"1":"0";
              coords.lat = resData.lat;
              coords.lon = resData.lng;
              dispatch({type:"QUERY_CHECKRANGE_DATA",data:coords});
              if (success_cb) {
                success_cb(coords);
              };
            }else{
              dispatch({type:"QUERY_NETWORK_ERROR"});
              fail_cb && fail_cb();
            }
            

          });
        
      });

  }
}


/*签到与签退动作*/
export function signInAndOut(lat,lng,success_cb,fail_cb){
  return function(dispatch, state){

      dispatch(showLoading());
      Client.getImeiInfo((data)=>{//获取imei
          Client.sendRequestWS("doMission",{
            actionName:"doMission",
            imei:data.imei,
            lng,
            lat
          },(data,success)=>{
            dispatch(hideLoading());
            if(success==true){
                success_cb && success_cb("打卡成功！");
            }else {
                fail_cb && fail_cb(data);
            }
            
          });

      });
     
      return;

      component.requestJSON("renderbill/ManageWorkCheckAction.do",{
        managetype: ["workcheck", 1],
        checktype: [checkType, 1],
        lat: [latitude, 1],
        lon: [longitude, 1],
        kick:[1,0],
        rd: [rd, 1],
      }).done((data)=>{
        dispatch(hideLoading());
        if(checkType==1){
          dispatch({type:"SIGN_IN",data:data});
        }else if(checkType==2){
          dispatch({type:"SIGN_OUT",data:data});
        }
        //dispatch({type:"QUERY_WORKCHECK_DATA",data:data});
        if (success_cb) {
          success_cb();
        }
      }).fail((data)=>{
        dispatch(hideLoading());
        if (data.status && data.status=="-10001") {
          dispatch({type:"SIGN_INOROUT_ERROR",data:data.info_detail || ""});
          if (fail_cb) {
            fail_cb(data.info_detail || "");
          }
        }else {
          dispatch(showMessage('error', data.info_detail || "签到或者签退失败！"));
        }
      });
  }
}

/*获取当前年当前月的所有日期*/
export function getScheduleCalendar(year,month,component,success_cb){
    return function(dispatch, state){
        dispatch(showLoading());
                component.requestJSON("renderbill/QueryNoAuthInfoAction.do",{
                  querytype:["menology",1],
                  year:[year,1],
                  month:[month,1],
                  kick:["1", 0]
                }).done((data)=>{
                  dispatch(hideLoading());

                  if(success_cb)
                     success_cb(data.rows);


              }).fail((data)=>{
                dispatch(hideLoading());
                dispatch(showMessage('error',data.info_detail));
              });
  }
}
/*查询特定日期的打卡情况*/
export function queryWorkCheckBySpecifiedDate(component,day,success_cb,fail_cb){
  return function(dispatch, state){
      component.requestJSON("renderbill/QueryWorkCheckAction.do",{
        querytype: ["checkforday", 1],
        day: [day, 1],
        kick:[1,0]
      }).done((data)=>{
        dispatch({type:"QUERY_ATTENDANCE_BEHAVIOR",data:data.rows || data.list || []});
        if (success_cb) {
          success_cb();
        }
      }).fail((data)=>{
        dispatch(showMessage('error', data.info_detail || "查询签到或者签退情况失败！"));
        if (fail_cb) {
          fail_cb();
        }
      });
  }
}
/*查询指定年月（如201712）我的考勤打卡列表数据*/
export function getMyAttendenceLogList(params, isAppend, cb, updateList){
  return function(dispatch, state){
    var {currentYear,
      currentMonth} = params;
    Client.sendRequestWS("statisticsClockInfoBetweenDate",
    {
      actionName:"statisticsClockInfoBetweenDate",
      year:currentYear,
      month:currentMonth,
      userUcpId:systemApi.getValue("userUcpId")
    },(data,success)=>{
      console.log(data);
      if(success==true){
        var {attenceClockRecordDTOList,normalNum=0,lateNum=0,tardyNum=0,absenceNum=0} = data;
        var mycheckTotal = {
          islater:lateNum,
          isearly:tardyNum,
          isabsent:absenceNum,
          isnormal:normalNum
        }
        dispatch({type:"QUERY_MYCHECK_TOTAL",data:mycheckTotal});

        updateList && updateList(attenceClockRecordDTOList || []);
        cb && cb(null,false);
      }else{
        dispatch(showMessage('error',"获取打卡详情失败！"));
        cb && cb();
      }
    });
    return;


      component.requestJSON("renderbill/QueryWorkCheckAction.do",{
        querytype:["mycheckDetail",1],
        kick:["1",0],
        ...params
      }).done((data)=>{
        var {list} = data;
        updateList && updateList(list || []);
        cb && cb();

      }).fail((data)=>{
        dispatch(showMessage('error', data.info_detail || "获取打卡详情失败！"));
        cb && cb();
      });
  }
}
/*查询指定年月（如201712）的统计数据*/
export function getMyAttendenceTotal(component,month,success_cb,fail_cb){
  return function(dispatch, state){
    Client.sendRequestWS("loginInfo",{actionName:"loginInfo"},(data,success)=>{
      console.log(data);
      if(success==true){
          dispatch({type:"QUERY_WORKCHECK_DATA",data});
          success_cb && success_cb();
      }else{
          fail_cb && fail_cb();
      }
    });


    return;
      component.requestJSON("renderbill/QueryWorkCheckAction.do",{
        querytype:["mycheckTotal",1],
        month:[month,1],
        kick:["1",0]
      }).done((data)=>{
        var islater = 0,
            isearly = 0,
            isabsent = 0,
            isnormal = 0;
        var mycheckTotal = {
          islater:islater,
          isearly:isearly,
          isabsent:isabsent,
          isnormal:isnormal
        }
        dispatch({type:"QUERY_MYCHECK_TOTAL",data:mycheckTotal});
        success_cb && success_cb(data);
      }).fail((data)=>{
        dispatch(showMessage('error', data.info_detail || "获取打卡统计数据失败！"));
        fail_cb && fail_cb();
      });
  }
}

