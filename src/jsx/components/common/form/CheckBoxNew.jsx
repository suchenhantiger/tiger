 /*引入css页面*/
import styles from './css/checkboxnew.css'

/*引入函数*/


/*引入组件*/


class CheckBoxNew extends PureComponent{
    /*
    <CheckBoxNew

      checked=    是否被选中     Boolean
      disable=    是否可选       Boolean
      circle=     是否是圆形框   Boolean
      onChange=    点击触发的回调函数   Function
    />
    */
    static defaultProps={

    }

    constructor(props,context) {
        super(props,context);
        this.state = {
          test:"",
          // checkState:this.props.defaultChecked,
        }
        this.defaultProps={

        }
    }


    componentWillMount(){

      console.log("這個時候进入componentWillMount...");
    }
    componentDidMount(){
      // var {defaultChecked} = this.props;
      // this.setState({checkState:defaultChecked});
        // super.componentDidMount();
        this.setState({test:"111"});
      console.log("這個時候进入componentDidMount...");
    }

    componentWillUnmount(){
console.log("這個時候进入componentWillUnmount...");
        super.componentWillUnmount();

    }
    componentWillReceiveProps(nextProps){
      // var {defaultChecked,checked} = nextProps;
      // var {checkState} =this.state;
      // if(checkState!=defaultChecked){
      //   this.setState({checkState:defaultChecked});
      // }
      // else{
      //   this.setState({checkState:checked});
      // }
      // console.log("当前的状态是..."+checked);
      console.log("這個時候进入componentWillReceiveProps...");
    }
    componentWillUpdate(){
      console.log("這個時候进入componentWillUpdate...");
    }
    componentDidUpdate(){
      console.log("這個時候进入componentDidUpdate...");
    }
    itemClick=()=>{
      var {disable,onChange} = this.props;
      if (!disable) {
        onChange();
      }
    }

    render(){
        systemApi.log("CheckBoxNew render");
        console.log("這個時候进入render...");
        var {defaultChecked,checked,disable,circle,onChange, inline} = this.props;
        // var {checkState} = this.state;
        // console.log("初始的状态是..."+checkState)
        var checkClass = this.mergeClassName(styles.box,circle?styles.circle:"",disable?styles.disable:"",checked?styles.checked:"", inline?styles.inline:"");



        return (

            <div className={checkClass} onClick={this.itemClick}>

            </div>

        );
    }

}

module.exports = CheckBoxNew;
