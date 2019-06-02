import Alert from '../../../../../components/common/popup/Alert';

import styles from './css/disclaimer.less';

class FlateDialog extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render(){

        var {onSure, onClose,data} = this.props;
        var {
            buySell, clientId,margin,
            commission,hangType,marketPrice="--",
            marketTime,mt4Id,openPrice="--",
            openTime,orderId,prodSize,
            prodCode,prodName,profitPrice,stopPrice,
            swaps,ticket,tradeNo,followerId="--",tradedQty
        } = data;

        return(
            <Alert title="平仓申请已提交" onClose={onClose} onSure={onSure} text="返回持仓列表">
                <table className={this.mergeClassName(styles.table, styles.nowrap)}>
                    <tr>
                        <td className="c6">交易品种</td>
                        <td className="text-al-right">{prodName}({prodCode})</td>
                    </tr>
                    <tr>
                        <td className="c6">平仓方向</td>
                        <td className="text-al-right">{buySell==0?"买入":"卖出"}</td>
                    </tr>
                    {/* <tr>
                        <td className="c6">开仓价格</td>
                        <td className="text-al-right">1.13280</td>
                    </tr>  */}
                    <tr>
                        <td className="c6">交易手数</td>
                        <td className="text-al-right">{tradedQty}</td>
                    </tr>
                </table>
            </Alert>
        );
    }

}

module.exports = FlateDialog;
