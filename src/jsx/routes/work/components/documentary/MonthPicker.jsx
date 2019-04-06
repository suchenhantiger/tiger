
import styles from './css/static.less';
import { PickerView } from 'antd-mobile';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
class MonthPicker extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.currMonth = props.currMonth;

    }

    
    refreshMonth=()=>{
        console.log(this.currMonth );
        var {onChange} =this.props;
        onChange && onChange(this.currMonth);

    }

    changemonth=(value)=>{
        console.log(value);
        this.currMonth = value[0];
       

    }

    //渲染函数
    render() {
        var {data,currMonth} =this.props;


        return (
            
              <FullScreenView mask={true}>
                    <div className={styles.monthPicker} >
                        <PickerView ref="picker" data={data} value={[currMonth]} onChange={this.changemonth} cascade={false} />
                        <div className={styles.monthbtn} onClick={this.refreshMonth} >确定</div>
                    </div>
                </FullScreenView>
        );
    }

}

module.exports = MonthPicker;
