
import styles from './css/iconItem.css';

class IconItem extends PureComponent{

    //默认属性值
    static defaultProps = {
        arrow:false
    };

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("IconItem render");

        var {text,icon,arrow,onClick,rightIcons} = this.props,
            iconCls = this.mergeClassName(styles.icon, styles[icon]);

        return(
            <li className={styles.li} onClick={onClick}>
            	<a>
                	<i className={iconCls}></i>
                    <span>{text}</span>
                    {arrow?(<i className={styles.arrow}></i>):null}
                    <div className={styles.rightBox}>
                        {rightIcons}
                    </div>
                </a>
            </li>
        );
    }


}

module.exports = IconItem;
