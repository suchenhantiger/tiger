import {showLoading, hideLoading, showMessage} from '../../../../store/actions.jsx';

const csdata = [
  {name:'体外资产', value:'5700', color:'#c23531'},
  {name:'体内资产', value:'6700', color:'#91c7ae'}
];

export function getPieData(component, scb, fcb){
  return function(dispatch, state){
    if (scb) {
      scb(csdata);
    }
  }
}

export function getBarLineData(component, scb, fcb){
  return function(dispatch, state){
    component.requestJSON("renderbill/QueryBDReportAction.do",{
      access_token: [systemApi.getValue(systemApi.getKey().TOKEN),0],
      kick:["1",0],
      querytype:["j7rinfo",1]
    }).done((data)=>{
      if (scb) {
        scb(data.list);
      }
    }).fail((data)=>{
      dispatch(showMessage('error',data.info_detail || '获取业务快报数据错误！'));
      if (fcb) {
        fcb();
      }
    });
  }
}
