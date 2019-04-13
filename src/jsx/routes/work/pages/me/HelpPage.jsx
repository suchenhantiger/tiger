import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';

import styles from './css/helpPage.less';

/********我的主页*********/
class HelpPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
    }
    //获取页面名称
    getPageName() { return "帮助中心页面"; }

    render() {
        systemApi.log("HelpPage render");

        return (
            <FullScreenView>
                <AppHeader headerName="帮助中心" />
                <Content>
                    
                </Content>
                {this.props.children}
            </FullScreenView>
        );
    }

}


module.exports = HelpPage;
