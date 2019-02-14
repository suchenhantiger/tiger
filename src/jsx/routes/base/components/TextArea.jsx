import styles from './css/uiTemplate.css';

class TextArea extends PureComponent {
    //构造函数
    constructor(props) {
        super(props);
    }

    textChange = (e)=>{
        var {value} = e.target,
            {onChange} = this.props;

        onChange && onChange(value);
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("TextArea render");

        var {title, value, editable, placeholder, required} = this.props;

        return (
            <div>
                <div className={styles.inputBox}>
                    <span className={styles.title}>
                        {required?<span className={styles.required}>*</span>:null}
                        {title}
                    </span>
                </div>
                <div className={styles.textarea}>
                    {editable?(
                        <textarea className={styles.textAreaInput} placeholder={placeholder} value={value} onChange={this.textChange}/>
                    ):(
                        <span className={styles.value}>{value}</span>
                    )}
                </div>
            </div>
        );
    }

}

module.exports = TextArea;
