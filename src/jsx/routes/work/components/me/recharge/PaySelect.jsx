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
                <li className={payType == paycode ? styles.on : ""} onClick={this.itemClick(paycode,payname)}>
                    <p className={this.mergeClassName("font30", "mg-tb-20")}><span>{payname}</span></p>
                    {remarks?<p className={"c9"}>{remarks}</p>:null}
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
