
import styles from './css/slideIcon.css';

class SlideIcon extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    itemClick = ()=>{
        var {onClick,iconBack} = this.props;
        iconBack();
        if(onClick){
            onClick();
        }
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("SlideIcon render");

        var {iconClass,aClass, text} = this.props,

            icoCls = this.mergeClassName(styles.icon, styles[iconClass],styles[aClass]);


        return(
            <a className={icoCls} onClick={this.itemClick}>{text}</a>
        );
    }


}

module.exports = SlideIcon;
