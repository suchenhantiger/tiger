
import styles from './css/K_chart.less';
class KSet extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state={
            index1:0,
            index2:0
        };
    }


    itemClick = ()=>{
    }




    //渲染函数
    render(){
        systemApi.log("k_set render");

        var {index1,
            index2} = this.state;

        return(

                <div className={styles.chart_rt} >
                    <div className={styles.icon_reset}></div>
                    <ul>
                        <li>MA</li>
                        <li>BOLL</li>
                        <li>MACD</li>
                        <li>PSI</li>
                        <li>KDJ</li>
                    </ul>
                    <div className={styles.btn_quick}>快速<br></br>下单</div>
                </div> 

        );
    }

}


module.exports = KSet;
