
import styles from './css/textButton.css';

class TextButton extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("TextButton render");

        var {text,onClick} = this.props;

        return(
            <a className={styles.flatText} onClick={onClick}>{text}</a>
        );
    }


}

module.exports = TextButton;
