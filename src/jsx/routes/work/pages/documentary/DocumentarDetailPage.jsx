import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import SubTabs from '../../../../components/common/subtabs/SubTabs';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';
import FlatTab from '../../../../components/common/subtabs/FlatTab';

import CurTradeList from '../../components/documentary/detail/CurTradeList';
import HisTradeList from '../../components/documentary/detail/HisTradeList';

import styles from './css/documentarDetailPage.less';

/********跟单主页*********/
class DocumentaryDetailPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        var { accuracy30d,
            downRate30d,
            followNmae,
            followerId,
            fowwerNumHis,
            incomeRate30d,
            lastDayPLRate,
            signature } = this.props.location.query;
        this._accuracy30d = accuracy30d;
        this._downRate30d = downRate30d;
        this._followNmae = followNmae;
        this._followerId = followerId;
        this._fowwerNumHis = fowwerNumHis;
        this._incomeRate30d = incomeRate30d;
        this._lastDayPLRate = lastDayPLRate;
        this._signature = signature;

        this.state = {
            index: 0,
            fixTabs: false
        }
    }
    //获取页面名称
    getPageName() { return "跟单详情"; }

    componentDidMount(){
        this.interval = setInterval(()=>{
            var {iscroll} = this.refs;
            if(iscroll){
                var {y} = iscroll.wrapper,
                    yRem = this.calculateRem(0, y);
                this.setState({ fixTabs: yRem < -3.34 });;
            }
        }, 50);
    }

    componentWillUmount(){
        clearInterval(this.interval);
    }

    componentWillUpdate(nextProps, nextState) {
        var { fixTabs } = nextState;
        if (this.state.fixTabs == fixTabs) {
            this.shouldFresh = true;
        }
    }

    componentDidUpdate() {
        var { iscroll } = this.refs;
        if (this.shouldFresh) {
            iscroll && iscroll.refresh()
        }
        this.shouldFresh = false;
    }

    tabChange = (index) => {
        this.setState({ index});
        setTimeout(()=>{
            var {iscroll} = this.refs,
                yRem = this.calculateRem(0, iscroll.wrapper.y);
            this.setState({ fixTabs: yRem < -3.34 });
        },50);
    }

    getScrollStyle() {
        return styles.frame;
    }

    reloadData = () => {
        console.log("reload");
    }

    renderTabs() {
        var {index} = this.state;
        return (
            <SubTabs index={index} onTabChange={this.tabChange}>
                <FlatTab text="数据统计" />
                <FlatTab text="当前交易" />
                <FlatTab text="历史交易" />
            </SubTabs>
        )
    }

    getNextPage = ()=>{
        console.log("getNextPage");
    }

    render() {
        systemApi.log("DocumentaryDetailPage render");

        var { index, fixTabs } = this.state;

        return (
            <div className={styles.main}>
                <AppHeader headerName="LEIMS" theme="transparent" />
                <div className={styles.header}></div>
                <IScrollView className={this.getScrollStyle()} canUpFresh={true} canDownFresh={true}
                    upFresh={this.reloadData} downFresh={this.getNextPage} ref="iscroll">
                    <div className={styles.box}>
                        <div className={styles.optional_detail}>
                            <div className={styles.head_portrait}><img src="./images/documentary/img03.png" alt="" /></div>
                            <div className={styles.currency_name}>
                                <p className={this.mergeClassName("c3", styles.c3)}>
                                    <span >{this._followNmae}</span>
                                    {/* <i className={styles.icon_grade}>B</i> */}
                                </p>
                                <p><span className={this.mergeClassName("c9", "left")}>{this._signature}</span></p>
                            </div>
                            <div className={"clear"}></div>
                            <div className={styles.account_dt}>
                                <ul>
                                    <li>
                                        <p className={this.mergeClassName("font32", "red")}>{this._incomeRate30d}%</p>
                                        <p className={this.mergeClassName("c9", "mg-tp-10")}>近30日收益率</p>
                                    </li>
                                    <li>
                                        <p className={this.mergeClassName("font32", "green")}>{this._downRate30d}%</p>
                                        <p className={this.mergeClassName("c9", "mg-tp-10")}>近30日最大跌幅</p>
                                    </li>
                                    <li>
                                        <p className={"font32"}>{this._lastDayPLRate}%</p>
                                        <p className={this.mergeClassName("c9", "mg-tp-10")}>上一交易日</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.bg}>
                            {this.renderTabs()}
                            <LazyLoad index={index}>
                                <CurTradeList />
                                <CurTradeList />
                                <HisTradeList />
                            </LazyLoad>
                        </div>
                    </div>
                </IScrollView>
                {fixTabs ? (
                    <div className={styles.fixed}>{this.renderTabs()}</div>
                ) : null}
                {this.props.children}
            </div>
        );
    }

}


module.exports = DocumentaryDetailPage;
