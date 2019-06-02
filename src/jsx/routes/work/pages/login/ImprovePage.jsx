import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView'
// import LazyLoad from '../../../../components/common/subtabs/LazyLoad';

import ImproveForm from '../../components/login/ImproveForm';
// import UploadAddressForm from '../../components/login/UploadAddressForm';
import styles from './css/improvePage.less';

/********我的主页*********/
class ImprovePage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state={
            index:0
        }
    }
    //获取页面名称
    getPageName() { return "我的主页"; }

    renderIcons() {
        return [
            <div className={styles.right_country}><span>中国</span><i></i></div>
        ]
    }

    uploadAddress=()=>{
        this.setState({index:1});
    }

    back=()=>{
        this.setState({index:0});
    }

    backFunc = ()=>{
        var {index} = this.state;
        if(index==1) 
            this.setState({index:0});
        else 
            hashHistory.goBack();
    }

    render() {
        systemApi.log("ForgetPwdPage render");
        var {index} =this.state;

        return (
            <FullScreenView>
                <AppHeader  onBackClick={this.backFunc}/>
                <Content>
                    <ul className={styles.login_tab}>
                        <li className={styles.on}>完善信息</li>
                    </ul>
                    {/* <LazyLoad index={index}> */}
                        <ImproveForm uploadAddress={this.uploadAddress}/>
                        {/* <UploadAddressForm back={this.back}/> */}
                    {/* </LazyLoad> */}
                    
                </Content>
            </FullScreenView>
        );
    }

}


module.exports = ImprovePage;
