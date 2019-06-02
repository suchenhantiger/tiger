import styles from './css/loginForm.less';
import {connect} from 'react-redux';
import CheckBox from '../../../../components/common/form/CheckBox';
import {changePasswordByold} from '../../actions/login/loginAction';
import {checkPassword} from '../../../../utils/util';
class ModifyForm extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            pwd: "",
            oldpwd:"",
            conpwd: "",
            errMsg:"",
            isSyn:false
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
        var {pwd,conpwd,oldpwd,isSyn}=this.state;
        
        if(oldpwd==null || oldpwd.length==0)
            this.setState({errMsg:"请输入原密码"});     
        else if(pwd==null || pwd.length==0)
            this.setState({errMsg:"请输入密码"});
        else if(checkPassword(pwd)==false)
            this.setState({errMsg:"密码必须由字母和数字组成，且长度为6到15位"});
        else if(pwd!=conpwd)
            this.setState({errMsg:"两次输入的密码不一致"});
        else
            this.props.changePasswordByold(this,{
                updateType:0,
                oldpassword:oldpwd,
                newpassword:pwd,
                isSynMt4:isSyn?1:0
                },()=>{
                hashHistory.goBack();

            });
    }

    isSyn =()=>{
        this.setState({isSyn:!this.state.isSyn});
    }

    onChange=()=>{
        
    }
        
    //渲染函数
    render() {

        var { pwd, conpwd ,oldpwd,errMsg,isSyn} = this.state;

        return (
            <div className={styles.login_form2}>
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
                <div className={styles.checkFrame}  onClick={this.isSyn}>
                    <CheckBox align="right" checked={isSyn} onChange={this.onChange}/>
                     <span className={"right"}>修改所有交易密码</span>
                </div>
                {errMsg.length?(
                    <div className={styles.login_pro}>
                        <div className={this.mergeClassName(styles.pro_error, "red")} >{errMsg}</div>
                    </div>
                ):null}
            
                    <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}><button onClick={this.saveClick}>修改</button></div>
               
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