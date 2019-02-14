
import styles from './css/textFlat.css';

class TextFlat extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("TextFlat render");

        var {text} = this.props;

        return(
            <span className={styles.flatText}>{text}</span>
        );
    }


}

module.exports = TextFlat;
