import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';

import styles from './css/serverPage.less';

/********我的主页*********/
class ServerPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
    }
    //获取页面名称
    getPageName() { return "联系客服页面"; }

    render() {
        systemApi.log("ServerPage render");

        return (
            <FullScreenView>
                <AppHeader headerName="联系客服" />
                <Content>
                    
                </Content>
                {this.props.children}
            </FullScreenView>
        );
    }

}


module.exports = ServerPage;
