import FullScreenView from '../fullscreen/FullScreenView';
import styles from './css/confrimpopup.css';

class AlertPopUp extends PureComponent {
    //构造函数
    constructor(props) {
        super(props);
    }

    renderList(){
        var list=[],
            {itemClick,str} = this.props,
            strarray=str.split('>');

        return strarray.map(item => <li onClick={itemClick(item)}><a>{item}</a></li> );
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        /*有两种模式  参考 清理缓存  跟 退出账号    传入icon title在左边带icon   不传入icon  title在中间*/
        systemApi.log("AlertPopUp render");
        //hidetitle 默认显示，true则隐藏
        var {onSure,onCancel,title,icon,titlealign,titletheme,suretxt,canceltxt,boxstyle,hidetitle,btnColor,btnBackColor} = this.props,
            ecardboxCls=this.mergeClassName(styles.cp_ecard_box,boxstyle?styles[boxstyle]:""),
            iconCls=this.mergeClassName(styles.pp_top02,styles[icon],titlealign?styles[titlealign]:" "),
            sureCls=styles.btn_pp_ok01,
            btnStyle = {'width':'100%','float':'none'};

        if(btnColor){
            btnStyle["color"] = btnColor;
        }
        if(btnBackColor){
            btnStyle["backgroundColor"] = btnBackColor;
        }

        return (
            <FullScreenView mask={true}>
                <div className={styles.popupbox}>
                    <div className={ecardboxCls}>
                        {hidetitle?null:<div className={iconCls}>{title}</div>}
                        {this.props.children}
                        <div className={styles.pp_btns}>
                            <a className={sureCls} style={btnStyle} onClick={onSure}>{suretxt?suretxt:'确定'}</a>
                        </div>
                    </div>
                </div>
            </FullScreenView>
        );
    }
}

module.exports =AlertPopUp;
