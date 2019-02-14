
import styles from './css/textarea.css';

class TextArea extends PureComponent{



    //构造函数
    constructor(props) {
        super(props);
        this.state={
          value:''
        }
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
        //打印渲染日志，必写
        systemApi.log("TextArea render");

        var {placeholder,disabled,nullable,label,bordertype} = this.props;
        var  divFrmCls= this.mergeClassName(styles.box,bordertype==""?"":styles[bordertype]);

        return(
            <div className={divFrmCls}>
              {label?(
                  <label>
                    {nullable==false?<i>*</i>:<i style={{"visibility":"hidden"}}>*</i>}
                    {label}
                  </label>
              ):null}
                <div className={styles.formelem + " " + (disabled?styles.disabled:"")}>
                    <textarea value={this.state.value} onChange={this.changeHandler} disabled={disabled} placeholder={placeholder}></textarea>
                </div>
            </div>

        );
    }


}

module.exports = TextArea;
