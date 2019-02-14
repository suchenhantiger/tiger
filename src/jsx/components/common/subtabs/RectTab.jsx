
import styles from './css/rectTab.css';

class ReactTab extends PureComponent{

    static defaultProps = {
        dot:false
    }

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("ReactTab render");

        var {text,index,selected,total,dot,theme} = this.props,
            itemCls = styles.item + " " + styles[theme] + " " + (index==selected?styles.on:""),
            tabStyle = {
                width:100/(total+1)+"%",
                marginLeft:(100/total-100/(total+1))/3+"%",
                marginRight:(100/total-100/(total+1))/3+"%"
            };

        return(
            <a className={itemCls} style={tabStyle} onClick={this.props.onClick}>
                <span>{text}</span>
                {dot?(
                    <i className={styles.sm_tip}></i>
                ):null}
            </a>
        );
    }


}

module.exports = ReactTab;
