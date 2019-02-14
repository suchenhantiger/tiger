
import styles from './css/textTab.css';

class TextTab extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    textClick = ()=>{
        var {index,onClick} = this.props;
        onClick(index);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("TextTab render");

        var {text,index,selected} = this.props,
            textCls = this.mergeClassName(styles.text, index==selected?styles.on:"");

        return(
            <a className={textCls} onClick={this.textClick}>{text}</a>
        );
    }


}

module.exports = TextTab;
