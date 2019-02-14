import styles from './css/disclaimer.less';

class Disclaimer extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            index:0
        }
    }

    //渲染函数
    render(){

        var {index} = this.state,
            {onClose} = this.props;

        return(
            <div className={styles.bottom_pop}>

            </div>
        );
    }

}

module.exports = Disclaimer;
