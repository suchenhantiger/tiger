import styles from './css/loginForm.less';
import {connect} from 'react-redux';
import {changePasswordByold} from '../../actions/login/loginAction';
class ModifyForm extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            pwd: "",
            oldpwd:"",
            conpwd: "",
            errMsg:""
        }
    }

    pwdChange = (e) => {
        var { value } = e.target;
        this.setState({ pwd: value });
    }

    oldChange = (e) => {
        var { value } = e.target;
        this.setState({ oldpwd: value });
    }

    conpwdChange = (e) => {
        var { value } = e.target;
        this.setState({ conpwd: value });
    }

    saveClick = ()=>{
        var {pwd,conpwd,oldpwd}=this.state;
        
        if(oldpwd==null || oldpwd.length==0)
            this.setState({errMsg:"请输入原密码"});     
        else if(pwd==null || pwd.length==0)
            this.setState({errMsg:"请输入密码"});
        else if(pwd.length<6 || pwd.length>12)
            this.setState({errMsg:"请设置6到12位密码"});
        else if(pwd!=conpwd)
            this.setState({errMsg:"两次输入的密码不一致"});
        else
            this.props.changePasswordByold(this,{
                updateType:0,
                oldpassword:oldpwd,
                newpassword:pwd
                },()=>{
                hashHistory.goBack();

            });
    }
        
    //渲染函数
    render() {

        var { pwd, conpwd ,oldpwd,errMsg} = this.state;

        return (
            <div className={styles.login_form}>
                <p style={{   color: "#666",margin: ".2rem .2rem"}}>原密码</p>
                <div className={styles.login_item}>
                    
                    <input type="password"  placeholder="请输入原密码" value={oldpwd} onChange={this.oldChange} />
                </div>
                <p style={{   color: "#666",margin: ".2rem .2rem"}}>设置新密码</p>
                <div className={styles.login_item}>
                    <input type="password"  placeholder="请输入新密码" value={pwd} onChange={this.pwdChange} />
                </div>
                <div className={styles.login_item}>
                    <input type="password" placeholder="确认密码" value={conpwd} onChange={this.conpwdChange} />
                </div>
                {errMsg.length?(
                    <div className={styles.login_pro}>
                        <div className={this.mergeClassName(styles.pro_error, "red")} >{errMsg}</div>
                    </div>
                ):null}
                <div className={styles.login_bt_text}>
                    <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}><button onClick={this.saveClick}>修改</button></div>
                </div>
            </div>
        );
    }

}
function injectProps(state){
    return {};
}
function injectAction(){
    return {changePasswordByold};
}

module.exports = connect(null,injectAction())(ModifyForm);