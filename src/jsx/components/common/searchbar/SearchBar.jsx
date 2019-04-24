import styles from './css/searchBar.css';

class SearchBar extends PureComponent {

    static defaultProps = {
        placeholder: "搜索"
    };

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            value:""
        }
    }

    inputChange = (e)=>{
        var {onSearch} = this.props;
        var {value} = e.target;
        this.setState({value});
        onSearch && onSearch(value);
    }

    keydown = (e)=>{
        var {value} = this.state,
            {onSearch} = this.props,
            {keyCode} = e;
        if(keyCode==13){
            onSearch && onSearch(value);
        }
    }

    clear = ()=>{
        var {onSearch} = this.props;
        this.setState({value:""});
        onSearch && onSearch("");
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("SearchBar render");

        var {placeholder} = this.props,
            {value} = this.state;

        return (
            <div className={styles.search_box}>
                <div className={styles.search_inner}>
                    <input placeholder={placeholder} value={value} onChange={this.inputChange} onKeyDown={this.keydown} />
                    {value!=""?<i className={styles.search_delete} onClick={this.clear}></i>:null}
                </div>
            </div>
        );
    }


}

module.exports = SearchBar;
