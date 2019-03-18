import AppHeader from '../../../../components/common/appheader/AppHeader';
import styles from './css/checkintPage.less';

/********我的主页*********/
class CheckintPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state={
        }

    }

    close=()=>{
        hashHistory.goBack();
    }

  

    render() {
        systemApi.log("CheckintPage render");
        return (
            <div>
                <AppHeader  showBack={true} />
                <Content coverHeader={true} coverBottom={false}>
                    <div className={styles.login_box}>
                        <ul className={styles.login_tab +" "+styles.mg_tp_42}>
                            <li className={styles.on}>认证信息已提交</li>
                        </ul>
                        <div className={styles.clear}></div>
                        <div className={styles.login_int +" "+styles.font28 +" "+styles.c3}>正在审核中</div>
                        <div className={styles.clear}></div>
                        <div className={styles.login_int}>审核时间<br/>工作日10:00-18:00，将在30分钟左右完成审核<br/>工作日18:00以后，将在21:00、23:00统一审核；23:00后认
                            证的将在次日审核<br/>非工作日时间：将在10:00、16:00、22:00统一审核；22:00
                            后认证的将在次日审核<br/>请留意查询您的审核状态</div>
                        <div className={styles.bottom_btn_fixed}>
                            <div className={styles.login_btn +" "+styles.mg_lr_30}><button onClick={close} >确 定</button></div>
                        </div>
                    </div>
                </Content>
            </div>
        );
    }

}



module.exports = CheckintPage;
