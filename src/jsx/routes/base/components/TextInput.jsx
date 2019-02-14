import styles from './css/uiTemplate.css';

class TextInput extends PureComponent {
    //构造函数
    constructor(props) {
        super(props);
    }

    inputChange = (e)=>{
        var {value} = e.target,
            {onChange} = this.props;

        onChange && onChange(value);
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("TextInput render");

        var {title, value, editable, placeholder, required} = this.props;

        return (
            <div className={styles.inputBox}>
                <span className={styles.title}>
                    {required?<span className={styles.required}>*</span>:null}
                    {title}
                </span>
                <div className={styles.value}>
                    {editable?(
                        <input className={styles.textinput} value={value} onChange={this.inputChange} placeholder={placeholder}/>
                    ):(
                        <span>{value}</span>
                    )}
                </div>
            </div>
        );
    }

}

module.exports = TextInput;
