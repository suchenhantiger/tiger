
import styles from '../../../../../../css/components/work/attendance/myschedule/scheduleBarItem.css';

class ScheduleBarItem extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }
    componentWillMount(){

    }
    itemClick=()=>{
        var {date,chday,onClick} = this.props;
        if(onClick)
          onClick(date,chday);
    }
    //渲染函数
    render(){


        var {day,week,chday,status,isselect} = this.props;
        var basetheme=systemApi.getValue("theme_blue");
        var baritemCls= this.mergeClassName(styles.baritem,styles[basetheme],isselect=="1"?styles.on:"");
        var tipCls=this.mergeClassName(styles.program_tips,status=="1"?styles.show:"");
        var g_deviceMessage=systemApi.getDeviceMessage();
        var baritemWidth=g_deviceMessage.screenWidth/7;

        return(
            <li className={baritemCls} style={{"width":baritemWidth+"px"}} onClick={this.itemClick}>
                    <a>
                        <div  className={styles.program_dot}><span className={tipCls}></span></div>
                        <div className={styles.program_week}>{week}</div>
                        <div className={styles.program_day}>{day}</div>
                        <div className={styles.program_nl}>{chday}</div>
                    </a>

            </li>
        );
    }


}

module.exports = ScheduleBarItem;
