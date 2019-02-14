import styles from './css/subTab.css';

class SubTabs extends PureComponent{

    static defaultProps = {
        index:0,
        theme:"white"
    };

    //构造函数
    constructor(props) {
        super(props);
        //默认状态
        this.state = {
            index:0
        }
    }

    componentWillMount(){
        this.setState({
            index:this.props.index
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            index:nextProps.index
        });
    }

    tabClick(index){
        if(this.state.index != index){
            var {onTabChange} = this.props;
            this.setState({index});

            if(onTabChange){
                onTabChange(index);
            }
        }
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("SubTabs render");
      //  var basetheme=systemApi.getValue(systemApi.getKey().BASETHEME);
        var {theme}=this.props;
        var length = this.getChildren().length,
            children = [];

        React.Children.forEach(this.props.children,(tab,index)=>{
            if(tab){
                children.push(React.cloneElement(tab,{
                    key:index,
                    theme:theme,
                    index:index,
                    total:length,
                    selected:this.state.index,
                    onClick:()=>{
                        var {onClick} = tab.props;
                        this.tabClick(index);
                        onClick && onClick();
                    }
                }));
            }
        });

        return(
            <div className={this.mergeClassName(styles.frame, styles[theme])}>
                {children}
            </div>
        );
    }


}

module.exports = SubTabs;
