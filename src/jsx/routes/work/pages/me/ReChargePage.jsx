import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';

import ReChargeForm from '../../components/me/recharge/ReChargeForm';

import styles from './css/reChargePage.less';

/********我的主页*********/
class ReChargePage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        var {index} = this.props.location.query||{};
        this.state = {
            index:index||0
        }
    }
    //获取页面名称
    getPageName() { return "充值页面"; }

    itemClick = (index)=>()=>{
        this.setState({index});
    }

    renderHeader() {
        var {index} = this.state;
        return [
            <span className={this.mergeClassName(styles.item, index==0?styles.on:"")} onClick={this.itemClick(0)}>充值<i></i></span>,
            <span className={this.mergeClassName(styles.item, index==1?styles.on:"")} onClick={this.itemClick(1)}>提现<i></i></span>,
            <span className={this.mergeClassName(styles.item, index==2?styles.on:"")} onClick={this.itemClick(2)}>凭证记录<i></i></span>
        ]
    }

    render() {
        systemApi.log("ReChargePage render");

        var {index} = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName={this.renderHeader()}/>
                <Content coverBottom={false}>
                    <LazyLoad index={index}>
                        <ReChargeForm/>
                    </LazyLoad>
                </Content>
                {this.props.children}
            </FullScreenView>
        );
    }

}


module.exports = ReChargePage;
