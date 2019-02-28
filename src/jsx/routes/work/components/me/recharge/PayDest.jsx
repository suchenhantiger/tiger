import FullScreenView from '../../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../../components/common/appheader/AppHeader';

import styles from './css/payDest.less';

/********我的主页*********/
class PayDest extends PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            destType: props.destType||"-1"
        }
    }

    destClick = (destType) => () => {
        this.setState({ destType });
    }

    submit = () => {
        var {destType} = this.state,
            {onSelect} = this.props;
        onSelect && onSelect(destType);
    }

    renderItems(destInfo, destType) {
        return destInfo.map(item => {
            var {id, text, desc} = item;
            return (
                <li className={destType == id ? styles.on : ""} onClick={this.destClick(id)}>
                    <p className={this.mergeClassName("font30", "mg-tb-20")}>
                        <span>{text}</span>&nbsp;
                        <span className={this.mergeClassName("c9", "font24")}>({desc})</span>
                    </p>
                    <p className={"c9"}>账户余额：$0.00</p>
                </li>
            )
        });
    }

    render() {
        systemApi.log("PayDest render");

        var {destType} = this.state,
            { onClose, destInfo } = this.props;

        return (
            <FullScreenView>
                <AppHeader headerName="充值到" onBackClick={onClose} />
                <Content>
                    <div className={this.mergeClassName(styles.radius_box, styles.on)}>
                        <div className={styles.radius_tit}><span>钱包</span></div>
                        <div>
                            <p className={this.mergeClassName("font36", "text-al-center", "mg-tb-20")}><span>$5000.00</span></p>
                            <p className={this.mergeClassName("c9", "text-al-center")}>钱包资金</p>
                        </div>
                    </div>
                    <div className={styles.radius_box}>
                        <div className={styles.radius_tit}><span>Trading account</span></div>
                        <div className={styles.account_cs}>
                            <ul>{this.renderItems(destInfo, destType)}</ul>
                        </div>
                    </div>
                    <div className={styles.bottom_btn_fixed}>
                        <div className={this.mergeClassName(styles.login_btn, "mg-lr-30")}>
                            <button onClick={this.submit}>确定</button>
                        </div>
                    </div>
                </Content>
                {this.props.children}
            </FullScreenView>
        );
    }

}


module.exports = PayDest;
