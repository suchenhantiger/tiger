import AppHeader from '../../../../components/common/appheader/AppHeader';

import styles from './css/documentaryPage.less';

/********跟单主页*********/
class DocumentaryPage extends PageComponent{

    constructor(props,context) {
        super(props,context);
    }
      //获取页面名称
    getPageName(){ return "跟单主页"; }

    render(){
        systemApi.log("DocumentaryPage render");

        return (
            <div>
                <AppHeader headerName="跟单" showBack={false}/>
                <Content coverBottom={false}>

                </Content>
                {this.props.children}
            </div>
        );
    }

}


module.exports = DocumentaryPage;
