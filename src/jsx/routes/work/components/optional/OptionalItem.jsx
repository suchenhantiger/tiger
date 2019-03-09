import styles from './css/optionalItem.less';

class OptionalItem extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    itemClick = ()=>{
       // hashHistory.push("/work/optional/detail");
        var {name,code,ask,bid,isClose}= this.props;
        hashHistory.push({
            pathname: "/work/optional/detail",
            query: {prodName:name,prodCode:code,ask,bid,isClose}
        });
    }

    //渲染函数
    render(){

        var {editable,name,code,ask,bid,isClose,type} = this.props;
        var ask1,ask2,ask3,bid1,bid2,bid3;
        if(ask==null|| bid ==null || ask.length==0|| bid.length==0){
            ask2 ="--";
            bid2 ="--"
        }else{
            ask +="";
            bid +="";
            if(type=="1" || type=="3"){
                ask1=ask.slice(0,-3);
                ask2=ask.slice(-3,-1);
                ask3=ask.slice(-1);
                bid1=bid.slice(0,-3);
                bid2=bid.slice(-3,-1);
                bid3=bid.slice(-1);
            }
            else if(type=="2" ||type=="4"){
                ask1=ask.slice(0,-2);
                ask2=ask.slice(-2);
                bid1=bid.slice(0,-2);
                bid2=bid.slice(-2);
            }
          
        }





        return(
            <li className={styles.item} onClick={this.itemClick}>
                <div className={styles.currency_name}>
                    <p className={this.mergeClassName("c3", styles.c3)}>{name}</p>
                    <p className={this.mergeClassName("c9", "font-arial")}>{code}</p>
                </div>
                <div className={styles.currency_price}>
                    {isClose?<i className={styles.mk_close}>闭市</i>:null}
                    <div className={this.mergeClassName(styles.price_box, styles.buy,isClose?styles.close:null, "font-arial")}>
                    {ask1?<span>{ask1}</span>:null}
                    {ask2?<span className={this.mergeClassName(styles.font50, styles.text)}>{ask2}</span>:null}
                    {ask3?<span className={"vertical-top"}>{ask3}</span>:null}
                    </div>
                    <div className={this.mergeClassName(styles.price_box,isClose?styles.close:null, styles.sell, "font-arial")}>
                    {bid1?<span>{bid1}</span>:null}
                        {bid2?<span className={this.mergeClassName(styles.font50, styles.text)}>{bid2}</span>:null}
                        {bid3? <span className={"vertical-top"}>1</span>:null}
                    </div>
                </div>
            </li>
        );
    }

}

module.exports = OptionalItem;
