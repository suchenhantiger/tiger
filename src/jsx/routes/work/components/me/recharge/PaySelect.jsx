import FullScreenView from '../../../../../components/common/fullscreen/FullScreenView';

import styles from './css/paySelect.less';

class PaySelect extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
    }

    itemClick = (index) => () => {
        var { onSelect } = this.props;
        onSelect && onSelect(index);
    }

    renderItems(payInfo, payType) {
        return payInfo.map(item => {
            var { id, text, desc } = item;
            return (
                <li className={payType == id ? styles.on : ""} onClick={this.itemClick(id)}>
                    <p className={this.mergeClassName("font30", "mg-tb-20")}><span>{text}</span></p>
                    {desc?<p className={"c9"}>电汇通常需要3-5哥工作日到账</p>:null}
                </li>
            )
        })
    }

    //渲染函数
    render() {

        var { onClose, payInfo, payType } = this.props;

        return (
            <FullScreenView mask={true}>
                <div className={styles.bottom_pop}>
                    <div className={styles.pop_tit}>
                        <span className={"font36"}>支付方式</span>
                        <span className={this.mergeClassName("right", "blue")} onClick={onClose}>取消</span>
                    </div>
                    <div className={this.mergeClassName(styles.account_cs, "mg-lr-30")}>
                        <ul>{this.renderItems(payInfo, payType)}</ul>
                    </div>
                </div>
            </FullScreenView>
        );
    }

}

module.exports = PaySelect;
