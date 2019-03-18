import {connect} from 'react-redux';

import {showMessage,initOptionalList,initProductList} from '../../../store/actions';
import {updateToken} from '../../work/actions/login/loginAction';
import Toast from '../../../components/common/popup/Toast';
import Loading from '../../../components/common/loading/Loading';
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
        var tigertoken = systemApi.getValue("tigertoken");
        if(tigertoken  && tigertoken.length>0){
            this.props.updateToken(this);
            hashHistory.push("/work");
        }else{
            hashHistory.push("/login");
        }
       // this.props.initAccountList();
       if(vconsole){
      
        let vConsole = new VConsole() ;
       }
       
       
      
    }
    render(){
        systemApi.log("BasePage render");
        var {loading,messageshow,message,msgType} = this.props;
        return (
            <div>
                {this.props.children}
                {loading?(<Loading/>):null}
                {messageshow?(<Toast type={msgType} text={message}/>):null}
            </div>
        );
    }

}

function injectProps(state){
    var {loading,messageshow,message,msgType} = state.base || {};
    return {loading,messageshow,message,msgType};
}

function injectAction(){
    return{showMessage,initOptionalList,initProductList,updateToken};
}

module.exports = connect(injectProps,injectAction())(BasePage);
