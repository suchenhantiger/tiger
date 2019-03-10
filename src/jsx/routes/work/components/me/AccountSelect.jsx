import { connect } from 'react-redux';
import { getAccounts } from '../../actions/me/meAction';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import styles from './css/accountSelect.less';

class AccountSelect extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            index: -1,
            accountList: []
        }
    }

    componentDidMount() {
        this.props.getAccounts(this, this.update)
    }

    update = () => {

    }

    itemClick = (index) => () => {
        this.setState({ index });
    }

    renderAccounts() {
        var { index } = this.state;
        return [1, 1, 1, 1, 1].map((item, i) => {
            return (
                <div className={this.mergeClassName(styles.radius_box, index == i ? styles.on : "")} onClick={this.itemClick(i)}>
                    <ul>
                        <li>
                            <p className={"mg-bt-10"}>
                                <span className={"font30"}>交易账号</span>
                                <span className={"c9"}>（自主交易）</span>
                            </p>
                            <p className={this.mergeClassName("mg-tp-20", "c9")}>账号尚未激活，请及时充值</p>
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
                    <div className={styles.copy_btn}><button onClick={this.newAccount}>新建账号</button></div>
                </div>
            </FullScreenView>
        );
    }

}

function injectAction() {
    return { getAccounts };
}

module.exports = connect(null, injectAction())(AccountSelect);
