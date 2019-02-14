import FullScreenView from '../fullscreen/FullScreenView';
import RmcPicker from 'rmc-picker';
import RmcMultiPicker  from 'rmc-picker/lib/MultiPicker.web';
import RmcPopup  from 'rmc-picker/lib/Popup.web';
import styles from './css/picker.css';

class Picker extends PureComponent{

    //默认属性值
    static defaultProps = {

     };

    //构造函数
    constructor(props) {
        super(props);
        this.state={
          pickervalue:null
        }
    }
    onDismiss=()=>{
      var {onPickerCancel}=this.props;
      if(onPickerCancel)
        onPickerCancel(value);
    }

    onOk=(value)=>{

      var {onPickerChoose,colData}=this.props;
        if(onPickerChoose)
        {
        //  onPickerChoose(value);
        onPickerChoose(colData.find((item)=>{return item.value==value}));
        }
          this.setState({
            pickervalue:value
          })
    }
    renderPicker=()=>{
      var list=[],
         {mode,colData}=this.props;
         if("multi"==mode)
         {
           for(var i=0;i<colData.length;i++){
               var item=colData[i];
               list.push({props:{children:item} })
           }
           return(
             <RmcMultiPicker>{list}</RmcMultiPicker>
           )
         }
      else
        return <RmcPicker>{colData}</RmcPicker>;


    }
    getKeyValue=()=>{
      var obj={};
      obj[this.props.tag]=this.state.pickervalue;
      return obj;
    }
    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("Picker render");
        var {mode,items,title,dismissText,okText}=this.props;
        var {pickervalue} = this.state;
        var paratitle=title||'请选择';
        var paradismissText=dismissText||'取消';
        var paraokText=okText||'确定';
        var headerleftCls = this.mergeClassName(styles.picker_popup_item, styles.picker_popup_header_left);
        var headertitleCls= this.mergeClassName(styles.picker_popup_item,styles.picker_popup_header_title);
        var headerrightCls= this.mergeClassName(styles.picker_popup_item,styles.picker_popup_header_right);
        const colData1 = [{ label: '1', value: '1' }, { label: '2', value: '2' }];
        const colData2 = [{ label: '1', value: '1' }, { label: '2', value: '2' }];

        return(
          <RmcPopup
              className="fortest"
              transitionName="rmc-picker-popup-slide-fade"
              maskTransitionName="rmc-picker-popup-fade"
              //picker={<RmcMultiPicker>{[{props:{children:colData1}},{props:{children:colData2}}]}</RmcMultiPicker>}
              picker={this.renderPicker()}
              title={paratitle}
              onDismiss={this.onDismiss}
              onOk={this.onOk}
              value={pickervalue}
              dismissText={paradismissText}
              okText={paraokText}
            >
              {this.props.children}

            </RmcPopup>
        );
    }


}

module.exports = Picker;
