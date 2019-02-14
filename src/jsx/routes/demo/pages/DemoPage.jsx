import { connect } from 'react-redux';

import {showToast} from '../actions/demoAction';

import AppHeader from '../../../components/common/appheader/AppHeader';
import Button from '../../../components/common/form/Button';

import styles from './css/demoPage.css';

/** Demo页 **/
class DemoPage extends PageComponent{

    constructor(props,context) {
        super(props,context);
        this.state = {
            text:""
        }
    }

    //获取页面名称
    getPageName(){ return "Demo页"; }

    componentDidMount(){
        this.props.showToast(this,()=>{
            this.setState({text:"成功了！"});
        });
    }

    buttonClick = ()=>{
        hashHistory.push("/demo/subpage");
    }

    render(){
        systemApi.log("DemoPage render");

        var {text} = this.state;

        return (
            <div>
                <AppHeader headerName="示例页" showBack={false}/>
                <Content>
                    <div className={styles.text}>测试成功</div>
                    <div className={styles.box}>
                        <Button value="点击打开新页面" onClick={this.buttonClick}/>
                    </div>
                </Content>
                {this.props.children}
            </div>
        );
    }
}

function injectAction(){
    return {showToast};
}

module.exports = connect(null,injectAction())(DemoPage);
