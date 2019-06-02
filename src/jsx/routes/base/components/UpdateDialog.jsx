import Confirm2 from '../../../components/common/popup/Confirm2';

class UpdateDialog extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        
    }


    updateApp =(appType,downUrl)=> ()=>{
        if(appType && appType ==1){
            var {onCancel} = this.props;
            onCancel && onCancel();
        }
          
        Client.openUrlWithBrowser(downUrl,()=>{
        
                });
   }



    //渲染函数
    render(){
        //suggestBalance={suggestBalance} maxFowBalance={maxFowBalance} canFowBalance
        var {onCancel,vsRemark,downUrl,serverUrl,version,showUpdate,appType} = this.props;

     

        return(
            <Confirm2  sureText={"立即更新"} cancelText={"取消"} showCancel={(appType && appType ==1)} onSure={this.updateApp(appType,downUrl)} onCancel={onCancel}  >
                <p className={"font30 mg-bt-30 center"} >新版本 V{version}</p>
                <div dangerouslySetInnerHTML={{__html:vsRemark} } />
            </Confirm2>
        );
    }

}

module.exports = UpdateDialog;
