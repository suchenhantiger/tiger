import { connect } from 'react-redux';
import Confirm from '../../../../components/common/popup/Confirm2';
import styles from './css/modifyDialog.less';
import {getMessagePwd,getChangeEmailPwd,verification} from '../../actions/login/loginAction';
class ModifyDialog extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            restTime:60,
            validCode:"",
            errMsg:"",
            inputeValue:"",
            showBtn:true,canSend:true,
            index:0
        }

        this.telephone = systemApi.getValue("tel");
        this.email = systemApi.getValue("email");
        this.oldSecurityCode =null;
        this.newSecurityCode =null;

    }

    inputChange = (e) => {
        var { value } = e.target;
        var {modifyKey} =this.props;
        if( modifyKey=="email"){
            this.setState({inputeValue:value,canSend:true});
        }else{
            if(value.length>=11)
                this.setState({inputeValue:value.substring(0,11),canSend:true});
            else
                this.setState({inputeValue:value,canSend:false});
        }
        
    }

    getMessage=()=>{
        if(this.state.canSend){
            var {modifyKey} =this.props;
            if(modifyKey == "email"){
                var email=  this.email ;
                var {index,inputeValue} =this.state;
                if(index ==1){
                    if(inputeValue.length==0){
                        this.setState({errMsg:"请输入新邮箱"});
                        return;
                    }
                    email =inputeValue;
                }
                this.props.getChangeEmailPwd(this,email,(msg)=>{
                    this.setState({showBtn:false});
                    var start = new Date().getTime();
                    var {restTime} = this.state;
                    this._interval = setInterval(()=>{
                        var curTime = new Date().getTime(),
                            restTime = Math.round(60-(curTime-start)/1000);
                        if(restTime>0)
                            this.setState({
                                restTime
                            });
                        else{
                            this.setState({
                                showBtn:true,
                                restTime:60
                            });
                            clearInterval(this._interval);
                        }
        
                    },300);
                }, this,(msg)=>{
                    this.setState({
                      messageInfo:msg
                    })
                });

            }else{
                var phone = this.telephone;
                var {index,inputeValue} =this.state;
                if(index ==1){
                    if(inputeValue.length==0){
                        this.setState({errMsg:"请输入新手机号"});
                        return;
                    }
                    phone =inputeValue;
                }

                this.props.getMessagePwd(this, phone,2,(msg)=>{
                    this.setState({showBtn:false});
                    var start = new Date().getTime();
                    var {restTime} = this.state;
                    this._interval = setInterval(()=>{
                        var curTime = new Date().getTime(),
                            restTime = Math.round(60-(curTime-start)/1000);
                        if(restTime>0)
                            this.setState({
                                restTime
                            });
                        else{
                            this.setState({
                                showBtn:true,
                                restTime:60
                            });
                            clearInterval(this._interval);
                        }
        
                    },300);
                }, this,(msg)=>{
                    this.setState({
                      messageInfo:msg
                    })
                });

            }
           
        }
        



    }



    onSure = ()=>{

        var {inputeValue,validCode,index} = this.state;
        var {modifyKey} =this.props;
        if(index==0){
            if(validCode.length==0){
                this.setState({errMsg:"验证码不能为空"});
            }else{
                if(modifyKey == "email"){
                    this.props.verification(this,{email:this.email,securityCode:validCode},()=>{
                        this.oldSecurityCode = validCode;
                        this.setState({
                            showBtn:true,
                            canSend:false,
                            restTime:60,
                            index:1,
                            errMsg:"",validCode:""

                        });
                        clearInterval(this._interval);

                    },(data)=>{
                        this.setState({errMsg:data});
                    });

                }else{
                    this.props.verification(this,{phone:this.telephone,securityCode:validCode},()=>{
                        this.oldSecurityCode = validCode;
                        this.setState({
                            showBtn:true,
                            canSend:false,
                            restTime:60,
                            index:1,
                            errMsg:"",validCode:""

                        });
                        clearInterval(this._interval);

                    },(data)=>{
                        this.setState({errMsg:data});
                    });

                }
                

            }
                
        }else{
            if(validCode.length==0){
                this.setState({errMsg:"验证码不能为空"});
                return;
            }

            if(modifyKey == "email"){
                if(inputeValue.length==0){
                    this.setState({errMsg:"请输入新邮箱"});
                    return;
                }

            }else {
                if(inputeValue.length==0){
                    this.setState({errMsg:"请输入新手机号"});
                    return;
                }

            }
            var {onSure,modifyKey} = this.props;
            onSure && onSure({value:inputeValue,modifyKey,
                oldSecurityCode:this.oldSecurityCode,newSecurityCode:validCode});
        }
        

    }

    numChange = (e)=>{
        if(e.target.value.length<12)
        this.setState({accName:e.target.value});
    }
    codeChange = (e)=>{
        var {value} = e.target;
        this.setState({validCode:value});
    }

    //渲染函数
    render(){
        //suggestBalance={suggestBalance} maxFowBalance={maxFowBalance} canFowBalance
        var {onCancel,modifyKey,modifyTitle} = this.props,
            {restTime,validCode,errMsg,inputeValue,showBtn,canSend,index} = this.state;
        var sureText = "下一步";
        if(index==1){
            sureText ="修改";
        }
        return(
            <Confirm sureText={sureText} onSure={this.onSure} cancelText="取消" onCancel={onCancel}>
                {index==0 && modifyKey=="telephone"?<p className={"font24 mg-tp-20 mg-lt-30 mg-bt-20"}>向原手机{this.telephone}发送验证码</p>:null}
                {index==0 && modifyKey=="email"?<p className={"font24 mg-tp-20 mg-lt-30 mg-bt-20"}>向原邮箱{this.email}发送验证码</p>:null}
                
                {index==1 && modifyKey=="telephone"?<p className={"font24 mg-tp-20 mg-lt-30 mg-bt-20"}>输入新手机号</p>:null}
                {index==1 && modifyKey=="email"?<p className={"font24 mg-tp-20 mg-lt-30 mg-bt-20"}>输入新邮箱</p>:null}
                {index==1 && modifyKey=="telephone"?<input className={styles.input} value={inputeValue} onChange={this.inputChange} placeholder="请输入新手机号" />:null}
                {index==1 && modifyKey=="email"?<input className={styles.input} value={inputeValue} onChange={this.inputChange} placeholder="请输入新邮箱" />:null}
                <div className={styles.login_item}>
                    <input placeholder="请输入验证码"  value={validCode} onChange={this.codeChange}/>
                    {showBtn?<div className={styles.text_code} style={canSend?{color:"#333"}:{color:"#aaa"}} onClick={this.getMessage}>获取验证码</div>
                    :<div className={styles.text_code} >{restTime}</div>}
                </div>
                {errMsg.length?(
                    <div className={"mg-lt-30 "+styles.login_pro}>
                        <div className={this.mergeClassName(styles.pro_error, "red")} >{errMsg}</div>
                    </div>
                ):null}
            </Confirm>
        );
    }

}

function injectAction() {
    return {getMessagePwd,verification,getChangeEmailPwd};
}

module.exports = connect(null, injectAction())(ModifyDialog);

