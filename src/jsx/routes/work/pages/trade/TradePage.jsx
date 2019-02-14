import AppHeader from '../../../../components/common/appheader/AppHeader';

import styles from './css/tradePage.less';

/********交易主页*********/
class TradePage extends PageComponent{

    constructor(props,context) {
        super(props,context);
    }
      //获取页面名称
    getPageName(){ return "交易主页"; }

    render(){
        systemApi.log("TradePage render");

        return (
            <div>
                <AppHeader headerName="交易" showBack={false}/>
                <Content coverBottom={false}>

                </Content>
                {this.props.children}
            </div>
        );
    }

}


module.exports = TradePage;
