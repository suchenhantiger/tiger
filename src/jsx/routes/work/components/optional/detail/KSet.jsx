
import styles from './css/K_chart.less';
class KSet extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }


    itemClick = (index)=>()=>{
        let {setChart1,setChart2} = this.props;
        switch(index){
            case 0:
                setChart1 && setChart1(0);
                break;
            case 1:
                setChart1 && setChart1(1);
                break;
            case 2 :
                setChart2 && setChart2(0);
                break;
            case 3:
                setChart2 && setChart2(1);
                break;
            case 4 :
                setChart2 && setChart2(2);
                break;

        }

    }




    //渲染函数
    render(){
        systemApi.log("k_set render");

        var {index1,
            index2} = this.props;

        return(

                <div className={styles.chart_rt} >
                    <div className={styles.icon_reset}></div>
                    <ul>
                        <li className={index1==0?styles.on:null} onClick={this.itemClick(0)} >MA</li>
                        <li className={index1==1?styles.on:null} onClick={this.itemClick(1)} >BOLL</li>
                        <li className={index2==0?styles.on:null} onClick={this.itemClick(2)}>MACD</li>
                        <li className={index2==1?styles.on:null} onClick={this.itemClick(3)} >RSI</li>
                        <li className={index2==2?styles.on:null} onClick={this.itemClick(4)} >KDJ</li>
                    </ul>
                    <div className={styles.btn_quick}>快速<br></br>下单</div>
                </div> 

        );
    }

}


module.exports = KSet;
