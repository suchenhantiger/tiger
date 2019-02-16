import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView'

import styles from './css/agreementPage.less';

/********我的主页*********/
class AgreementPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
    }
    //获取页面名称
    getPageName() { return "我的主页"; }

    render() {
        systemApi.log("AgreementPage render");

        return (
            <FullScreenView>
                <AppHeader headerName="客户协议"/>
                <Content>
                    <div className={this.mergeClassName(styles.detail_box, "mg-lr-30")}>
                        <h2>客户协议标题</h2>
                        <p>客户协议文字内容客户协议文字内容客户协议文字内容客户协议文字内容</p>
                        <p>客户协议文字内容客户协议文字内容客户协议文字内容客户协议文字内容</p>
                    </div>
                </Content>
            </FullScreenView>
        );
    }

}


module.exports = AgreementPage;
