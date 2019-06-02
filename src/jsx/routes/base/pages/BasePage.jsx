import {connect} from 'react-redux';

import {showMessage,hideComplete,hideCertification,initOptionalList,
    initProductList,getAppConfig,closeUpdateDialog,hideConfirm} from '../../../store/actions';
import Toast from '../../../components/common/popup/Toast';
import Loading from '../../../components/common/loading/Loading';
import Confrim from '../../../components/common/popup/Confirm';
import Confrim2 from '../../../components/common/popup/Confirm2';
import UpdateDialog from "../components/UpdateDialog";

import VConsole from 'vconsole';
import styles from './css/basePage.css';

/** base页，主要将redux公共方法相关组件放于此 **/
class BasePage extends PureComponent{

    constructor(props,context) {
        super(props,context);

    }
    componentDidMount(){
        this.props.initProductList(()=>{
            this.props.initOptionalList();
        });
        if(!updateflag){
            updateflag=true; 
            this.props.getAppConfig(this);
        }
       
       
    //    if(vconsole){
    //     let vConsole = new VConsole() ;
    //    }
    }

    gotoImprove=()=>{
       this.props.hideComplete();
        hashHistory.push("/work/improve");
    }

    closeConfirm =()=>{
        this.props.hideComplete();
    }

    gotoReal=()=>{
        hashHistory.push("/work/me/certification");
        this.props.hideCertification();
    }

   closeRealConfirm =()=>{
        this.props.hideCertification();
   }

   notUpdate = ()=>{
       this.props.closeUpdateDialog();
   }

   closeConfirm2=()=>{
       var {confirmCb} = this.props;
        this.props.hideConfirm(confirmCb);
   }



    render(){
        systemApi.log("BasePage render");
        var {loading,messageshow,message,msgType,complete,completeMsg,certification,
            vsRemark,downUrl,serverUrl,version,showUpdate,appType,confirming
        } = this.props;
        return (
            <div>
                {this.props.children}
                {loading?(<Loading/>):null}
                {messageshow?(<Toast type={msgType} text={message}/>):null}
                {complete?(<Confrim sureText={McIntl.message("continue")} cancelText={McIntl.message("cancel")} onSure={this.gotoImprove} onCancel={this.closeConfirm} >
                    <p className={"font30 mg-bt-30 center"} >{completeMsg}</p>
                </Confrim>):null}
                {certification?(<Confrim sureText={McIntl.message("continue")} cancelText={McIntl.message("cancel")}  onSure={this.gotoReal} onCancel={this.closeRealConfirm}  >
                <p className={"font30 mg-bt-30 center"} >根据监管要求，请先实名认证</p>
                </Confrim>):null}
                {confirming?(<Confrim2 sureText={McIntl.message("confirm")} titleCenter={true} title="提示" showCancel={false}   onSure={this.closeConfirm2}  >
                <p className={"font30 line-ht-48 mg-bt-30 center"} >{message}</p>
                </Confrim2>):null}
                {showUpdate>0?<UpdateDialog  onCancel={this.notUpdate} vsRemark ={vsRemark} downUrl={downUrl}
                 version={version} showUpdate={showUpdate} appType={appType}   />:null}
            
            </div>
        );
    }

}

function injectProps(state){
    var {confirming,complete,certification,completeMsg,loading,messageshow,message,msgType,confirmCb,
        vsRemark,downUrl,serverUrl,version,showUpdate,appType} = state.base || {};
    return {complete,certification,loading,messageshow,message,msgType,completeMsg,
        vsRemark,downUrl,serverUrl,version,appType,showUpdate,confirming,confirmCb};
}

function injectAction(){
    return{hideConfirm,hideComplete,hideCertification,showMessage,initOptionalList,initProductList,getAppConfig,closeUpdateDialog};
}

module.exports = connect(injectProps,injectAction())(BasePage);
