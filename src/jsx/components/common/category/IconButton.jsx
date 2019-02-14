
import styles from './css/icon.css';

class IconButton extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("IconButton render");

        var {iconClass,onClick} = this.props,
            linkCls = styles.icon+" "+styles[iconClass];

        return(
            <a className={linkCls} onClick={onClick}></a>
        );
    }


}

module.exports = IconButton;
