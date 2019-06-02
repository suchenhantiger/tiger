import styles from '../me/css/certificationForm.less';
import {connect} from 'react-redux';
import {upLoadImage} from '../../actions/me/meAction';
import {showMessage, showConfirmWithCb,ERROR, SUCCESS} from '../../../../store/actions';




class UploadAddressForm extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            femail:0,
            idType: "",
            idNO:"",
            errMsg:"",
            frontPic:""
        };

    }



    submit = ()=>{
        // var {back} = this.props;
        // back && back();
        this.props.showConfirmWithCb("地址凭证上传成功",()=>{
            hashHistory.goBack();
        });
        
    }

    getFrontPicture = ()=>{

        Client.getPicture((frontPic)=>{
            this.props.upLoadImage(this,frontPic,4,()=>{
                this.setState({frontPic});
            });
        },()=>{

        });
    }


    //渲染函数
    render() {

        var { name= "",
        femail=1,errMsg="",frontPic="",
        idType="",
        idNO=""} = this.state;

        return (
           
            <div className={styles.cardFrame}>
                <div className={styles.frame}>
                        <div className={styles.upload_box} onClick={this.getFrontPicture}>
                            <span>点击上传地址凭证</span>
                            {frontPic.length>0?<img className={styles.imageFrame} src={frontPic} />:null}
                        </div>
                </div>
                <div className={styles.login_int}>
                      只支持PNG、JPG格式图片，图片大小不可超过2MB。<br/>
                      拍摄示例
                </div>
                  <div className={styles.login_bt_text2} onClick={this.submit}>
                    <div className={this.mergeClassName(styles.login_btn2, "mg-lr-30")}><button >确定</button></div>
                </div>


            </div>
        );
    }

}
function injectProps(state){
    return {};
}
function injectAction(){
    return {upLoadImage,showMessage,showConfirmWithCb};
}

module.exports = connect(null,injectAction())(UploadAddressForm);

