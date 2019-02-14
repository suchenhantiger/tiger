import H5lock from '../../../lib/H5lock';

import styles from './css/gestureLock.css';

class GestureLock extends PureComponent{

    static defaultProps = {
        title:"请解锁",
        chooseType:3,
        gestureEnd:function(){},
    }

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state={
              gestureType:systemApi.getValue(systemApi.getKey().GESTURE_SHOW_TYPE) || 1  //1：显示圆点显示线；2：显示圆点；3：显示圆点但消失
        }
    }

    componentDidMount(){
        var {chooseType,gestureEnd,gesture_show_type} = this.props,
            {gestureType}=this.state,
            {frame} = this.refs,
            width = $(frame).width(),
            height = $(frame).height();
            this.setState({gestureType:gesture_show_type})
        this._instance = new H5lock({
            frame,
            width,
            height,
            chooseType,
        	  callback:gestureEnd,
            showType:gestureType
        });
        this._instance.init();
    }

    componentWillUnmount(){
        if(this._instance){
            this._instance.destroy();
        }
    }
    componentWillReceiveProps(nextProps){
      this.setState({gestureType:nextProps.gesture_show_type})
    }
    toggleGestureType=()=>{
      var newType=this.state.gestureType==1?'3':'1';
      systemApi.setValue(systemApi.getKey().GESTURE_SHOW_TYPE,newType);
      this._instance.setShowType(newType);
      this.setState({gestureType:newType});
      this.props.gestureShowtypeSet(newType);
    }
    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("GestureLock render");

        var {title,className,secTitle,error,showGestureType} = this.props,
            {gestureType}=this.state,
            frameCls = this.mergeClassName(styles.frame, className),
            titleCls = this.mergeClassName(styles.title, error?styles.error:""),
            gestureIconCls=gestureType==1?styles.icon_gesture_open:styles.icon_gesture_hide;
        return(
            <div className={frameCls}>
                <div className={titleCls}>{title}</div>
                {secTitle?(<div className={styles.secTitle}>{secTitle}</div>):null}
                {showGestureType?
                  <div className={styles.gesture_box} onClick={this.toggleGestureType}>
                    <a className={styles.gesture_txt}>手势轨迹</a>
                    <a className={gestureIconCls}>{gestureType==1?'开':'关'}</a>
                  </div>
                  :null
                }

                <div className={styles.pwdFrame} ref="frame"></div>
            </div>
        );
    }


}

module.exports = GestureLock;
