
import styles from './css/numItem.css';

class NumItem extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("NumItem render");

        var {title,iconClass,rightText,onClick} = this.props;

        return(
            <li className={styles.li} onClick={onClick}>
            	<a>
                	<i className={styles[iconClass]}></i>
                    <span>{title}</span>
                    {rightText>0?(
                        <i className={styles.big_tip}>{rightText}</i>
                    ):null}
                </a>
            </li>
        );
    }


}

module.exports = NumItem;
