import styles from './css/slideTabs.css';

class SlideTabs extends PureComponent{

    static defaultProps = {
        index:0,
        theme:"white"
    };

    //构造函数
    constructor(props) {
        super(props);
        //默认状态
        this.state = {
            index:0,
            xc:0
        }
        this.subWidth = [];
        this.slideIndex = 0;
        this.animate = false;
    }

    componentWillMount(){
        this.setState({
            index:this.props.index
        });
        this.length = this.getChildren().length;
    }

    componentDidMount(){
        for(var i=0;i<this.length;i++){
            var ref = this.refs["sub"+i];
            this.subWidth.push(ref.getWidth()+10);
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            index:nextProps.index
        });
    }

    tabClick = (index)=>()=>{
        if(this.state.index != index){
            var {onTabChange} = this.props;
            this.setState({index});
            if(onTabChange){
                onTabChange(index);
            }
        }
    }

    getXPos(index){
        var slideX = 0;
        for(var i=0;i<index;i++){
            slideX -= this.subWidth[i];
        }
        return slideX;
    }

    increaseIndex = ()=>{
        var {slideIndex} = this;
        if(slideIndex >= this.length-4){
            this.slideIndex = this.length-4;
        }
        else{
            this.slideIndex++;
        }
        this.animate = true;
        this.setState({
            xc:this.getXPos(this.slideIndex)
        });
        setTimeout(()=>{
            this.animate = false;
        },200);
    }

    decreaseIndex = ()=>{
        var {slideIndex} = this;
        if(slideIndex <= 0){
            this.slideIndex = 0;
        }
        else{
            this.slideIndex--;
        }
        this.animate = true;
        this.setState({
            xc:this.getXPos(this.slideIndex)
        })
        setTimeout(()=>{
            this.animate = false;
        },200);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("SlideTabs render");

        var slideX = 0,
            children = [],
            {animate} = this,
            {theme} = this.props,
            {xc} = this.state,
            slideCls = this.mergeClassName(styles.slideBox, animate?styles.animate:""),
            slideStyle = {
                transform:"translateX("+xc+"px)"
            };

        React.Children.forEach(this.props.children,(tab,index)=>{
            children.push(React.cloneElement(tab,{
                key:index,
                theme:theme,
                index:index,
                selected:this.state.index,
                onClick:this.tabClick(index),
                ref:"sub"+index
            }));
        });

        return(
            <div className={styles.cs_tabs}>
            	<div className={styles.tab_left_arrow} onClick={this.decreaseIndex}></div>
                <div className={styles.tab_list}>
                    <div className={slideCls} style={slideStyle}>{children}</div>
                </div>
                <div className={styles.tab_right_arrow} onClick={this.increaseIndex}></div>
            </div>
        );
    }


}

module.exports = SlideTabs;
