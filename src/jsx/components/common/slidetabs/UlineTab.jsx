
import styles from './css/ulineTab.css';

class ULineTab extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    getWidth(){
        return $(this.refs.item).outerWidth();
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("ULineTab render");

        var {text,index,selected,theme} = this.props,
            itemCls = this.mergeClassName(styles.item, styles[theme], (index==selected?styles.on:""));

        return(
            <a className={itemCls} onClick={this.props.onClick} ref="item">
                <span>{text}</span>
            </a>
        );
    }


}

module.exports = ULineTab;
