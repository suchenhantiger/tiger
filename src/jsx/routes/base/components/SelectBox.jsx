import Picker from '../../../components/common/popup/Picker';
import styles from './css/uiTemplate.css';

class SelectBox extends PureComponent {
    //构造函数
    constructor(props) {
        super(props);
    }

    pickChoose = (e)=>{
        var {value} = e,
            {onChange} = this.props;

        onChange && onChange(value);
    }

    getLabel(datas, curVal){
        for(var i=0;i<datas.length;i++){
            var {value, label} = datas[i];
            if(curVal == value){
                return label;
            }
        }
        return "";
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("SelectBox render");

        var {title, value, editable, required, datas, picktitle, placeholder} = this.props,
            label = this.getLabel(datas, value);

        return (
            <div className={styles.inputBox}>
                <span className={styles.title}>
                    {required?<span className={styles.required}>*</span>:null}
                    {title}
                </span>
                <div className={styles.value}>
                    {editable?(
                        <Picker title={picktitle} onPickerChoose={this.pickChoose} mode="single" colData={datas}>
                            <span className={styles.selectVal}>{label || placeholder || "请选择"}</span>
                        </Picker>
                    ):(
                        <span>{label}</span>
                    )}
                </div>
            </div>
        );
    }

}

module.exports = SelectBox;
