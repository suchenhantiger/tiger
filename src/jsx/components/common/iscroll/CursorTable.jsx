import BaseScroll from './BaseScroll';
import IScrollView from './IScrollView';

import styles from './css/cursorTable.less';

class CursorTable extends BaseScroll{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            data:[],
            preLoad:true,
            hasMore:true
        };
        this.firstNo = 1;
        this.nextIndex = 1;
        this._loading = false;      //判断当前是否已经在加载数据
    }

    componentDidMount(){
        this._loading = true;
        this.showLoading();
        this.setHasMore(true);
        this.setState({hasMore:true})
        this.getData(this.firstNo, false, this.reloadCallBack, this.props);
    }

    componentWillReceiveProps(nextProps){
        this._loading = true;
        this.setState({preLoad:true,hasMore:true});
        this.showLoading();
        this.setHasMore(true);
        this.getData(this.firstNo, false, this.reloadCallBack, nextProps)
    }

    //获取数据
    getData(index,isAppend,cb,props){
        cb();
    }

    //数据刷新函数
    refreshData(){
        if(this._loading) return;
        this._loading = true;
        this.showLoading();
        this.setState({preLoad:true,hasMore:true});
        this.setHasMore(true);
        this.getData(this.firstNo, false, this.reloadCallBack, this.props)
    }

    //重新加载数据回调
    reloadCallBack = (text, hasMore)=>{
        this._loading = false;
        hasMore = hasMore==undefined?true:hasMore;
        if(text){
            this.showStatus(text);
        }
        this.setHasMore(hasMore);
        this.hideLoading();
        this.setState({preLoad:false,hasMore});
    }

    //获取更多函数
    loadMore(){
        var {hasMore} = this.state;
        if(this._loading) return;
        if(!hasMore){
            this.hideLoading();
        }
        else{
            this._loading = true;
            this.getData(this.nextIndex,true,(text, hasMore)=>{
                this._loading = false;
                hasMore = hasMore==undefined?true:hasMore;
                this.setHasMore(hasMore);
                this.setState({hasMore});
                this.hideLoading();
            },this.props)
        }

    }

    renderList(){
        return null;
    }

    renderHeader(){
        return null;
    }

    getTablistStyle(){
        return styles.tableList;
    }

    //获取没有数据是的提示文本
    getEmptyTip(){
        return "暂无数据";
    }

    //没有更多数据提示
    renderNoMore(){
        return (
            <div className={styles.noMoreFrame}>
                <div className={styles.noMorePic}></div>
                <div className={styles.noMoreText}>已全部加载</div>
            </div>
        );
    }

    //渲染UI函数
    renderUI(){
        var {preLoad, hasMore} = this.state,
            list = this.renderList();
        return (
            <div>
                {!this.isNullArray(list) && !preLoad?(
                    <div className={styles.noData}>{this.getEmptyTip()}</div>
                ):([
                    <table width="100%" className={styles.table}>
                        <tbody>
                            {list}
                        </tbody>
                    </table>,
                    (!hasMore && !preLoad?this.renderNoMore():null)
                ])}
            </div>
        );
    }

    renderTableBefore(){
        return null;
    }

    renderFixedHeader(){
        return(
            <div className={styles.floatTitle}>
                {this.renderTableBefore()}
                <table className={styles.table}>
                    <tbody>
                        {this.renderHeader()}
                    </tbody>
                </table>
            </div>
        );
    }

    getIsShowLoading(){
        return true;
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("CursorTable render");
        return(
            <div className={this.getScrollStyle()}>
                {this.renderFixedHeader()}
                <IScrollView className={this.getTablistStyle()} isShowLoading={this.getIsShowLoading()} canUpFresh={true} upFresh={this.refreshDataFn} canDownFresh={true} downFresh={this.loadMoreFn} ref="scroll">
                    {this.renderUI()}
                </IScrollView>
            </div>
        );
    }


}

module.exports = CursorTable;
