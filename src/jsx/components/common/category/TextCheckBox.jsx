
import CheckBox from '../form/CheckBox';
import styles from './css/textcheckbox.css';

class TextCheckBox extends PureComponent{

  //构造函数
  constructor(props) {
      super(props);
  }


  renderItem(){
    var {text,ischeck,isdisable,checkclass,onChange}=this.props;


    return(
      <div className={styles.infoitem}>
             <span className={styles.text}>{text}</span>
              <CheckBox checked={ischeck} disabled={isdisable} checkclass={checkclass} align="right" onChange={onChange} text=""/>
      </div>
    )
  }



  //渲染函数
  render(){
    systemApi.log("TextCheckBox renders");


    return (
      <li className={styles.infoli}>
          {this.renderItem()}
      </li>
    );
  }

}

module.exports = TextCheckBox;
