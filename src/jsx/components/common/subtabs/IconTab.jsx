
import styles from './css/iconTab.css';

class IconTab extends PureComponent{

    static defaultProps = {
        iconCls:""
    }

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("IconTab render");

        var {text,index,selected,total,theme,iconCls} = this.props,
            itemCls = styles.item + " " + styles[theme] + " " + (index==selected?styles.on:""),
            tabStyle = {
                width:(100/(total)-1)+"%"
            };

        return(
            <a className={itemCls} style={tabStyle} onClick={this.props.onClick}>
                <span className={styles[iconCls]}>{text}</span>
            </a>
        );
    }


}

module.exports = IconTab;
