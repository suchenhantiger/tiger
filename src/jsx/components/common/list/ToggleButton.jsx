import styles from './css/toggleButton.css';

class ToggleButton extends PureComponent{

    //默认属性值
    static defaultProps = {
        open:false
    };

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    buttonClick = ()=>{
        var {onChange,open} = this.props;
        if(onChange){
            onChange(!open);
        }
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("ToggleButton render");
        var basetheme=systemApi.getValue(systemApi.getKey().BASETHEME);
        var {open} = this.props,
            boxCls = this.mergeClassName(styles.box,styles[basetheme], open?styles.open:"");

        return(
            <div className={boxCls} onClick={this.buttonClick}>
                <div className={styles.button}></div>
            </div>
        );
    }

}

module.exports = ToggleButton;
