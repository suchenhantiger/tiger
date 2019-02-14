import styles from './css/appHeader.css';

class AppHeader extends PureComponent{

    static defaultProps = {
        headerName:"",
        showBack:true,
        isAbs:false,
        subTitle:"",
        theme:"blue",
        iconLeft:null,
        iconRight:null
    }

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    goBackClick = ()=>{
        //返回前一路由
        var {backHash, onBackClick} = this.props;
        if(backHash){
            hashHistory.push(backHash);
        }
        else if(onBackClick){
            onBackClick();
        }
        else{
            hashHistory.goBack();
        }
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("AppHeader render");

        var {showBack,headerName,subTitle,iconLeft,iconRight,animate, isAbs, theme} = this.props,
            headerCls = this.mergeClassName(styles.header, styles[theme], isAbs?styles.isabs:"", animate?styles.animate:""),
            arrowCls = this.mergeClassName(styles.head_arrow);

        return(
            <div className={headerCls}>
                <div className={styles.header_innerbox}>
                    <div className={styles.header_left_icon}>
                      {showBack?<a onClick={this.goBackClick} className={arrowCls}></a>:null}
                      {iconLeft}
                    </div>
                    <div className={styles.header_mid_cont}>
                        {subTitle!=""?(
                            <div className={this.mergeClassName(styles.searchbox01, styles.multi)}>
                                <span className={styles.center}>{headerName}</span>
                                <p className={styles.product_code}>{subTitle}</p>
                            </div>
                        ):(
                            <div className={styles.searchbox01}>
                                <span className={styles.center}>{headerName}</span>
                            </div>
                        )}
                    </div>
                    <div className={styles.header_right_icon}>
                        <div className={styles.pattern}>
                            {iconRight}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = AppHeader;
