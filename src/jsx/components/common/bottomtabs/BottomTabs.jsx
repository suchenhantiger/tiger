import styles from './css/bottomTabs.css';

/***************底部导航栏******************/
class BottomTabs extends PureComponent{

    static defaultProps = {
        theme:"white"
    }

    //构造函数
    constructor(props) {
        super(props);
    }

    //获取子元素
    getChildren() {
        var children = [];
        React.Children.forEach(this.props.children, (child) => {
          if (React.isValidElement(child)) {
            children.push(child);
          }
        });
        return children;
    }

    //获取宽度百分比
    getWidth(length){
        return Math.floor(100/length)+"%";
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("BottomTabs render");

        var children = this.getChildren(),
            length = children.length,
            {basetheme} = this.props,
            itemStyle = {
                width:this.getWidth(length)
            };

        children = children.map((item,index)=>{
            return React.cloneElement(item,{
                key:index,
                style:itemStyle,
                theme:basetheme
            });
        })

        return(
            <div className={this.mergeClassName(styles.footer, styles[basetheme])}>
                {children}
            </div>
        );
    }


}

module.exports = BottomTabs;
