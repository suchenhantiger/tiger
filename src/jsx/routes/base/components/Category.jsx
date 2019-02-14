import styles from './css/uiTemplate.css';

class Category extends PureComponent {
    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("Category render");

        var {title} = this.props;

        return (
            <div className={styles.category}>
                <span className={styles.stick}></span>
                <span className={styles.title}>{title}</span>
            </div>
        );
    }

}

module.exports = Category;
