import { connect } from 'react-redux';
import FullScreenView from '../fullscreen/FullScreenView';
import {showMessage} from '../../../store/actions';
import OpPopup from '../../common/popup/OpPopup';
import appSchema from '../../../../json/appSchema.json'
import ConfrimPopUp from '../popup/ConfirmPopUp'
import styles from './css/qrcode.css';
class Qrcode extends PureComponent {
    //构造函数
    constructor(props) {
        super(props);

        this.state={
          showoptip:false,
          savesuccessflag:false
        }
        this.touchBeginTime=null;
        this.touchEndTime=null;
        this.defaultProps={
            tips:[{id:1,txt:'保存图片'}]
          }
    }
    beginTime=()=>{

      this.touchBeginTime=new Date();



    }
    endTime=()=>{
      console.log('endtime');
      this.touchEndTime=new Date();

      var timeSpan=parseInt((this.touchEndTime.getTime()-this.touchBeginTime.getTime())/(1000));
      if(timeSpan>=1)  //长按1秒 就保存到图库
         {

           this.setState({showoptip:true})
         }
    }
   imgClick=(e)=>{
           e.stopPropagation();
   }
   tipcloseClick=()=>{
     this.setState({
        showoptip:false
     })
   }
   tipitemClick=(id,txt)=>{
     return ()=>{
       var {wxflag} = this.props;
       this.setState({showoptip:false});
       var img=this.refs.qrcodeimg;
       var canvas = document.createElement("canvas");
           canvas.width = img.width;
           canvas.height = img.height;

            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);

       var imageData = canvas.toDataURL().replace(/data:image\/png;base64,/,'');
     

        Client.SaveImageDataToLibrary(()=>{
          if(wxflag)
            this.setState({savesuccessflag:true});
          else
            this.props.showMessage("success", "保存成功！");

       },imageData);


     }

   }
   closeConfrimPopUp=()=>{
       this.setState({savesuccessflag:false});
   }
   openWx=()=>{

       var appSchemaItem=appSchema.data.find((item)=>item.app=='WeiXin');

       var g_deviceMessage=systemApi.getDeviceMessage();
         var obj=null;
       if(g_deviceMessage.isIOS)
          obj={"schema":appSchemaItem.ios_schema};
       else if(g_deviceMessage.isAndroid)
          obj={"schema":appSchemaItem.android_schema,"package_name":appSchemaItem.package_name};

       Client.openApp(()=>{
           this.setState({savesuccessflag:false});
       },()=>{
         this.props.showMessage("warning", "亲，您貌似还未安装微信，请安装后重试！");
       },
       obj)


   }
    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("Qrcode render");

        var {close,wxflag} = this.props;
        var {showoptip,savesuccessflag}=this.state;
        return (
            <FullScreenView mask={true}>
                <div className={styles.popupbox} onClick={close}>
                    <div className={styles.popupinnerbox}>

                        <div>
                            <span  className={styles.touchtxt}>长按二维码保存到手机相册</span>
                            <img src={this.props.imgsrc} onClick={this.imgClick} onTouchStart={this.beginTime} onTouchEnd={this.endTime}   ref="qrcodeimg"/>
                            {wxflag?
                             <div className={styles.openwx} onClick={this.openWx}>
                                <span>打开微信</span>
                             </div>:""}
                        </div>
                    </div>
                </div>
                 {showoptip?<OpPopup data={this.defaultProps.tips} itemClick={this.tipitemClick} close={this.tipcloseClick}/>:""}
                 {savesuccessflag?
                     <ConfrimPopUp title="保存成功"  titlealign="center" titletheme="y" onCancel={this.closeConfrimPopUp} onSure={this.openWx} suretxt="打开微信">
                                 <div className={styles.absp_savesuccesstxt}>
                                      使用微信扫一扫，扫描相册内保存的二维码。
                                   </div>
                      </ConfrimPopUp>
                   :""}
            </FullScreenView>
        );
    }

}
function injectAction(){
    return{showMessage };
}

module.exports = connect(null,injectAction())(Qrcode);
