import { connect } from 'react-redux';

import {demoRequest} from '../actions/demoAction';

import AppHeader from '../../../components/common/appheader/AppHeader';

import styles from './css/subPage.css';

/** Demo页 **/
class SubPage extends PageComponent{

    constructor(props,context) {
        super(props,context);
        this.state = {
            text:""
        }
    }

    //获取页面名称
    getPageName(){ return "SubPage页"; }

    componentDidMount(){
        this.props.demoRequest(this, (list)=>{
            this.setState({text:JSON.stringify(list)})
        })
    }

    render(){
        systemApi.log("SubPage render");

        var {text} = this.state;

        return (
            <div>
                <AppHeader headerName="子页面"/>
                <Content>
                    <div className={styles.text}>返回结果：</div>
                    <div className={styles.result}>{text}</div>
                </Content>
            </div>
        );
    }
}

function injectAction(){
    return {demoRequest};
}

module.exports = connect(null,injectAction())(SubPage);
