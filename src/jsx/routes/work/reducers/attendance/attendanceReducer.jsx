module.exports = function attendance(state,action){
    var {type} = action;
      state = state || {
        punch:{
          userName:"--",
            stdTime:0,	//	系统时间搓
            isWorkDay:false,				//	是否工作日
            shift:0,//1第一班，2第二班
            step:0,//1签到，2签退
            belongClockDate:"--------",//属于的打卡日期
            todayClockRecordDTOList:[]
        },
        //坐标信息，是否在打卡范围
        coords:{
            is_inrange:"0",//是否在打卡范围内 "0"-不在 "1"-在  "-1"-请求失败 "2"-GPS定位失败
            lat:"",//经度
            lon:"",//纬度
        },
        //上下班打卡详细情况
        attanceBehavior:[],
        //我的某年月（如201712）的考勤统计
        mycheckTotal:{
          islater:0,
          isearly:0,
          isabsent:0,
          isnormal:0
        },
        //月报确认表
        confirmList:[],
        //月报是否在审批期内
        isincheckday:"0" //"0"-不在考勤期内 "1"-在考勤期内
      }
      //获取签到信息
      if(type == "QUERY_WORKCHECK_DATA"){
        return Object.assign({},state,{
          punch:action.data
        });
      }
      else if (type=="QUERY_WORKCHECK_DATA_ERROR") {
        return Object.assign({},state,{
          punch:{
            is_in:0,//签到
            is_out:0,//签到
            in_time:null,//签到时间
            out_time:null,//最后一次签退时间
            is_jyr:1,//1-交易日 0-非交易日
            info:"",
            info_detail:"",
            errorMassage:action.data,//错误信息
          }
        });
      }
      //上班签到
      else if (type=="SIGN_IN") {
        return Object.assign({},state,{
          punch:{
            is_in:1,//签到
            is_out:state.punch.is_out,//签到
            in_time:action.data.info_detail,//签到时间
            out_time:state.punch.out_time,//最后一次签退时间
            is_jyr:state.punch.is_jyr,//1-交易日 0-非交易日
            info:action.data.info,
            info_detail:action.data.info_detail,
            errorMassage:"",//错误信息
            pop_msg:action.data.pop_msg,//打卡成功鼓励语
          }
        });
      }
      //下班签退
      else if (type=="SIGN_OUT") {
        return Object.assign({},state,{
          punch:{
            is_in:state.punch.is_in,//签到
            is_out:1,//签到
            in_time:state.punch.in_time,//签到时间
            out_time:action.data.info_detail,//最后一次签退时间
            is_jyr:state.punch.is_jyr,//1-交易日 0-非交易日
            info:action.data.info,
            info_detail:action.data.info_detail,
            errorMassage:"",//错误信息
            pop_msg:action.data.pop_msg,//打卡成功鼓励语
          }
        });
      }
      //打卡失败
      else if (type=="SIGN_INOROUT_ERROR") {
        return Object.assign({},state,{
          punch:{
            is_in:state.punch.is_in,//签到
            is_out:state.punch.is_out,//签到
            in_time:state.punch.in_time,//签到时间
            out_time:state.punch.out_time,//最后一次签退时间
            is_jyr:1,//1-交易日 0-非交易日
            info:state.punch.info,
            info_detail:state.punch.info_detail,
            errorMassage:action.data,//错误信息
          }
        });
      }
      //上下班打卡详细情况
      else if (type=="QUERY_ATTENDANCE_BEHAVIOR") {
        return Object.assign({},state,{
          attanceBehavior:action.data,//上下班打卡详细情况
        });
      }
      //我的某年月（如201712）的考勤统计
      else if (type=="QUERY_MYCHECK_TOTAL") {
        return Object.assign({},state,{
          mycheckTotal:action.data,
        });
      }
      //判断是否进入打卡范围请求成功
      else if (type=="QUERY_CHECKRANGE_DATA") {
        return Object.assign({},state,{
          coords:action.data,
        });
      }
      //定位失败（通过壳获取经纬度失败）
      else if (type=="QUERY_GPS_ERROR") {
        return Object.assign({},state,{
          coords:{
              is_inrange:"2",//是否在打卡范围内 "0"-不在 "1"-在  "-1"-请求失败 "2"-GPS定位失败
              lat:"",//经度
              lon:"",//纬度
          },
        });
      }
      //判断是否进入考勤范围的请求失败（）
      else if (type=="QUERY_NETWORK_ERROR") {
        return Object.assign({},state,{
          coords:{
              is_inrange:"-1",//是否在打卡范围内 "0"-不在 "1"-在  "-1"-请求失败 "2"-GPS定位失败
              lat:"",//经度
              lon:"",//纬度
          },
        });
      }
      //月报确认数据列表
      else if (type=="QUERY_CONFIRMREPORT_DATA") {
        var {list} = action.data;
        if (list.length && list.length>0) {
            list = state.confirmList.concat(list);
        }
        // alert("reducer");
        return Object.assign({},state,{
          confirmList:list
        });
      }
      //判断考勤月报是否在审批期内
      else if (type=="QUERY_ISIN_CHECKDAY") {
        return Object.assign({},state,{
          isincheckday:action.data
        });
      }

    return state;
};
