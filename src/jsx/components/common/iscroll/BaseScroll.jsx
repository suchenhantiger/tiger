import IScrollView from './IScrollView';

class BaseScroll extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.loadMoreFn = this.loadMore.bind(this);
        this.refreshDataFn = this.refreshData.bind(this);
    }

    componentDidUpdate(){
        this.refresh();
    }

    isNullArray(array){
        for(var i=0;i<array.length;i++){
            if(array[i]) return true;
        }
        return false;
    }

    //数据刷新函数
    refreshData(){
        this.hideLoading();
    }

    //获取更多函数
    loadMore(){
        this.hideLoading();
    }

    //获取scroll实例
    getScroll(){
        return this.refs.scroll;
    }

    //根据高度重刷scroll
    refresh(){
        var scroll = this.getScroll();
        scroll && scroll.refresh();
    }

    //显示加载框
    showLoading(){
        var scroll = this.getScroll();
        scroll && scroll.showLoading();
    }

    //隐藏加载框
    hideLoading(){
        var scroll = this.getScroll();
        scroll && scroll.hideLoading();
    }

    //显示状态文本
    showStatus(text){
        var scroll = this.getScroll();
        scroll && scroll.showStatus(text);
    }

    //没有更多数据
    setHasMore(hasMore){
        var scroll = this.getScroll();
        scroll && scroll.setHasMore(hasMore);
    }

    //获取scroll样式，主要用于定位
    getScrollStyle(){
        return "";
    }

    //渲染UI函数
    renderUI(){
        return null;
    }

    getIsShowLoading(){
        return true;
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("BaseScroll render");

        return(
            <IScrollView className={this.getScrollStyle()} isShowLoading={this.getIsShowLoading()} canUpFresh={true} upFresh={this.refreshDataFn} canDownFresh={true} downFresh={this.loadMoreFn} ref="scroll">
                {this.renderUI()}
            </IScrollView>
        );
    }


}

module.exports = BaseScroll;
