import {connect} from 'react-redux';

import {showMessage,hideComplete,hideCertification,initOptionalList,initProductList} from '../../../store/actions';
import Toast from '../../../components/common/popup/Toast';
import Loading from '../../../components/common/loading/Loading';
import Confrim from '../../../components/common/popup/Confirm';
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
       
       if(vconsole){
        let vConsole = new VConsole() ;
       }
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


    render(){
        systemApi.log("BasePage render");
        var {loading,messageshow,message,msgType,complete,completeMsg,certification} = this.props;
        return (
            <div>
                {this.props.children}
                {loading?(<Loading/>):null}
                {messageshow?(<Toast type={msgType} text={message}/>):null}
                {complete?(<Confrim onSure={this.gotoImprove} onCancel={this.closeConfirm} >
                    <p className={"font30 mg-bt-30 center"} >{completeMsg}</p>
                </Confrim>):null}
                {certification?(<Confrim onSure={this.gotoReal} onCancel={this.closeRealConfirm}  >
                <p className={"font30 mg-bt-30 center"} >根据监管要求，请先实名认证</p>
                </Confrim>):null}
            </div>
        );
    }

}

function injectProps(state){
    var {complete,certification,completeMsg,loading,messageshow,message,msgType} = state.base || {};
    return {complete,certification,loading,messageshow,message,msgType,completeMsg};
}

function injectAction(){
    return{hideComplete,hideCertification,showMessage,initOptionalList,initProductList};
}

module.exports = connect(injectProps,injectAction())(BasePage);
