import {connect} from 'react-redux';

import {showMessage} from '../../../store/actions';

import Toast from '../../../components/common/popup/Toast';
import Loading from '../../../components/common/loading/Loading';

import styles from './css/basePage.css';

/** base页，主要将redux公共方法相关组件放于此 **/
class BasePage extends PureComponent{

    constructor(props,context) {
        super(props,context);
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
    return{showMessage};
}

module.exports = connect(injectProps,injectAction())(BasePage);
