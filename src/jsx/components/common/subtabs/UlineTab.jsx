
import styles from './css/ulineTab.css';

class ULineTab extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("ULineTab render");
        var {text,index,selected,total} = this.props,
            itemCls = this.mergeClassName(styles.item, (index==selected?styles.on:"")),
            tabStyle = {
                width:100/(total)+"%"
            };

        return(
            <span className={itemCls} style={tabStyle} onClick={this.props.onClick}>
                <span>{text}</span><i></i>
            </span>
        );
    }


}

module.exports = ULineTab;
