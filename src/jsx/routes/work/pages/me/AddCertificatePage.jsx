import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import { connect } from 'react-redux';
import { uploadCertificate,upLoadAllImage} from '../../actions/me/meAction';
import styles from './css/bankPage.less';

/********我的主页*********/
class BankPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.certificateid = props.params.certificateid;
        this.attachmentId = "";
        this.state={
            certificateImg:""
        };
    }

    componentDidMount() {
        
    }


    getCertificateImg = ()=>{
        
        Client.getPicture((certificateImg)=>{
            this.props.upLoadAllImage(this,certificateImg,(attachmentId)=>{
                this.attachmentId=attachmentId;
                this.setState({certificateImg});
            });
        },()=>{

        });
    }


    submit = ()=>{

        var { 
            certificateImg=""
        }=this.state;

        if(certificateImg.length==0 || this.attachmentId.length==0){
            this.props.showMessage("error","请上传凭证");
        }else{
            this.props.uploadCertificate(this,{certificateId:this.certificateid,attachmentId:this.attachmentId},()=>{
                Event.fire("refresh_recordlist");
                hashHistory.goBack();
            });
           
        }
        
        
    }



    render() {
        systemApi.log("BankPage render");
        var {certificateImg=""}=this.state;

        return (
            <FullScreenView>
                <AppHeader headerName="上传凭证" />
                <Content>
                    <div className={this.mergeClassName("mg-lr-30", "mg-tp-30")}>
                        <div className={this.mergeClassName(styles.upload_box, styles.cer_box)} onClick={this.getCertificateImg}>
                            <span>点此上传凭证</span>
                            {certificateImg.length>0?<img className={styles.imageFrame} src={certificateImg} />:null}
                        </div>

                    </div>

                    <div className={styles.login_bt_text2} onClick={this.submit}>
                        <div className={this.mergeClassName(styles.btn, "mg-lr-30")}>
                            <button >提交</button>
                        </div>
                    </div>
                </Content>
            </FullScreenView>
        );
    }

}
function injectAction() {
    return { upLoadAllImage,uploadCertificate};
}

module.exports = connect(null, injectAction())(BankPage);

