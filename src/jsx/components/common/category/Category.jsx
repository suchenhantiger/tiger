import LazyLoad from '../subtabs/LazyLoad';
import IconTab from './IconTab';
import TextTab from './TextTab';
import IconButton from './IconButton';

import styles from './css/category.css';

class Category extends PureComponent{

    static defaultProps = {
        iconElement:null,       //右侧图标栏
        title:"",               //标题
        subtitle:"",
        showToggle:false,        //是否需要收起按钮
        iconLeft:"stick",        //左侧图标class，默认使用竖条
        borderColor:"gray"
    }

    //构造函数
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.setState({
            index:0,
            show:true
        });
    }

    //点击打开收起按钮
    toggleClick = ()=>{
        this.setState({
            show:!this.state.show
        })
    }

    //切换tab点击
    tabClickFn = (index)=>{
        this.setState({
            index:index,
            show:true
        });
    }

    //计算显示哪个content
    calIndex(index,show){
        if(show){
            return index;
        }
        return -1;
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("Category render");

        var i = 0,
            {index,show} = this.state,
            {title,iconElement,showToggle,iconLeft,borderColor,subtitle} = this.props,
            curIndex = this.calIndex(index,show),
            toggleBtn = showToggle?(
                    <IconButton iconClass={show?"open":"close"} onClick={this.toggleClick}/>
                ):null;

        //给IconTab加上角标和当前选中角标
        var iconList = React.Children.map(iconElement,(child)=>{
            if(child.type === IconTab || child.type == TextTab){
                return React.cloneElement(child,{
                    index:i++,
                    selected:curIndex,
                    onClick:this.tabClickFn
                });
            }
            return child;
        });

        return(
            <div className={styles.frame}>
                <div className={this.mergeClassName(styles.title, styles[borderColor])}>
                    <span className={styles.leftbox}>
                        <i className={this.mergeClassName(styles.leftIcon, styles[iconLeft])}></i>
                        <span className={styles.text}>{title}</span>
                        {subtitle?(<span>{subtitle}</span>):null}
                    </span>
                    <div className={styles.iconArea}>
                        {iconList}
                        {toggleBtn}
                    </div>
                </div>
                <LazyLoad index={curIndex}>
                    {this.props.children}
                </LazyLoad>
            </div>

        );
    }


}

module.exports = Category;
