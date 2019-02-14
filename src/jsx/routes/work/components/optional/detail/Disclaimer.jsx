import Alert from '../../../../../components/common/popup/Alert';

import styles from './css/disclaimer.less';

class Disclaimer extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render(){

        var {onClose, onSure} = this.props;

        return(
            <Alert title="免责申明" onClose={onClose} onSure={onSure} text="好的，我知道了">
                <table className={styles.table}>
                    <tr><td>参考点位均由第三方提供商***提供。***不对此信息的准确性负责。</td></tr>
                    <tr><td>参考点位的任何展现方式都不是***提供的推荐和建议。***提供交易服务完全以非建议（仅执行）为基础，并且所有的订单和交易决定都由用户自行负责。</td></tr>
                    <tr><td>所有参考点用户均可自信修改。</td></tr>
                </table>
            </Alert>
        );
    }

}

module.exports = Disclaimer;
