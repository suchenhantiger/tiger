
import styles from '../../../../css/components/common/screenlock/numButton.css';

class NumButton extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        //默认状态
        this.state = {
            touch:false
        }
    }

    btnClick(){
        var {text} = this.props;
        this.props.onClick(text);
    }

    touchStart(){
        this.setState({
            touch:true
        })
    }

    touchEnd(){
        this.setState({
            touch:false
        })
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("NumButton render");

        var {text} = this.props,
            {touch} = this.state,
            btnCls = styles.btn + " " + (touch?styles.touch:"");

        return(
            <div
                className={btnCls}
                onTouchStart={this.touchStart.bind(this)}
                onTouchEnd={this.touchEnd.bind(this)}
                onTouchTap={this.btnClick.bind(this)}>
                {text}
            </div>
        );
    }


}

module.exports = NumButton;
