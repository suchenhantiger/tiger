
import styles from './css/flatTab.css';

class FlatTab extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("FlatTab render");

        var {text,index,selected,total,theme} = this.props,
            itemCls = styles.item + " " + styles[theme] + " " + (index==selected?styles.on:""),
            tabStyle = {
                width:80/(total)+"%"
            };

        return(
            <a className={itemCls} style={tabStyle} onClick={this.props.onClick}>
                <span>{text}</span>
            </a>
        );
    }


}

module.exports = FlatTab;
