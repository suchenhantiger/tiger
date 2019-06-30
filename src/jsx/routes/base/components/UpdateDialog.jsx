import Confirm2 from '../../../components/common/popup/Confirm2';

class UpdateDialog extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        
    }


    updateApp =(appType,downUrl,updateType)=> ()=>{
        if(appType && appType ==1){
            var {onCancel} = this.props;
            onCancel && onCancel();
        }
        
        if(updateType==1){
            var {vsRemark,serverUrl,version,showUpdate,newDownUrl} = this.props;
            Client.appUpdate({version,showUpdate,appType,downUrl:newDownUrl});
        }else{
            Client.openUrlWithBrowser(downUrl,()=>{
                
                        });
        }

   }



    //渲染函数
    render(){
        //suggestBalance={suggestBalance} maxFowBalance={maxFowBalance} canFowBalance
        var {onCancel,vsRemark,downUrl,serverUrl,version,showUpdate,appType,updateType} = this.props;

     

        return(
            <Confirm2  sureText={"立即更新"} cancelText={"取消"} showCancel={(appType && appType ==1)} onSure={this.updateApp(appType,downUrl,updateType)} onCancel={onCancel}  >
                <p className={"font30 mg-bt-30 center"} >新版本 V{version}</p>
                <div dangerouslySetInnerHTML={{__html:vsRemark} } />
            </Confirm2>
        );
    }

}

module.exports = UpdateDialog;
