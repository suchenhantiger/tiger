
import styles from './css/button.css';

class Button extends PureComponent{

    static defaultProps = {
        shape:"rect"
    }

    //构造函数
    constructor(props) {
        super(props);
    }
    getBtnRef=()=>{
      return this.refs.ref_btncp;
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("Button render");

        var {value,onClick,shape,bgcolor} = this.props;

        return(
            <div className={styles.box} ref="ref_btncp">
                <span className={this.mergeClassName(styles.button, styles[shape], styles[bgcolor])} onClick={onClick}>{value}</span>
            </div>
        );
    }


}

module.exports = Button;
