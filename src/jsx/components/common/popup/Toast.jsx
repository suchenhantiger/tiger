
import styles from './css/toast.css';

class Toast extends PureComponent{

    //默认属性值
    static defaultProps = {
        type:"success"
    };

    //构造函数
    constructor(props) {
        super(props);
    }

    renderText(text){
        //.replace(/<[^(>|<)]*>/g,"") 去除标签
        return (text||"").replace(/\n/g,"<br/>");
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("Toast render");

        var {text,type} = this.props;

        return(
            <div className={styles.frame}>
                <div className={styles.box}>
                    <div className={this.mergeClassName(styles.icon, styles[type])}></div>
                    <div className={styles.text} dangerouslySetInnerHTML={{__html:this.renderText(text)}}></div>
                </div>
            </div>
        );
    }


}

module.exports = Toast;
