import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import DailyReportList from '../../components/me/DailyReportList';

import styles from './css/dailyReportPage.less';

/********我的主页*********/
class DailyReportPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
    }
    //获取页面名称
    getPageName() { return "每日汇评"; }

    render() {
        systemApi.log("DailyReportPage render");

        return (
            <FullScreenView>
                <AppHeader headerName="每日汇评" />
                <Content>
                    <DailyReportList/>
                </Content>
                {this.props.children}
            </FullScreenView>
        );
    }

}


module.exports = DailyReportPage;
