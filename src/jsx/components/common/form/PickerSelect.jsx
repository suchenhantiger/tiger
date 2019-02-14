
import Picker from '../popup/Picker.jsx';
import styles from './css/pickerselect.css';

class PickerSelect extends PureComponent{


    //构造函数
    constructor(props) {
        super(props);
        this.state={
          data:{"value":"","label":""}
        }
    }
    componentWillMount(){
      var {value} = this.props ,{data}=this.state;

      if(value && data.value=="")
          this.setState({data:value});

    }

    componentWillReceiveProps(nextProps){
      var {value} = nextProps ,{data}=this.state;

      if(value)  //接收到新的参数 不管旧的有没有值  都重置
          this.setState({data:value});

    }
    onPick = (data)=>{
      var {onPick,disabled}=this.props;


      if(!disabled){
        this.setState({data});
        if(onPick)
          onPick(data);
      }


    }
    getKeyValue=()=>{
      var obj={};
      obj[this.props.tag]=this.state.data.value;
      return obj;
    }
    //渲染函数
    render(){


        var {label,nullable,bordertype,coldata,disabled} = this.props,
            {data}=this.state,
            inputFrmCls = this.mergeClassName(styles.formelem, disabled?styles.disabled:""),
            divFrmCls= this.mergeClassName(styles.box,bordertype==""?"":styles[bordertype]);

        return(
            <div className={divFrmCls}>
                {label?(
                    <label>
                        {nullable==false?<i>*</i>:<i style={{"visibility":"hidden"}}>*</i>}
                      {label}
                    </label>
                ):null}
                <div className={inputFrmCls}>
                    {!disabled?
                  <Picker onPickerChoose={this.onPick}
                          mode="single"
                          colData={coldata}>
                          <div className={styles.pickerpanel}>
                            <span className={styles.datac}>{data.label || ''}</span>
                            <i className={styles.arrow}></i>
                          </div>
                  </Picker>:
                  <div className={styles.pickerpanel}>
                      <span className={styles.datac}>{data.label || ''}</span>
                  </div>
              }
                </div>
            </div>
        );
    }


}

module.exports = PickerSelect;
