
import styles from './css/icon.css';

class IconTab extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    iconClick = ()=>{
        var {index,onClick} = this.props;
        onClick(index);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("IconTab render");

        var {iconClass,index,selected} = this.props,
            linkCls = this.mergeClassName(styles.icon, styles[iconClass], (index==selected?styles.on:""));

        return(
            <a className={linkCls} onClick={this.iconClick}></a>
        );
    }


}

module.exports = IconTab;
