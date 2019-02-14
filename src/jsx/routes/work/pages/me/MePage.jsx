import AppHeader from '../../../../components/common/appheader/AppHeader';

import styles from './css/mePage.less';

/********我的主页*********/
class MePage extends PageComponent{

    constructor(props,context) {
        super(props,context);
    }
      //获取页面名称
    getPageName(){ return "我的主页"; }

    render(){
        systemApi.log("MePage render");

        return (
            <div>
                <AppHeader headerName="我的" showBack={false}/>
                <Content coverBottom={false}>

                </Content>
                {this.props.children}
            </div>
        );
    }

}


module.exports = MePage;
