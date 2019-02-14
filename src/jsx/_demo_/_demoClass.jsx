
import styles from '../../../css/components/****/******.css';

class DemoClass extends PureComponent{

    //默认属性值
    static defaultProps = {};

    //构造函数
    constructor(props,context) {
        super(props,context);
        //默认状态
        this.state = {}
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("DemoClass render");

        return(
            <div className={styles.frame}>DemoClass，敬请期待</div>
        );
    }


}

module.exports = DemoClass;
