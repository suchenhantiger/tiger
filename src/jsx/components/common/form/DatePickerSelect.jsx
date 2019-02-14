
import DatePicker from '../popup/DatePicker.jsx';
import styles from './css/datepickerselect.css';
var today = new Date();
class DatePickerSelect extends PureComponent{

  static defaultProps = {
    defaultbdatetime:today
  }
    //构造函数
    constructor(props) {
        super(props);
        this.state={
          date:systemApi.dateFormat(this.props.defaultbdatetime, 'yyyy-MM-dd hh:mm')
        }
    }
    componentWillMount(){
      var {value} = this.props, {date}=this.state;
       if(value){
         this.setState({date:value});
       }
    }
    componentWillReceiveProps(nextProps){
      var {value} = nextProps, {date}=this.state;
       if(value){
         this.setState({date:value});
       }
    }
    onBeginDatePick = (date)=>{
      var {disabled,onPick} = this.props;
      if(!disabled){
        this.setState({date});
        if(onPick)
          onPick(date);
      }
    }
    getKeyValue=()=>{
      var obj={};
      obj[this.props.tag]=this.state.date;
      return obj;
    }
    //渲染函数
    render(){


        var {label,nullable,disabled,bordertype} = this.props,
            {date}=this.state,
            inputFrmCls = this.mergeClassName(styles.formelem, disabled?styles.disabled:""),
            divFrmCls= this.mergeClassName(styles.box,bordertype==""?"":styles[bordertype]);


        return(
            <div className={divFrmCls}>
                {label?(
                    <label>
                      {nullable==false?<i>*</i>:null}
                      {label}
                    </label>
                ):null}
                <div className={inputFrmCls}>
                  {!disabled?
                  <DatePicker mode="datetime" onDatePick={this.onBeginDatePick}
                              onDatePickCancel=""
                              minDate=""
                              maxDate="" nowDate={date} title="" dismissText="" okText="">
                    <div className={styles.pickerpanel}>
                         <span className={styles.datac}>{date || systemApi.dateFormat(this.props.defaultbdatetime, 'yyyy-MM-dd hh:mm')}</span>
                         <i className={styles.arrow}></i>
                   </div>
                   </DatePicker>:
                     <div className={styles.pickerpanel}>
                              <span className={styles.datac}>{date || systemApi.dateFormat(this.props.defaultbdatetime, 'yyyy-MM-dd hh:mm')}</span>
                      </div>
                 }
                </div>
            </div>
        );
    }


}

module.exports = DatePickerSelect;
