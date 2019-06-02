import styles from './css/loginForm.less';
import {connect} from 'react-redux';
import {changePassword} from '../../actions/login/loginAction';
import {checkPassword} from '../../../../utils/util';
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
        
        if(pwd==null || pwd.length==0){
            this.setState({errMsg:"请输入密码"});
        } else if(checkPassword(pwd)==false)
            this.setState({errMsg:"密码必须由字母和数字组成，且长度为6到15位"});
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
                <p className={"c9 mg-bt-20 mg-lt-30"}>{McIntl.message("pwd_length")}</p>
                <div className={styles.login_item}>
                    <input className={styles.phoneInput} type="password"  placeholder={McIntl.message("new_pwd")} value={pwd} onChange={this.pwdChange} />
                </div>
                <div className={styles.login_item}>
                    <input className={styles.phoneInput} type="password" placeholder={McIntl.message("con_pwd")} value={conpwd} onChange={this.conpwdChange} />
                </div>
                {errMsg.length?(
                    <div className={styles.login_pro}>
                        <div className={this.mergeClassName(styles.pro_error, "red")} >{errMsg}</div>
                    </div>
                ):null}
 
                    <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}><button onClick={this.saveClick}>{McIntl.message("save")}</button></div>
              
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