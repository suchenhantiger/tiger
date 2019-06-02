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
        var tmpComssion = McIntl.message("commission");
        var itemClass = styles.item;
        if(tmpComssion.length>4){
            itemClass = styles.item2;
        }
        
        return (
            <div className={styles.tabs}>
                <span className={this.mergeClassName(itemClass, index == 0 ? styles.on : "")} onClick={this.tabChange(0)}>{McIntl.message("position")}<i></i></span>
                <span className={this.mergeClassName(itemClass, index == 1 ? styles.on : "")} onClick={this.tabChange(1)}>{McIntl.message("history")}<i></i></span>
                <span className={this.mergeClassName(itemClass, index == 2 ? styles.on : "")} onClick={this.tabChange(2)}>{tmpComssion}<i></i></span>
            </div>
        )
    }

    tabChange = (index) => () => {
        this.setState({ index });
    }

    render() {
        systemApi.log("TradePage render");

        var {index} = this.state;
        var emailIsActive = systemApi.getValue("emailIsActive");
        var isReal = systemApi.getValue("isReal"); 

        return (
            <div>
                <AppHeader headerName={this.renderHeader()} showBack={false} />
                <Content coverHeader={true} coverBottom={false}>
                    <div className={styles.header}></div>
                     <LazyLoad index={index}>
                        <Position emailIsActive={emailIsActive} isReal={isReal}/>
                        <TradeHistory emailIsActive={emailIsActive} isReal={isReal}/>
                        <TradeFee emailIsActive={emailIsActive} isReal={isReal}/> 
                    </LazyLoad> 
                    {/* {index==0? <Position/>:null}
                    {index==1? <TradeHistory/>:null} */}

                </Content>
                {this.props.children}
            </div>
        );
    }

}


module.exports = TradePage;
