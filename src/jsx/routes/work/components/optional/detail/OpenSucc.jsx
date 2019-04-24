import Alert from '../../../../../components/common/popup/Alert';

import styles from './css/disclaimer.less';

class OpenSucc extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render(){

        var {onSure, onClose,data={}} = this.props;
        var {buySell=true,prodName="--",prodCode="--",tradePrice="--",totalQty=0,money="--"} = data;

        return(
            <Alert title="开仓成功" onClose={onClose} onSure={onSure} text="查看交易记录">
                <table className={this.mergeClassName(styles.table, styles.nowrap)}>
                    <tr>
                        <td className="c6">交易品种</td>
                        <td className="text-al-right">{prodName}({prodCode})</td>
                    </tr>
                    <tr>
                        <td className="c6">开仓方向</td>
                        <td className="text-al-right">{buySell==0?"买入":"卖出"}</td>
                    </tr>
                    <tr>
                        <td className="c6">开仓价格</td>
                        <td className="text-al-right">${tradePrice}</td>
                    </tr>
                    <tr>
                        <td className="c6">交易手数</td>
                        <td className="text-al-right">{totalQty}</td>
                    </tr>
                    {/* <tr>
                        <td className="c6">占用资金</td>
                        <td className="text-al-right">${money}</td>
                    </tr> */}
                </table>
            </Alert>
        );
    }

}

module.exports = OpenSucc;
