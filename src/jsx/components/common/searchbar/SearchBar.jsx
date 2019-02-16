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
        var {value} = e.target;
        this.setState({value});
    }

    keydown = (e)=>{
        var {value} = this.state,
            {onSearch} = this.props,
            {keyCode} = e;
        if(keyCode==13){
            onSearch && onSearch(value);
        }
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("SearchBar render");

        var { placeholder} = this.props;

        return (
            <div className={styles.search_box}>
                <div className={styles.search_inner}>
                    <input placeholder={placeholder} onChange={this.inputChange} onKeyDown={this.keydown} />
                    <i className={styles.search_delete}></i>
                </div>
            </div>
        );
    }


}

module.exports = SearchBar;
