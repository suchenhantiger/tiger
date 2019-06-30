import styles from './css/copyItem.less';

class CopyItem extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    itemClick = ()=>{
      
        
    }

    //渲染函数
    render(){

        var {data,type=2,pl} = this.props;
        var {
            nickname ,clientAvatarUrl , balance ,totalPL} = data;

            if(clientAvatarUrl == null ||clientAvatarUrl.length==0) clientAvatarUrl= "./images/me/img03.png" ;
        


        return(
            <li className={styles.item} onClick={this.itemClick}>
                <div className={styles.left}>
                    <div className={styles.gs_pic}><img src={clientAvatarUrl} alt="" /></div>
                    <p className={styles.gs_name}>{nickname}</p>
                </div>
                <div className={styles.right}>
                    <div  style={{float:"right"}}>
                        <p className={styles.valueStyR +" " +(totalPL>=0?styles.red:styles.green)}>收益: ${totalPL}</p>
                        <p className={"c9 mg-tp-10"}>复制金额: ${balance}</p>
                    </div>

                </div>
            </li>
        );
    }

}

module.exports = CopyItem;
