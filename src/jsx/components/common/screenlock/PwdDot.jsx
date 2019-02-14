
import styles from '../../../../css/components/common/screenlock/pwdDot.css';

class PwdDot extends PureComponent{

    //默认属性值
    static defaultProps = {
        select:false
    };

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("PwdDot render");

        var {select} = this.props,
            dotCls = styles.pwdDot + " " + (select?styles.select:"");

        return(
            <div className={dotCls}></div>
        );
    }


}

module.exports = PwdDot;
