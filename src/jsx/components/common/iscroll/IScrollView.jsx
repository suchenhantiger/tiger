import IScroll from '../../../lib/iscroll';

import styles from './css/iScrollView.less';

class IScrollView extends PureComponent{

    //默认属性值
    static defaultProps={
        upFreshText:"下拉刷新",
        upWaitingText:"松手更新",
        upLoadingText:"",
        downFreshText:"上拉加载更多",
        downWaitingText:"松手加载更多",
        downLoadingText:"",
        canUpFresh:false,
        canDownFresh:false,
        isShowLoading:true,
        probeType:2
    };

    constructor(props,context){
        super(props,context);
        //默认状态值
        this.state={
            showUp:false,
            showLoading:false,
            showDown:false,
            showDownText:false,
            showStatus:false,
            statusText:"",
            hasMore:true
        };
    }

    componentWillReceiveProps(nextProps){
        this.force = true;
    }

    //判断是否有状态变化，如果没有不重绘
    shouldComponentUpdate(nextProps, nextState){
        if(this.force){
            this.force = false;
            return true;
        }
        else{
            return super.shouldComponentUpdate(nextProps,nextState);
        }

    }

    //阻止默认行为
    preDft = (e)=>{
        e.preventDefault();
    }

    componentDidMount(){
        var that = this,
            {main} = this.refs,
            {probeType} = this.props;

        //修复Android机子滚送问题
        main.addEventListener('touchmove', this.preDft, false);

        this.triggerFresh = 50;
        this.triggerDownFresh = 50;

        this.wrapper = new  IScroll(this.refs.main,{
            useTransition: false, /* 此属性不知用意，本人从true改为false */
			probeType: probeType,
            scrollbars:true,
            click:true,
            tap:"clickModel",
            fadeScrollbars: true//滚动条渐隐
        });

        this.wrapper.on("scroll",function(){

            var {onScroll} = that.props,
                {frame,main} = that.refs,
                {showLoading} = that.state;

            if(!frame || !main || showLoading) return;

            var clientHeight = frame.clientHeight,
                mainHeight = main.clientHeight,
                {canUpFresh,canDownFresh} = that.props;

            if(this.y > that.triggerFresh){
                that.setState({
                    showUp:true && canUpFresh,
                    showDown:false,
                    showDownText:false
                });
            }
            else if(this.y < 0){
                var state = {
                    showUp:false,
                    showDownText:false,
                    showDown:false
                }
                if(this.y < (mainHeight - clientHeight)){
                    state.showDownText = true && canDownFresh;
                }
                if(this.y < (mainHeight - clientHeight - that.triggerDownFresh)){
                    state.showDown = true && canDownFresh;
                }
                that.setState(state);
            }
            else{
                that.setState({
                    showUp:false,
                    showDown:false,
                    showDownText:false
                });
            }
            onScroll && onScroll(this.x, this.y);
        });

        this.wrapper.on("scrollCancel", function(){
            var {onScrollCancel} = that.props;
            onScrollCancel && onScrollCancel();
        });

        this.wrapper.on("scrollEnd",function(){
            var {onScrollEnd} = that.props,
                {frame,main} = that.refs,
                {showLoading} = that.state;

            if(!frame || !main || showLoading) return;

            if(that.state.showUp){
                if(that.props.upFresh){
                  that.props.upFresh();
                }
                else{
                    that.hideLoading();
                }

            }
            else if(that.state.showDown && that.state.hasMore){
                if(that.props.downFresh){
                    that.props.downFresh();
                }
                else{
                    that.hideLoading();
                }
            }
            else{
              that.setState({
                showUp:false,
                showLoading:false,
                showDown:false,
                showDownText:false
              });
            }
            onScrollEnd && onScrollEnd(this.x, this.y);
        });

    }

    componentWillUnmount(){
        var {main} = this.refs;
        main.removeEventListener('touchmove', this.preDft);
        if(this.wrapper){
            this.wrapper.destroy();
        }
    }

    //显示加载按钮
    showLoading(){
        this.setState({
            showLoading:true
        });
    }

    //隐藏加载回调
    hideLoading(){
      this.setState({
        showUp:false,
        showLoading:false,
        showDown:false,
        showDownText:false
      });
    }

    //显示状态文本
    showStatus(text){
        this.setState({
            showStatus:true,
            statusText:text
        });
        setTimeout(()=>{
            this.setState({
                showStatus:false
            })
        },1000);
    }

    //没有更多数据
    setHasMore(hasMore){
        this.setState({hasMore});
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

    refresh = ()=>{
        this.wrapper.refresh();
    }

    refreshAndtoTop = ()=>{
        this.wrapper.refresh();
        this.wrapper.scrollTo(0,0);
    }

    //过去对应样式
    getClassName(clsName){
        if(this.state[clsName]){
            return styles[clsName];
        }
        return "";
    }

    //获取参数列表对应的className集合
    getClassNames(){
        var args = Array.prototype.slice.call(arguments, 0),
            list = [];
        for(var i=0;i<args.length;i++){
            list.push(this.getClassName(args[i]));
        }
        return list.join(" ");
    }


    render(){
        systemApi.log("IScroll render");

        var {upLoadingText, upWaitingText, upFreshText, downLoadingText, downWaitingText, downFreshText, className, canUpFresh, isShowLoading} = this.props,
            {showUp,showDown,showLoading,showStatus,statusText,hasMore} = this.state,
            upClass = this.mergeClassName(styles.up, this.getClassNames("showLoading","showUp")),
            upImgClass = this.mergeClassName(styles.upImg, this.getClassNames("showLoading","showUp")),
            downClass = this.mergeClassName(styles.down, this.getClassNames("showDownText","showDown","showLoading")),
            downImgClass = this.mergeClassName(styles.downImg, this.getClassNames("showDown","showLoading")),
            upText = showUp?(showLoading?upLoadingText:upWaitingText):(showLoading?"":upFreshText),
            downText = showDown?(showLoading?downLoadingText:downWaitingText):(showLoading?"":downFreshText);

        var children = this.getChildren().map((item,index)=>{
            if(typeof item.type == "function"){
                return React.cloneElement(item,{
                    key:index,
                    refresh:this.refresh,
                    refreshAndtoTop:this.refreshAndtoTop
                });
            }
            else{
                return React.cloneElement(item,{
                    key:index
                });
            }

        });

        return (
            <div ref="main" className={this.mergeClassName(className, styles.frame)}>
                <div className={styles.div} ref="frame">
                    {canUpFresh?(
                        <div className={upClass}>
                            <span className={upImgClass}></span>
                            <span className={styles.vmid}>{upText}</span>
                        </div>
                    ):null}

                    <div className={this.mergeClassName(styles.statusBar, showStatus?styles.show:"")}>{statusText}</div>
                    {children}
                    {hasMore?(
                        <div className={downClass}>
                            <span className={downImgClass}></span>
                            <span className={styles.vmid}>{downText}</span>
                        </div>
                    ):null}

                </div>
                {isShowLoading && showLoading?(
                    <div className={styles.mask}>
                        <div className={styles.loading}></div>
                    </div>
                ):null}
            </div>
        )
    }

}

module.exports = IScrollView;
