import DatePicker from '../../../components/common/popup/DatePicker';

import styles from './css/uiTemplate.css';

class TextInput extends PureComponent {

    //默认属性值
    static defaultProps = {
        format:"yyyy-MM-dd HH:mm:ss"
    };

    //构造函数
    constructor(props) {
        super(props);
    }

    dateChange = (e)=>{
        var {onChange} = this.props;
        onChange && onChange(e);
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("TextInput render");

        var {title, value, editable, placeholder, required, format} = this.props;

        return (
            <div className={styles.inputBox}>
                <span className={styles.title}>
                    {required?<span className={styles.required}>*</span>:null}
                    {title}
                </span>
                <div className={styles.value}>
                    {editable?(
                        <DatePicker mode="date" onDatePick={this.dateChange}>
                            <span className={styles.selectVal}>{value || placeholder || "请选择"}</span>
                        </DatePicker>
                    ):(
                        <span>{value}</span>
                    )}
                </div>
            </div>
        );
    }

}

module.exports = TextInput;
