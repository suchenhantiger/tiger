
import FullScreenView from '../fullscreen/FullScreenView';
import styles from './css/oppopup.css';



class OpPopup extends PureComponent {
    //构造函数
    constructor(props) {
        super(props);
    }

     renderList(){
         var {itemClick,tips} = this.props;
       var list=[],
       {data}=this.props;
       if(tips)
         list.push(<li className={styles.tips}>{tips}</li>)
       for(var i=0;i<data.length;i++){
         list.push(<li onClick={itemClick(data[i].id,data[i].txt)}><a>{data[i].txt}</a></li>)
       }
      return list;

     }
    //渲染函数
    render() {
        //打印渲染日志，必写
        /*从底部弹出操作选项  示例：点击电话列表 从底部弹出电话列表 用户可选择拨打*/
        systemApi.log("OpPopup render");

        var {close,title} = this.props;
        return (
            <FullScreenView mask={true}>
              <div className={styles.oppopup_box}>
                  <div className={styles.body}>
                       <div className={styles.oppopup_title}>{title}</div>
          	           <ul>
              	        {this.renderList()}
                       </ul>
                  </div>
                   <a className={styles.cancel} onClick={close}>取消</a>
              </div>
            </FullScreenView>
        );
    }

}
module.exports =OpPopup;
