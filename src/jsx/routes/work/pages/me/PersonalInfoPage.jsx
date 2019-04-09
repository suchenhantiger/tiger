import { connect } from 'react-redux';
import {getPersonInfo} from '../../actions/me/meAction';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import Confrim from '../../../../components/common/popup/Confirm';

import styles from './css/personalInfoPage.less';

/********我的主页*********/
class PersonalInfoPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            nickname: "suchanhan",
            verify: "已认证",
            telephone: "186****0",
            email: "suchenhan*****.com",
            showModify: false,
            modifyKey:""
        }
    }
    //获取页面名称
    getPageName() { return "个人资料设置页面"; }

    componentDidMount(){
        this.props.getPersonInfo(this, this.update);
    }

    update = (data)=>{
        this.setState({});
    }

    inputChange = (key) => (e) => {
        var { value } = e.target;
        this.setState({ [key]: value });
    }

    modify = (modifyKey, modifyTitle)=>()=>{
        this.oldValue = this.state[modifyKey];
        this.setState({modifyKey, showModify:true, modifyTitle});
    }

    sureClick = ()=>{
        this.setState({showModify:false})
    }

    cancelClick = ()=>{
        var {modifyKey} = this.state;
        this.setState({[modifyKey]:this.oldValue,showModify:false});
    }

    verifyClick = ()=>{
        hashHistory.push("/work/me/certification");
    }

    render() {
        systemApi.log("PersonalInfoPage render");

        var { nickname, verify, telephone, email, showModify, modifyKey, modifyTitle } = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName="个人资料设置" />
                <Content>
                    <div className={this.mergeClassName("mg-tp-42", "mg-lr-50")}>
                        <div className={this.mergeClassName(styles.text_arrow, styles.text_list3)}>
                            <ul>
                                <li className={styles.item}>
                                    <div className={this.mergeClassName("left", "font26")}><p>头像</p></div>
                                    <div className={this.mergeClassName("right", "c9")}><img className={styles.header} src={"./images/pic_man.png"}/></div>
                                </li>
                                <li className={styles.item}>
                                    <div className={this.mergeClassName("left", "font26")}><p>昵称</p></div>
                                    <div className={this.mergeClassName("right", "c9")} onClick={this.modify("nickname", "修改昵称")}><p>{nickname}</p></div>
                                </li>
                                <li className={styles.item}>
                                    <div className={this.mergeClassName("left", "font26")}><p>实名认证</p></div>
                                    <div className={this.mergeClassName("right", "c9")} onClick={this.verifyClick}><p>{verify}</p></div>
                                </li>
                                <li className={styles.item}>
                                    <div className={this.mergeClassName("left", "font26")}><p>绑定手机</p></div>
                                    <div className={this.mergeClassName("right", "c9")} onClick={this.modify("telephone", "修改手机号")}><p>{telephone}</p></div>
                                </li>
                                <li className={styles.item}>
                                    <div className={this.mergeClassName("left", "font26")}><p>绑定邮箱</p></div>
                                    <div className={this.mergeClassName("right", "c9")} onClick={this.modify("email", "修改邮箱")}><p>{email}</p></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Content>
                {showModify ? (
                    <Confrim title={modifyTitle} sureText="保存" cancelText="取消" onSure={this.sureClick} onCancel={this.cancelClick}>
                        <input className={styles.input} value={this.state[modifyKey]} onChange={this.inputChange(modifyKey)} placeholder="请输入昵称" />
                    </Confrim>
                ) : null}
                {this.props.children}
            </FullScreenView>
        );
    }

}

function injectAction() {
    return {getPersonInfo};
}

module.exports = connect(null, injectAction())(PersonalInfoPage);
