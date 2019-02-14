import styles from './css/dataloadret.css';


class DataLoadRet extends PureComponent {
    //构造函数
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        var {rettype,infotxt,nodataTxt} = this.props;
        var info=infotxt;
        var nodataTxt=nodataTxt?nodataTxt:"暂无数据";
        if(infotxt=='' || typeof infotxt=='undefined'){
          info=(rettype=="timeout"?"网络不给力":(rettype=="error"?"请求异常":nodataTxt));
        }

        $(this.refs.infotxt).html(info)
      }
    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("DataLoadRet render");

        var {rettype,btntheme,btntxt,btnClick,hidebtn} = this.props;

        var picCls=styles.ret+" "+styles[rettype];
        var btnCls=styles.btn+" "+(btntheme?styles[btntheme]:styles.default);

        return (

          <div className={styles.box}>
            <div className={picCls}>
                <span></span>
                <p ref="infotxt"></p>
                {hidebtn=="1"?
                null:<a  className={btnCls} onClick={btnClick}>{btntxt?btntxt:'重新加载'}</a>
                }

              </div>
            </div>

        );
    }

}

module.exports = DataLoadRet;
