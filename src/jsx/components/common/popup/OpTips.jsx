
import FullScreenView from '../fullscreen/FullScreenView';
import styles from './css/optips.css';



class OpTips extends PureComponent {
    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("OpTips render");
        /*用户点击某项操作后，弹出提示框告诉用户操作成功  示例  首次登录绑定后，修改密码成功后  弹出该组件*/
        var {message,theme,close} = this.props;
        var boxCls=this.mergeClassName(styles.ecard_box, theme?styles[theme]:"");


        return (
            <FullScreenView mask={true}>
              <div className={boxCls}>
                <div className={styles.pp_mid}>
            	     <p className={styles.pp_p02}>{message}</p>
                 </div>
                 <div className={styles.pp_btns2}>
                   <a onClick={close}>确定</a>
                 </div>
               </div>
            </FullScreenView>
        );
    }

}
module.exports =OpTips;
