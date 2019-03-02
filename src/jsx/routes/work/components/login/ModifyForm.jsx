import styles from './css/loginForm.less';
import {connect} from 'react-redux';
import {changePassword} from '../../actions/login/loginAction';
class ModifyForm extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            pwd: "",
            conpwd: "",
            errMsg:""
        }
    }

    pwdChange = (e) => {
        var { value } = e.target;
        this.setState({ pwd: value });
    }

    conpwdChange = (e) => {
        var { value } = e.target;
        this.setState({ conpwd: value });
    }

    saveClick = ()=>{
        var {pwd,conpwd}=this.state;
        
        if(pwd==null || pwd.length==0)
            this.setState({errMsg:"请输入密码"});
        else if(pwd!=conpwd)
            this.setState({errMsg:"两次输入的密码不一致"});
        else
            this.props.changePassword(this,pwd,()=>{
                hashHistory.push("/work");

            });
    }
        
    //渲染函数
    render() {

        var { pwd, conpwd ,errMsg} = this.state;

        return (
            <div className={styles.login_form}>
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
                    <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}><button onClick={this.saveClick}>保存</button></div>
                </div>
            </div>
        );
    }

}
function injectProps(state){
    return {};
}
function injectAction(){
    return {changePassword};
}

module.exports = connect(null,injectAction())(ModifyForm);