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

    static defaultProps = {
        selectType:0,
        showOn:true
    }
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
        var {selectType,showOn} = this.props;//1：交易与跟单，2:跟单，3:交易

        var { index, accountList } = this.state;
        var curMt4Id = systemApi.getValue("mt4Id");

        return accountList.map((item, i) => {
            var {mt4AccType, mt4Id,mt4NickName, floatPL, equity, ratioMargin} = item;
            if(selectType==0){
                return (
                    <div className={this.mergeClassName(styles.radius_box, showOn&&(curMt4Id==mt4Id)?styles.on:"")} onClick={this.itemClick(mt4AccType, mt4Id,mt4NickName)}>
                        <ul>
                            <li>
                                <div className={styles.accountName}>{mt4NickName?mt4NickName:ACCOUNT_MAP2[mt4AccType]}</div>
                                <div className={styles.accountType}>
                                    <div className={styles.text}>{ACCOUNT_MAP[mt4AccType]}</div>
                                </div>
                                <div className={styles.list}>
                                    <div className={styles.listItem}>
                                        <div className={styles.value}>${floatPL}</div>
                                        <div className={styles.text}>浮动盈余</div>
                                    </div>
                                    <div className={styles.listItem}>
                                        <div className={styles.value}>${equity}</div>
                                        <div className={styles.text}>净值</div>
                                    </div>
                                    <div className={styles.listItem}>
                                        <div className={styles.value}>{ratioMargin}%</div>
                                        <div className={styles.text}>保证金比例</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                )
            }else
            if(selectType==1 && mt4AccType>0){
                return (
                    <div className={this.mergeClassName(styles.radius_box, showOn&&(curMt4Id==mt4Id)?styles.on:"")} onClick={this.itemClick(mt4AccType, mt4Id,mt4NickName)}>
                        <ul>
                            {/* <li>
                                <p className={"mg-bt-10"}>
                                    <span className={"font30"}>{mt4NickName?mt4NickName:ACCOUNT_MAP2[mt4AccType]}</span>
                                    <span className={"c9"}>（{ACCOUNT_MAP[mt4AccType]}）</span>
                                </p>
                                <p className={this.mergeClassName("mg-tp-20", "c9")}>账号尚未激活，请及时充值</p>
                            </li> */}
                            <li>
                                <div className={styles.accountName}>{mt4NickName?mt4NickName:ACCOUNT_MAP2[mt4AccType]}</div>
                                <div className={styles.accountType}>
                                    <div className={styles.text}>{ACCOUNT_MAP[mt4AccType]}</div>
                                </div>
                                <div className={styles.list}>
                                    <div className={styles.listItem}>
                                        <div className={styles.value}>${floatPL}</div>
                                        <div className={styles.text}>浮动盈余</div>
                                    </div>
                                    <div className={styles.listItem}>
                                        <div className={styles.value}>${equity}</div>
                                        <div className={styles.text}>净值</div>
                                    </div>
                                    <div className={styles.listItem}>
                                        <div className={styles.value}>{ratioMargin}%</div>
                                        <div className={styles.text}>保证金比例</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                )
            }else
            if(selectType==2 && mt4AccType>1){
                return (
                    <div className={this.mergeClassName(styles.radius_box, showOn&&(curMt4Id==mt4Id)?styles.on:"")} onClick={this.itemClick(mt4AccType, mt4Id,mt4NickName)}>
                        <ul>
                            {/* <li>
                                <p className={"mg-bt-10"}>
                                    <span className={"font30"}>{mt4NickName?mt4NickName:ACCOUNT_MAP2[mt4AccType]}</span>
                                    <span className={"c9"}>（{ACCOUNT_MAP[mt4AccType]}）</span>
                                </p>
                                <p className={this.mergeClassName("mg-tp-20", "c9")}>账号尚未激活，请及时充值</p>
                            </li> */}
                            <li>
                                <div className={styles.accountName}>{mt4NickName?mt4NickName:ACCOUNT_MAP2[mt4AccType]}</div>
                                <div className={styles.accountType}>
                                    <div className={styles.text}>{ACCOUNT_MAP[mt4AccType]}</div>
                                </div>
                                <div className={styles.list}>
                                    <div className={styles.listItem}>
                                        <div className={styles.value}>${floatPL}</div>
                                        <div className={styles.text}>浮动盈余</div>
                                    </div>
                                    <div className={styles.listItem}>
                                        <div className={styles.value}>${equity}</div>
                                        <div className={styles.text}>净值</div>
                                    </div>
                                    <div className={styles.listItem}>
                                        <div className={styles.value}>{ratioMargin}%</div>
                                        <div className={styles.text}>保证金比例</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                )
            }else
            if(selectType==3 && mt4AccType==1){
                return (
                    <div className={this.mergeClassName(styles.radius_box, showOn&&(curMt4Id==mt4Id)?styles.on:"")} onClick={this.itemClick(mt4AccType, mt4Id,mt4NickName)}>
                        <ul>
                            {/* <li>
                                <p className={"mg-bt-10"}>
                                    <span className={"font30"}>{mt4NickName?mt4NickName:ACCOUNT_MAP2[mt4AccType]}</span>
                                    <span className={"c9"}>（{ACCOUNT_MAP[mt4AccType]}）</span>
                                </p>
                                <p className={this.mergeClassName("mg-tp-20", "c9")}>账号尚未激活，请及时充值</p>
                            </li> */}
                            <li>
                                <div className={styles.accountName}>{mt4NickName?mt4NickName:ACCOUNT_MAP2[mt4AccType]}</div>
                                <div className={styles.accountType}>
                                    <div className={styles.text}>{ACCOUNT_MAP[mt4AccType]}</div>
                                </div>
                                <div className={styles.list}>
                                    <div className={styles.listItem}>
                                        <div className={styles.value}>${floatPL}</div>
                                        <div className={styles.text}>浮动盈余</div>
                                    </div>
                                    <div className={styles.listItem}>
                                        <div className={styles.value}>${equity}</div>
                                        <div className={styles.text}>净值</div>
                                    </div>
                                    <div className={styles.listItem}>
                                        <div className={styles.value}>{ratioMargin}%</div>
                                        <div className={styles.text}>保证金比例</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                )
            }
            
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
