
class LazyLoad extends PureComponent{

    //默认属性值
    static defaultProps = {
        index:0
    };

    //构造函数
    constructor(props) {
        super(props);
        this._children = [];
    }

    //UI更新后，对列表刷新
    componentDidUpdate(){
        var {onDidUpdate} = this.props;
        onDidUpdate && onDidUpdate();
    }

    wrapperChild(child){
        return(
            <Paper>
                {child}
            </Paper>
        )
    }

    resetChild=()=>{

    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("LazyLoad render");

        var {index,children,...other} = this.props,
            curChildren = this.getChildren(),
            length = curChildren.length;
        if(index>=length){
            index = length-1;
        }
        this._children[index] = this.wrapperChild(curChildren[index]);

        for(var i=0;i<length;i++){
            var item = this._children[i],
                show = i==index;
            if(item){
                var attr = Object.assign(other,{
                    key:i,
                    show:show
                })
                this._children[i] = React.cloneElement(item,attr);
            }
        }

        return(
            <div>
                {this._children}
            </div>
        );
    }


}

module.exports = LazyLoad;
