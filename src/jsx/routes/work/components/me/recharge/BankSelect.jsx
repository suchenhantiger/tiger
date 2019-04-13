import FullScreenView from '../../../../../components/common/fullscreen/FullScreenView';
import { connect } from 'react-redux';
import { getPaySelect } from '../../../actions/me/meAction';
import styles from './css/paySelect.less';

class BankSelect extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
    }

    componentDidMount() {
      //  this.props.getPaySelect(this, this.update)
    }

    

    itemClick = (bankid,cardno,bankname) => () => {
        var { onSelect } = this.props;
        onSelect && onSelect(bankid,cardno,bankname);
    }

    renderItems( bankId) {
        var {bankList} =this.props;
        return bankList.map(item => {
            var {  
                bankbranch,
                bankcountry,
                bankid,
                bankname,
                banktype,
                cardactive,
                cardholder,
                cardno,
                city,
                clientid,
                createdate,
                id,
                phone,
                province,
            } = item;
            return (
                <li className={this.mergeClassName(styles.item, styles.short)} onClick={this.itemClick(bankid,cardno,bankname)}>
                    <span className={this.mergeClassName(styles.dot, bankId == bankid ? styles.on : "")}></span>
                    <div className={styles.pays}>
                        <div className={styles.payType}>{cardno}</div>
                        {bankname?<div className={styles.remarks}>{bankname}</div>:null}
                    </div>
                </li>
            )
        })
    }

    //渲染函数
    render() {

        var { onClose, bankId } = this.props;

        return (
            <FullScreenView mask={true}>
                <div className={styles.bottom_pop}>
                    <div className={styles.pop_tit}>
                        <span className={"font36"}>选择银行卡</span>
                        <span className={this.mergeClassName("right", "blue")} onClick={onClose}>取消</span>
                    </div>
                    <div className={this.mergeClassName(styles.account_cs, "mg-lr-30")}>
                        <ul>{this.renderItems( bankId)}</ul>
                    </div>
                </div>
            </FullScreenView>
        );
    }

}
function injectAction() {
    return { getPaySelect };
}

module.exports = connect(null, injectAction())(BankSelect);
