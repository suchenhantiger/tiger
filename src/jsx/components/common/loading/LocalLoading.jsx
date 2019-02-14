import styles from './css/loading.css';

class LocalLoading extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("LocalLoading render");

        return(
            <div className={this.mergeClassName(styles.frame, styles.local)}>
                <div className={styles.loading}></div>
            </div>
        );
    }


}

module.exports = LocalLoading;
