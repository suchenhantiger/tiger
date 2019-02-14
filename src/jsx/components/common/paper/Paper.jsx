
import styles from './css/paper.css';

class Paper extends PureComponent{

    static defaultProps = {
        show:true
    }

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("Paper render");

        var {show,children,key,...other} = this.props,
            divCls = show?"":styles.hidden;

        var children = this.getChildren().map((item,index)=>{
            var attr = Object.assign(other,{
                key:index
            });
            return React.cloneElement(item,attr);
        });

        return(
            <div className={divCls}>
                {children}
            </div>
        );
    }


}

module.exports = Paper;
