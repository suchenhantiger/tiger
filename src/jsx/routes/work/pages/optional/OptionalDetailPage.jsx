import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';

import SimpleDetail from '../../components/optional/detail/SimpleDetail';
import ComplexDetail from '../../components/optional/detail/ComplexDetail';

import styles from './css/optionalDetailPage.less';

/********自选-简单*********/
class OptionalDetailPage extends PageComponent{

    constructor(props,context) {
        super(props,context);
        this.state = {
            index:0
        }
    }
      //获取页面名称
    getPageName(){ return "自选-简单"; }

    tabChange = (index)=>()=>{
        this.setState({index});
    }

    renderHeader(){
        var {index} = this.state;
        return (
            <div className={styles.tabs}>
                <span className={this.mergeClassName(styles.item, index==0?styles.on:"")} onClick={this.tabChange(0)}>简单<i></i></span>
                <span className={this.mergeClassName(styles.item, index==1?styles.on:"")} onClick={this.tabChange(1)}>高级<i></i></span>
            </div>
        )
    }

    render(){
        systemApi.log("OptionalDetailPage render");

        var {index} = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName={this.renderHeader()} theme="transparent"/>
                <Content coverHeader={true}>
                    <div className={styles.header}>
                        <div className={styles.blank}></div>
                        <div className={styles.optional_detail}>
                            <div className={styles.currency_name}>
                                <p className={this.mergeClassName("c3", styles.c3)}>欧元美元</p>
                                <p className={this.mergeClassName("c9", "font-arial")}>EURUSD200</p>
                            </div>
                            <div className={styles.icon_intro}>?</div>
                            <div className={styles.optional_dt_price}>
                                <div className={this.mergeClassName("font56", "red", styles.font56)}>1.34568</div>
                                <div className={this.mergeClassName("font24", "red", "text-al-right")}>
                                    <span>1.13%</span>/
                                    <span>1.34567</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.kchat}></div>
                    <LazyLoad index={index}>
                        <SimpleDetail/>
                        <ComplexDetail/>
                    </LazyLoad>
                </Content>
            </FullScreenView>
        );
    }

}


module.exports = OptionalDetailPage;
