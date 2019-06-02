import styles from './css/copyItem.less';

class CopyItem extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    itemClick = ()=>{
        var {data={},type=2} = this.props;

       var {avatarUrl,
       balance,
       followNmae,
       followerId,
       fowBalance,
       fowStatus,
       maxFowBalance,
       starLevel,
       suggestBalance,
       totalPL} = data;
       if(type==2){

       }else{
        hashHistory.push({
            pathname:"/work/trade/currcopydetail",
            query:{avatarUrl,
            balance,
            followNmae,
            followerId,
            fowBalance,
            fowStatus,
            maxFowBalance,
            starLevel,
            suggestBalance,
            totalPL}
        })

       }
   
        
    }

    //渲染函数
    render(){

        var {data,type=2,pl} = this.props;
        var {
            avatarUrl="",
            balance,
            followNmae,
            followerId,
            fowBalance,
            fowStatus,
            maxFowBalance,
            starLevel,
            suggestBalance,
            totalPL} = data;

           if(avatarUrl.length == 0)
           avatarUrl = "./images/documentary/gs_def.png";
        


        return(
            <li className={styles.item} onClick={this.itemClick}>
                <div className={styles.left}>
                    <div className={styles.gs_pic}><img src={avatarUrl} alt="" /></div>
                    <p className={styles.gs_name}>{followNmae}</p>
                </div>
                <div className={styles.right}>
                    <div  style={{float:"right"}}>
                        <p className={styles.valueStyR +" " +(((type==2 && totalPL>=0) || (type!=2 && pl>=0))?styles.red:styles.green)}>${type==2?totalPL:pl.toFixed(2)}</p>
                        <p className={"mg-tp-10 "+styles.keyStyR}>{type==2?"收益":"浮动盈亏"}</p>
                    </div>

                    
                </div>
            </li>
        );
    }

}

module.exports = CopyItem;
