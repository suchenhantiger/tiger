
import FullScreenView from '../fullscreen/FullScreenView';
import styles from './css/treeCommonSelectorPopUp.css';



class TreeCommonSelectorPopUp extends PureComponent {
    //构造函数
    constructor(props) {
        super(props);
    }
     renderList(){
         var {itemClick} = this.props;
       var list=[],
       {str}=this.props;
       var strarray=str.split('>');
       for(var i=0;i<strarray.length;i++){
         list.push(<li onClick={itemClick(strarray[i])}><a>{strarray[i]}</a></li>)
       }
      return list;

     }
    //渲染函数
    render() {
        //打印渲染日志，必写
        /*有两种模式  参考 清理缓存  跟 退出账号    传入icon title在左边带icon   不传入icon  title在中间*/
        systemApi.log("ConfrimPopUp render");

        var {onSure,onCancel,title,icon,titlealign,titletheme,suretxt,canceltxt,boxstyle} = this.props;
        var basetheme=systemApi.getValue(systemApi.getKey().BASETHEME);

        var ecardboxCls=this.mergeClassName(styles.cp_ecard_box,boxstyle?styles[boxstyle]:"");
        var iconCls=this.mergeClassName(styles.pp_top02,styles[icon],titlealign?styles[titlealign]:" ",titletheme?styles[basetheme]:" ");
        var sureCls=this.mergeClassName(styles.btn_pp_ok01,styles[basetheme]);
        var cancelCls = this.mergeClassName(styles.btn_pp_cancel,styles[basetheme]);

        return (
            <FullScreenView mask={true}>
              <div className={styles.popupbox} onClick={close}>
                <div className={ecardboxCls}>
                   <div className={iconCls}>{title}</div>
                   {this.props.children}
                     <div className={styles.pp_btns}>
                        <a className={cancelCls} onClick={onCancel}>{canceltxt?canceltxt:'取消'}</a>
                        <a className={sureCls}  onClick={onSure}>{suretxt?suretxt:'确定'}</a>
                      </div>
                    </div>
              </div>
            </FullScreenView>
        );
    }

}
module.exports =TreeCommonSelectorPopUp;
