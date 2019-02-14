
import {EVENT_SEARCHBAR_BLUR} from '../../../store/actions';

import styles from './css/searchBar.css';

class SearchBar extends PureComponent{

    static defaultProps = {
        placeholder:"",
        value:"",
        onClick:function(){}
    };

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    componentDidMount(){
        var {autoFocus} = this.props,
            {input} = this.refs;
        if(autoFocus){
            $(input).focus();
        }
        Event.register(EVENT_SEARCHBAR_BLUR, this.inputBlur);
    }

    componentWillUnmount(){
        Event.unregister(EVENT_SEARCHBAR_BLUR, this.inputBlur);
        super.componentWillUnmount();
    }

    toSearch = ()=>{
        var {onSearch,value} = this.props;

        if(onSearch){
            onSearch(value);
        }
    }

    searchClick = ()=>{
        var {onClick} = this.props;
        if(onClick){
            onClick();
        }
    }

    inputFocus = ()=>{
        var {onFocus} = this.props;
        if(onFocus){
            onFocus();
        }
    }

    inputChange = (e)=>{

        var {value} = e.target,
            {onChange} = this.props;
        if(onChange){
            onChange(value);
        }
    }
    inputBlur=()=>{
      var {input} = this.refs;
      $(input).blur();
    }
    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("SearchBar render");

        var {placeholder,value,bgtheme, autoFocus} = this.props;

        var innerboxCls=this.mergeClassName(styles.searchinnerbox,bgtheme?styles[bgtheme]:"");
        return(
            <div className={styles.searchbox02}>
            	<div className={innerboxCls} onClick={this.searchClick}>
                	  <input type="text" value={value} placeholder={placeholder} onChange={this.inputChange} onFocus={this.inputFocus} ref="input"/>
                    <input type="button" onClick={this.toSearch}/>
                </div>
            </div>
        );
    }


}

module.exports = SearchBar;
