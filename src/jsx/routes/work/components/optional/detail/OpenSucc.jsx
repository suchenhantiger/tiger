import Alert from '../../../../../components/common/popup/Alert';

import styles from './css/disclaimer.less';

class OpenSucc extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render(){

        var {onSure, onClose} = this.props;

        return(
            <Alert title="开仓成功" onClose={onClose} onSure={onSure} text="查看交易记录">
                <table className={this.mergeClassName(styles.table, styles.nowrap)}>
                    <tr>
                        <td className="c6">交易品种</td>
                        <td className="text-al-right">欧元美元(EURUSD200)</td>
                    </tr>
                    <tr>
                        <td className="c6">开仓方向</td>
                        <td className="text-al-right">买入</td>
                    </tr>
                    <tr>
                        <td className="c6">开仓价格</td>
                        <td className="text-al-right">1.13280</td>
                    </tr>
                    <tr>
                        <td className="c6">交易手数</td>
                        <td className="text-al-right">0.01</td>
                    </tr>
                    <tr>
                        <td className="c6">占用资金</td>
                        <td className="text-al-right">$5.00</td>
                    </tr>
                </table>
            </Alert>
        );
    }

}

module.exports = OpenSucc;
