import { connect } from 'react-redux';
import { getAccounts } from '../../actions/me/meAction';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import styles from './css/accountSelect.less';

const ACCOUNT_MAP = {
    "0":"体验账户",
    "1":"自主交易",
    "2":"跟单账户"
}
const ACCOUNT_MAP2 = {
    "0":"体验金账号",
    "1":"交易账号",
    "2":"跟单账号"
}
class AccountSelect extends PureComponent {

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
        var {mt4Accs} =data;
        this.setState({accountList:mt4Accs});
    }

    itemClick = (mt4AccType, mt4Id,mt4NickName) => () => {
        var {onSelect} = this.props;
        onSelect && onSelect(mt4AccType, mt4Id,mt4NickName)
    }

    renderAccounts() {
        var { index, accountList } = this.state;
        var curMt4Id = systemApi.getValue("mt4Id");

        return accountList.map((item, i) => {
            var {mt4AccType, mt4Id,mt4NickName} = item;
            return (
                <div className={this.mergeClassName(styles.radius_box, curMt4Id==mt4Id?styles.on:"")} onClick={this.itemClick(mt4AccType, mt4Id,mt4NickName)}>
                    <ul>
                        <li>
                            <p className={"mg-bt-10"}>
                                <span className={"font30"}>{mt4NickName?mt4NickName:ACCOUNT_MAP2[mt4AccType]}</span>
                                <span className={"c9"}>（{ACCOUNT_MAP[mt4AccType]}）</span>
                            </p>
                            {/* <p className={this.mergeClassName("mg-tp-20", "c9")}>账号尚未激活，请及时充值</p> */}
                        </li>
                    </ul>
                </div>
            )
        })
    }

    newAccount = () => {

    }

    //渲染函数
    render() {

        var { onClose } = this.props,
            { accountList } = this.state;

        return (
            <FullScreenView mask={true}>
                <div className={styles.bottom_pop}>
                    <div className={styles.pop_tit}>
                        <span className={"font36"}>切换账号</span>
                        <span className={this.mergeClassName("right", "blue")} onClick={onClose}>取消</span>
                    </div>
                    <div className={styles.accounts}>
                        {this.renderAccounts(accountList)}
                    </div>
                    {/* <div className={styles.copy_btn}><button onClick={this.newAccount}>新建账号</button></div> */}
                </div>
            </FullScreenView>
        );
    }

}

function injectAction() {
    return { getAccounts };
}

module.exports = connect(null, injectAction())(AccountSelect);
