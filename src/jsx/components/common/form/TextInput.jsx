
import styles from './css/textinput.css';

class TextInput extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state={
          value:''
        }
    }
    componentWillMount(){
      var {value} = this.props;
      if(value)
        this.setState({value});
    }
    componentWillReceiveProps(nextProps){
        var {value} = nextProps;
        if(value)
          this.setState({value});
      }
    changeHandler = (e)=>{
      var {onChange}=this.props;
      if(onChange)
         onChange(e.target.value);
      this.setState({value:e.target.value});
    }

    getKeyValue=()=>{
      var obj={};
      obj[this.props.tag]=this.state.value;
      return obj;
    }
    //渲染函数
    render(){


        var {placeholder,disabled,label,nullable,shape,icon,type,bordertype,valuealign,ratio} = this.props,
            labelCls=this.mergeClassName(styles.label,ratio==""?"":styles[ratio]),
            inputFrmCls = this.mergeClassName(styles[shape], styles.formelem,styles[valuealign],  disabled?styles.disabled:"", icon==""?"":styles[icon],ratio==""?"":styles[ratio]),
            divFrmCls= this.mergeClassName(styles.box,bordertype==""?"":styles[bordertype]);

        return(
            <div className={divFrmCls}>
                {label?(
                    <label className={labelCls}>
                      {nullable==false?<i>*</i>:<i style={{"visibility":"hidden"}}>*</i>}
                      {label}
                    </label>
                ):null}
                <div className={inputFrmCls}>
                  {disabled?
                    <span className={disabled?styles.disabled:""}>{this.state.value}</span>
                  :
                    <input type={type} value={this.state.value} onChange={this.changeHandler} placeholder={placeholder}  />
                }

                </div>
            </div>
        );
    }


}

module.exports = TextInput;
