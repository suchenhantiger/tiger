
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
      let {searchForm} = this.refs;
      if (searchForm) {
        $(searchForm).bind('search', this.toSearch);
      }
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

    toSubmit=(e)=>{
      // e.stopPropagation();
      return false;
    }
    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("SearchBar render");

        var {placeholder,value,bgtheme} = this.props;

        var innerboxCls=this.mergeClassName(styles.searchinnerbox,bgtheme?styles[bgtheme]:"");
        return(
            <div className={styles.searchbox02}>
            	{/*<div className={innerboxCls} onClick={this.searchClick}>
                	  <input type="text" value={value} placeholder={placeholder} onChange={this.inputChange} onFocus={this.inputFocus}/>
                    <input type="button" onClick={this.toSearch}/>
                </div>*/}
                <form className={innerboxCls} onSubmit={this.toSubmit} ref="searchForm">
                  <input type="search" value={value} placeholder={placeholder} onChange={this.inputChange} onFocus={this.inputFocus}/>
                  <input type="button" onClick={this.toSearch}/>
                </form>
            </div>
        );
    }


}

module.exports = SearchBar;
