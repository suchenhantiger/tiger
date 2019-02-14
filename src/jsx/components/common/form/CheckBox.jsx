import styles from './css/checkbox.css';

class CheckBox extends PureComponent{

    static defaultProps = {
        checked:false,
        align:"left"
    }

    //构造函数
    constructor(props) {
        super(props);
    }

    itemClick = ()=>{
        var {disabled} = this.props;
        if(!disabled)
          this.props.onChange(!this.props.checked);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("CheckBox render");

        var {text,checked,align,checkclass,disabled} = this.props,
            checkclass=checkclass||'theme1',
            frmCls = this.mergeClassName(styles.box, styles[align]),
            checkCls = this.mergeClassName(styles.checkbox,styles[checkclass],checked?styles.checked:"",disabled?styles.disable:"");

        return(
            <div className={frmCls} onClick={this.itemClick}>
                <span className={checkCls}></span>
                <span>{text}</span>
            </div>

        );
    }

}

module.exports = CheckBox;
