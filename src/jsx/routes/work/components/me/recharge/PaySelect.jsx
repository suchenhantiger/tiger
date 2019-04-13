import FullScreenView from '../../../../../components/common/fullscreen/FullScreenView';
import { connect } from 'react-redux';
import { getPaySelect } from '../../../actions/me/meAction';
import styles from './css/paySelect.less';

class PaySelect extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);

        this.state = {
            accountList: []
        }
    }

    componentDidMount() {
        this.props.getPaySelect(this, this.update)
    }

    
    update = (data) => {
        console.log(data);
        this.setState({accountList:data});
    }

    itemClick = (index,payname) => () => {
        var { onSelect } = this.props;
        onSelect && onSelect(index,payname);
    }

    renderItems( payType) {
        var {accountList} =this.state;
        return accountList.map(item => {
            var {  payname,
                paycode,
                 remarks,
                 amountLimit,
                 workDayLimit,
                 hoursLimit} = item;
            return (
                <li className={styles.item} onClick={this.itemClick(paycode,payname)}>
                    <span className={this.mergeClassName(styles.dot, payType == paycode ? styles.on : "")}></span>
                    <div className={styles.pays}>
                        <div className={styles.payType}>{payname}</div>
                        {remarks?<div className={styles.remarks}>{remarks}</div>:null}
                    </div>
                </li>
            )
        })
    }

    //渲染函数
    render() {

        var { onClose, payType } = this.props;

        return (
            <FullScreenView mask={true}>
                <div className={styles.bottom_pop}>
                    <div className={styles.pop_tit}>
                        <span className={"font36"}>支付方式</span>
                        <span className={this.mergeClassName("right", "blue")} onClick={onClose}>取消</span>
                    </div>
                    <div className={this.mergeClassName(styles.account_cs, "mg-lr-30")}>
                        <ul>{this.renderItems( payType)}</ul>
                    </div>
                </div>
            </FullScreenView>
        );
    }

}
function injectAction() {
    return { getPaySelect };
}

module.exports = connect(null, injectAction())(PaySelect);
