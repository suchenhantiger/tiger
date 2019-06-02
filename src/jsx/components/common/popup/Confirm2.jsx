import FullScreenView from '../fullscreen/FullScreenView';
import styles from './css/confrimpopup2.css';

class Confrim extends PureComponent {
    //默认属性值
    static defaultProps = {
        showCancel:true,
        heightType:0
    };

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("Confrim render");

        var {onSure,onCancel,title,titleCenter,sureText,cancelText,showCancel,heightType} = this.props;
        return (
            <FullScreenView mask={true}>
            <div className={styles.pop_outer} style={heightType==1?{top:"20%"}:null}>
                <div className={styles.pop_inner}>
                    <div className={styles.pup_content}>
                        {title?<p className={"font36 mg-bt-30 "+(titleCenter?"center":"")}>{title}</p>:null}
                        {this.props.children}
                    </div>
                    {showCancel?
                     <div className={styles.pup_bot}>
                        <div className={styles.btn_pup_cancel} onClick={onCancel}>{cancelText||"取消"}</div>
                        <div className={styles.line_01}></div>
                        <div className={styles.btn_pup_confirm} onClick={onSure}>{sureText||"确定"}</div>
                    </div>
                    :
                    <div className={styles.pup_bot}>
                        <div className={styles.btn_pup_confirm2} onClick={onSure}>{sureText||"确定"}</div>
                    </div>
                    }
                   
                </div>
                </div>
            </FullScreenView>
        );
    }

}
module.exports = Confrim;
