import { connect } from 'react-redux';
import {getPersonInfo,upLoadImage,updateAcc} from '../../actions/me/meAction';
import {updateUserInfo} from '../../actions/login/loginAction';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import Confrim from '../../../../components/common/popup/Confirm';
import ModifyDialog from '../../components/me/ModifyDialog';
import ModifyPhoneAndEmailDialog from '../../components/me/ModifyPhoneAndEmailDialog';
import styles from './css/personalInfoPage.less';

/********我的主页*********/
class PersonalInfoPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showModify: false,
            photoImg:systemApi.getValue("avatarUrl"),
            showModifyPhoto:false,
            modifyPhoneOrEMail:false

        }
        this.modifyKey=null;
    }


    componentDidMount(){
        this.props.getPersonInfo(this, this.update);
    }

    componentWillUnmount(){
        
        super.componentWillUnmount();
        clearInterval(this._interval);
    }



    update = (data)=>{
        //this.setState({});
    }
    modify = (modifyKey, modifyTitle)=>()=>{
        this.oldValue = this.state[modifyKey];
        this.modifyKey =modifyKey;
        this.modifyTitle =modifyTitle;
        if(modifyKey =="nickname")
            this.setState({showModify:true});
        else
            this.setState({modifyPhoneOrEMail:true});
    }


    undateCB = ()=>{
        this.updateUser();
    }

    sureClick = (resObj)=>{
        var {modifyKey,value,oldSecurityCode,newSecurityCode} = resObj;

       // console.log(modifyKey+"   "+modifyTitle);
        if(modifyKey=="nickname"){
            this.props.updateAcc(this,{accType:0,nickName:value},this.undateCB);
        }else if(modifyKey=="telephone"){
            this.props.updateAcc(this,{accType:0,newPhone:value,oldSecurityCode,newSecurityCode},this.undateCB);
        }else if(modifyKey=="email"){
            this.props.updateAcc(this,{accType:0,newEmail:value,oldSecurityCode,newSecurityCode},this.undateCB);
        }
        
    }

    cancelClick = ()=>{
        var {modifyKey} = this.state;
        this.setState({modifyPhoneOrEMail:false,showModify:false});
    }

    verifyClick = ()=>{
        var isReal = systemApi.getValue("isReal");
        if(isReal==0){
            hashHistory.push("/work/me/certification");
        }else if(isReal==1){
            hashHistory.push("/work/me/certification");
        }else if(isReal==2){
            hashHistory.push("/work/me/certification");
        }else if(isReal==3){
            
        }
        
    }

    updateUser =()=>{
        this.props.updateUserInfo(this,()=>{
            this.setState({photoImg:systemApi.getValue("avatarUrl")});
            this.setState({showModify:false,modifyPhoneOrEMail:false})
            

        });
    }

    photoBtn =()=>{
        Client.getPicture((photoImg)=>{
            this.props.upLoadImage(this,photoImg,3,()=>{
                this.setState({showModifyPhoto:false});
                this.updateUser();
            });
        },()=>{

        });
    } 

    uploadAddressImg =()=>{
        hashHistory.push("/work/me/setting/personal/address");
    }

    cancelPhoto =()=>{
        this.setState({showModifyPhoto:false});
    }

    openPhoto = ()=>{
        this.setState({showModifyPhoto:true});
    }



    render() {
        systemApi.log("PersonalInfoPage render");

        var { email, showModify ,showModifyPhoto,modifyPhoneOrEMail,photoImg=""} = this.state;
        var nickname = systemApi.getValue("nickname");
        var isReal = systemApi.getValue("isReal");
        var verify = "未认证";
        if(isReal==3){
            verify = "已认证";
        }
        var telephone = systemApi.getValue("tel");
        var email = systemApi.getValue("email");
        if(photoImg ==null || photoImg.length==0){//现在这样处理
            photoImg = "./images/me/img03.png";
        }
        var photoBtn = "选择图片";
//securityCode
        return (
            <FullScreenView>
                <AppHeader headerName="个人资料设置" />
                <Content>
                    <div className={this.mergeClassName("mg-tp-42", "mg-lr-50")}>
                        <div className={this.mergeClassName(styles.text_arrow, styles.text_list3)}>
                            <ul>
                                <li className={styles.item}>
                                    <div className={this.mergeClassName("left", "font26")}><p>头像</p></div>
                                    <div className={this.mergeClassName("right", "c9")} onClick={this.openPhoto} ><img className={styles.header} src={photoImg}/></div>
                                </li>
                                <li className={styles.item} onClick={this.modify("nickname", "修改昵称")}>
                                    <div className={this.mergeClassName("left", "font26")}><p>昵称</p></div>
                                    <div className={this.mergeClassName("right", "c9")} ><p>{nickname}</p></div>
                                </li>
                                <li className={styles.item} onClick={this.verifyClick}>
                                    <div className={this.mergeClassName("left", "font26")}><p>实名认证</p></div>
                                    <div className={this.mergeClassName("right", "c9")} ><p>{verify}</p></div>
                                </li>
                                <li className={styles.item} onClick={this.uploadAddressImg}>
                                    <div className={this.mergeClassName("left", "font26")}><p>地址认证</p></div>
                                    <div className={this.mergeClassName("right", "c9")} ><p>上传地址凭证</p></div>
                                </li>
                                <li className={styles.item} onClick={this.modify("telephone", "修改手机号")}>
                                    <div className={this.mergeClassName("left", "font26")}><p>绑定手机</p></div>
                                    <div className={this.mergeClassName("right", "c9")} ><p>{telephone}</p></div>
                                </li>
                                <li className={styles.item} onClick={this.modify("email", "修改邮箱")}>
                                    <div className={this.mergeClassName("left", "font26")}><p>绑定邮箱</p></div>
                                    <div className={this.mergeClassName("right", "c9")} ><p>{email}</p></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Content>
                {showModify ? 
                    <ModifyDialog 
                    modifyKey={this.modifyKey} modifyTitle={this.modifyTitle} 
                    onSure={this.sureClick} onCancel={this.cancelClick} />  
                : null}
                {modifyPhoneOrEMail ? 
                    <ModifyPhoneAndEmailDialog
                    modifyKey={this.modifyKey} modifyTitle={this.modifyTitle} 
                    onSure={this.sureClick} onCancel={this.cancelClick} />  
                : null}
                {showModifyPhoto ? (
                    <Confrim sureText={"选择"} cancelText="取消" onSure={this.photoBtn} onCancel={this.cancelPhoto}>
                        <p style={{fontSize:".3rem",textAlign:"center"}}>从相册中选择一张头像?</p>
                    </Confrim>
                ) : null}

                {this.props.children}
            </FullScreenView>
        );
    }

}

function injectAction() {
    return {getPersonInfo,upLoadImage,updateUserInfo,updateAcc};
}

module.exports = connect(null, injectAction())(PersonalInfoPage);
