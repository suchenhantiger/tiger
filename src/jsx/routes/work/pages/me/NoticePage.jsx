import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';
import SysNoticeList from '../../components/me/notice/SysNoticeList';
import TradeNoticeList from '../../components/me/notice/TradeNoticeList';

import styles from './css/noticePage.less';

/********我的主页*********/
class NoticePage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            index: 0
        }
    }
    //获取页面名称

    tabClick = (index) => () => {
        this.setState({ index });
    }

    renderHeader() {
        var { index } = this.state;
        return [
            <span className={this.mergeClassName(styles.item, index == 0 ? styles.on : "")} onClick={this.tabClick(0)}>系统消息<i></i></span>,
            <span className={this.mergeClassName(styles.item, index == 1 ? styles.on : "")} onClick={this.tabClick(1)}>交易提醒<i></i></span>,
        ]
    }

    render() {
        systemApi.log("SettingPage render");

        var { index } = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName={this.renderHeader()} />
                <Content>
                    <LazyLoad index={index}>
                        <SysNoticeList/>
                        <TradeNoticeList />
                    </LazyLoad>
                </Content>
                {this.props.children}
            </FullScreenView>
        );
    }

}


module.exports = NoticePage;
