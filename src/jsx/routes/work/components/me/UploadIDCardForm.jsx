import styles from './css/certificationForm.less';
import {connect} from 'react-redux';
import {upLoadImage} from '../../actions/me/meAction';
import {showMessage, ERROR, SUCCESS} from '../../../../store/actions';




class UploadIDCardForm extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            femail:0,
            idType: "",
            idNO:"",
            birthday:new Date(),
            errMsg:"",
            frontPic:"",
            backPic:""

           
        };



    }



    submit = ()=>{
        var {submit} = this.props;

        var { 
            frontPic="",
            backPic=""
        }=this.state;

        if(frontPic.length==0){
            this.props.showMessage("error","请上传身份证正面照");
            //this.setState({errMsg:"请上传身份证正面照"});
        }else if( backPic.length==0){
            this.props.showMessage("error","请上传身份证背面照");
            //this.setState({errMsg:"请上传身份证背面照"});
        }else{
            submit && submit();
        }
        
        
    }

    getFrontPicture = ()=>{
        Client.getPicture((frontPic)=>{
           console.log(frontPic);
            this.props.upLoadImage(this,frontPic,1,()=>{
                this.setState({frontPic});
            });
        },()=>{

        });
    }

    getBackPicture =()=>{
     
        Client.getPicture((backPic)=>{
            
            this.props.upLoadImage(this,backPic,2,()=>{
                this.setState({backPic});
            });
        },()=>{

        });
    }


    //渲染函数
    render() {

        var { name= "",
        femail=1,errMsg="",frontPic="",backPic="",
        idType="",
        idNO=""} = this.state;

        return (
           
            <div className={styles.cardFrame}>
                <div className={styles.frame}>
                        <div className={styles.upload_box} onClick={this.getFrontPicture}>
                            <span>点击上传证件正面</span>
                            {frontPic.length>0?<img className={styles.imageFrame} src={frontPic} />:null}
                        </div>
                    <div className={styles.upload_box} onClick={this.getBackPicture}>
                        <span>点击上传证件反面</span>
                        {backPic.length>0?<img className={styles.imageFrame} src={backPic} />:null}
                    </div>
                </div>
                <div className={styles.login_int}>
                      只支持PNG、JPG格式图片，图片大小不可超过2MB。<br/>
                      拍摄示例
                </div>
                <div className={styles.frame2} >
                      <ul className={styles.cf_example}>
                          <li>
                              <div className={styles.cf_img01}></div>
                              <i className={styles.icon_correct}></i>
                              <p>标准</p>
                          </li>
                          <li>
                              <div className={styles.cf_img02}></div>
                              <i className={styles.icon_error}></i>
                              <p>图像过小</p>
                          </li>
                          <li>
                              <div className={styles.cf_img03}></div>
                              <i className={styles.icon_error}></i>
                              <p>图像模糊</p>
                          </li>
                          <li>
                              <div className={styles.cf_img04}></div>
                              <i className={styles.icon_error}></i>
                              <p>照片反光</p>
                          </li>
                      </ul>
                  </div>

                  <div className={styles.login_bt_text2} onClick={this.submit}>
                    <div className={this.mergeClassName(styles.login_btn2, "mg-lr-30")}><button >立即认证</button></div>
                </div>


            </div>
        );
    }

}
function injectProps(state){
    return {};
}
function injectAction(){
    return {upLoadImage,showMessage};
}

module.exports = connect(null,injectAction())(UploadIDCardForm);

