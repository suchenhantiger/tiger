
import styles from './css/input.css';

class Input extends PureComponent{

    static defaultProps = {
        value:"",
        shape:"rect",
        icon:"",
        disabled:false,
        type:"text"
    }

    //构造函数
    constructor(props) {
        super(props);
        this.state={
            isshowclear:false
        }
    }

    changeHandler = (e)=>{
        if(e.target.value!="")
            this.setState({isshowclear:true})
        else
            this.setState({isshowclear:false})
        this.props.onChange(e.target.value);
    }
    clearInput=()=>{
        this.setState({isshowclear:false})
        this.props.onChange("");

    }
    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("Input render");

        var {placeholder,disabled,label,shape,icon,type,value,showclear,onFocus} = this.props,
            {isshowclear}=this.state,
            inputFrmCls = this.mergeClassName(styles[shape], styles.formelem, label?styles.hasLabel:"", disabled?styles.disabled:"", icon==""?"":styles[icon]),
            clearCls=this.mergeClassName(styles.clearicon,!isshowclear?styles.hide:"");

        return(
            <div className={styles.box}>
                {label?(
                    <div className={styles.label}>{label}</div>
                ):null}
                <div className={inputFrmCls}>
                    <input type={type} value={value} onChange={this.changeHandler} onFocus={onFocus}  placeholder={placeholder} disabled={disabled} ref="ref_input"/>
                    {showclear?<span className={clearCls} onClick={this.clearInput}></span>:null}
                </div>
            </div>
        );
    }


}

module.exports = Input;
