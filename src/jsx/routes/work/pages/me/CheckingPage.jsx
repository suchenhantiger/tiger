import AppHeader from '../../../../components/common/appheader/AppHeader';
import styles from './css/mePage.less';

/********我的主页*********/
class CheckintPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state={
        }

    }

  

    render() {
        systemApi.log("CheckintPage render");
        return (
            <div>
                <AppHeader theme="transparent" showBack={true}/>
                <Content coverHeader={true} coverBottom={false}>
                    <div class="login-box">
                        <ul class="login-tab mg-tp-42">
                            <li class="on">认证信息已提交</li>
                        </ul>
                        <div class="clear"></div>
                        <div class="login-int font28 c3">正在审核中</div>
                        <div class="clear"></div>
                        <div class="login-int">审核时间<br/>工作日10:00-18:00，将在30分钟左右完成审核<br/>工作日18:00以后，将在21:00、23:00统一审核；23:00后认
                            证的将在次日审核<br/>非工作日时间：将在10:00、16:00、22:00统一审核；22:00
                            后认证的将在次日审核<br/>请留意查询牛奶的审核状态</div>
                        <div class="bottom-btn-fixed">
                            <div class="login-btn mg-lr-30"><button>确 定</button></div>
                        </div>
                    </div>
                </Content>
            </div>
        );
    }

}



module.exports = CheckintPage;
