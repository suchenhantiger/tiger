import styles from './css/cursorTable.less';

class CursorCachedTable extends CursorTable{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    getCachedData(props, requestServer, cb){
        return null;
    }

    componentDidMount(){
        this._loading = true;
        this.showLoading();
        this.getCachedData(this.props,()=>{
            super.componentDidMount();
        },this.reloadCallBack);
    }

    componentWillReceiveProps(nextProps){
        this._loading = true;
        this.setState({preLoad:true});
        this.showLoading();
        this.getCachedData(nextProps,()=>{
            super.componentWillReceiveProps(nextProps);
        },this.reloadCallBack);
    }

}

module.exports = CursorCachedTable;
