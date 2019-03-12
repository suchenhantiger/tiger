import AppHeader from '../../../../components/common/appheader/AppHeader';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';

import Position from '../../components/trade/Position';
import TradeHistory from '../../components/trade/TradeHistory';
import TradeFee from '../../components/trade/TradeFee';

import styles from './css/tradePage.less';

/********交易主页*********/
class TradePage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            index: 0
        }
    }
    //获取页面名称
    getPageName() { return "交易主页"; }

    renderHeader() {
        var { index } = this.state;
        return (
            <div className={styles.tabs}>
                <span className={this.mergeClassName(styles.item, index == 0 ? styles.on : "")} onClick={this.tabChange(0)}>持仓<i></i></span>
                <span className={this.mergeClassName(styles.item, index == 1 ? styles.on : "")} onClick={this.tabChange(1)}>历史<i></i></span>
                <span className={this.mergeClassName(styles.item, index == 2 ? styles.on : "")} onClick={this.tabChange(2)}>佣金<i></i></span>
            </div>
        )
    }

    tabChange = (index) => () => {
        this.setState({ index });
    }

    render() {
        systemApi.log("TradePage render");

        var {index} = this.state;

        return (
            <div>
                <AppHeader headerName={this.renderHeader()} showBack={false} />
                <Content coverHeader={true} coverBottom={false}>
                    <div className={styles.header}></div>
                    {/* <LazyLoad index={index}>
                        <Position/>
                       <TradeHistory/>
                        <TradeFee/> 
                    </LazyLoad> */}
                    {index==0? <Position/>:null}
                    {index==1? <TradeHistory/>:null}

                </Content>
                {this.props.children}
            </div>
        );
    }

}


module.exports = TradePage;
