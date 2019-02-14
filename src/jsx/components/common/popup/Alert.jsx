import FullScreenView from '../fullscreen/FullScreenView';
import styles from './css/confrimpopup.css';

class Alert extends PureComponent {
    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        /*有两种模式  参考 清理缓存  跟 退出账号    传入icon title在左边带icon   不传入icon  title在中间*/
        systemApi.log("Alert render");
        //hidetitle 默认显示，true则隐藏
        var {onSure,text,title,onClose} = this.props;

        return (
            <FullScreenView mask={true}>
                <div className={styles.pop_inner}>
                    <div className={styles.icon_pup_close} onClick={onClose}></div>
                    <div className={styles.pup_content}>
                        {title?<p className={this.mergeClassName("font36", "mg-bt-30")}>{title}</p>:null}
                        {this.props.children}
                    </div>
                    <div className={styles.pup_bot}>
                        <div className={styles.btn_pup_center} onClick={onSure}>{text}</div>
                    </div>
                </div>
            </FullScreenView>
        );
    }
}

module.exports =Alert;
