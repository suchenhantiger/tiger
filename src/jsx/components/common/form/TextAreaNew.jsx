import React from 'react';
import PureComponent from '../../base/PureComponent';
import styles from './css/textareanew.css';

class Textarea extends PureComponent {
  static defaultProps = {
      prefixCls: "xs-textarea",
      theme: "default",
      value:"",
      rows:1,
      icon:"",
      disabled:false,
      type:"text",
      bottomLine:false,
      autoHeight:false,
      readOnly:false
  }

  //构造函数
  constructor(props) {
    super(props);
    this.state = {
      inputValue:props.value
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({inputValue:nextProps.value,focus:nextProps.focus});
  }

  changeHandler = (e)=>{
      var {value} = e.target,{onChange,autoHeight}=this.props;
      onChange && onChange(value);
      this.setState({inputValue:value});
      if(autoHeight){
        this.refs.textArea.style.height = "";
        this.refs.textArea.style.height = this.refs.textArea.scrollHeight + "px";
      }
  }

  getValue =()=>{
     return this.state.inputValue;
  }

  clearValue =()=>{
    this.setState({
      inputValue:""
    });
  }

  clickBtn=()=>{
    var {onBtnClick}=this.props;
    onBtnClick && onBtnClick();
  }

  //渲染函数
  render() {
    var {prefixCls,theme,placeholder,disabled,label,icon,rows,
      bottomLine,clearBtn,maxlength,countMax,disabled,readOnly,focus,button,customStyle} = this.props,
    {inputValue,areaHeight}=this.state;
    let inputFrame = styles.frame+" "+styles.item
      +" "+(bottomLine?styles.bottom:"")+" "+(focus?styles.focus:"")
      +" "+(customStyle?styles[customStyle]:"");

    if(clearBtn && inputValue.length==0){
      clearBtn=false;
    }
    if(countMax){
      maxlength=countMax;
    }
    return (
      <div className={inputFrame}>
          {label?(
            //   <div className={styles.label+" "+(disabled?styles.label_disabled:"")}>{label}</div>
            <div className={styles.label}>{label}</div>
          ):""}
          <div className={styles.control}>
              <textarea maxLength={maxlength} style={button?{width:"68%",float:"left"}:{}} ref="textArea" placeholder={placeholder} onChange={this.changeHandler}
              disabled={disabled} rows={rows} value={inputValue} readOnly={readOnly}></textarea>
              {button?<div onClick={this.clickBtn} className={styles.rightBtn}  >{button}</div>:null}
          </div>
          {countMax?(
            <span className={[`count`]}>
                  <span>{inputValue.length}</span>
                  ／{countMax}
            </span>
          ):null}

      </div>
    );
  }
}

module.exports = Textarea;
