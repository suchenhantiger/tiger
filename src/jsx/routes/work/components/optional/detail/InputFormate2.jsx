
import styles from './css/inputFormate2.less';

class InputFormate extends PureComponent{

    static defaultProps = {
        digit:2,
        minValue:0
    }

    //构造函数
    constructor(props) {
        super(props);
       
    }

    getValue=()=>{
        return this.state.value;
    }


    numChange = (e) => {
        var {valueChange,value:oldv} = this.props;
        var { value } = e.target;
        value = value.replace(/[^\d.]/g, "");

        if(value.indexOf('.')>-1 && value.lastIndexOf('.')!=value.indexOf('.')){
           // console.log("sch1 "+value);
           // this.setState({ value:this.state.value});
           valueChange && valueChange(oldv);
        }else{
          //  console.log("sch2 "+(+value).toFixed(this._volumeDigits));
            // this.setState({ value:value });
            valueChange && valueChange(value );
        }
            
    }

    numFormate =(e)=>{
        var {valueChange} = this.props;

        var {minValue,maxValue,digit} = this.props;
        var { value } = e.target;
        var tmpValue = (+value).toFixed(digit);
        if(minValue && value<minValue){
            tmpValue =minValue.toFixed(digit);
        }else if(value>maxValue){
            //this.setState({value:maxValue.toFixed(digit)});
            tmpValue = maxValue.toFixed(digit);
        }
        valueChange && valueChange(tmpValue );
     //   this.setState({ value:  });

    }

    

    //渲染函数
    render(){
        var {value} =this.props;

        return(
           
                
                
                    <input 
                    type="text"  
                    className={styles.input} 
                    placeholder="复制金额"
                    value={value} 
                    onChange={this.numChange} 
                    onBlur={this.numFormate } />
                
                
            
            
        );
    }

}


module.exports = InputFormate
