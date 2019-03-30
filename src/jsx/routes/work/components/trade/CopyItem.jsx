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

    //渲染函数
    render(){

        var {data,type=2} = this.props;
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
           avatarUrl = "./images/me/img03.png";



        return(
            <li className={styles.item} onClick={this.itemClick}>
                <div className={styles.left}>
                    <div className={styles.gs_pic}><img src={avatarUrl} alt="" /></div>
                    <p className={styles.gs_name}>{followNmae}</p>
                </div>
                <div className={styles.right}>
                    <div className={styles.mg_tp_10} style={{float:"right"}}>
                        <p className={styles.valueStyR +" " +(totalPL>=0?styles.red:styles.green)}>${totalPL}</p>
                        <p className={styles.keyStyR}>{type==2?"收益":"浮动盈亏"}</p>
                    </div>

                    
                </div>
            </li>
        );
    }

}

module.exports = CopyItem;