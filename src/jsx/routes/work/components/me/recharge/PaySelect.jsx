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
        this.props.getAccounts(this, this.update)
    }

    
    update = (data) => {

        this.setState({accountList:data});
    }

    itemClick = (index) => () => {
        var { onSelect } = this.props;
        onSelect && onSelect(index);
    }

    renderItems( payType) {
        var {accountList} =this.state;
        return accountList.map(item => {
            var {  payName,
                 payCode,
                 remarks,
                 amountLimit,
                 workDayLimit,
                 hoursLimit} = item;
            return (
                <li className={payType == id ? styles.on : ""} onClick={this.itemClick(id)}>
                    <p className={this.mergeClassName("font30", "mg-tb-20")}><span>{payName}</span></p>
                    {remarks?<p className={"c9"}>{remarks}</p>:null}
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
