import AppHeader from '../../../../components/common/appheader/AppHeader';
import HeaderIcon from '../../../../components/common/appheader/HeaderIcon';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import {connect} from 'react-redux';
import {saveRealAccMt4} from '../../actions/me/meAction';
import styles from './css/certificationPage.less';
import CertificationForm from '../../components/me/CertificationForm';
import UploadIDCardForm from '../../components/me/UploadIDCardForm';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';

/********我的主页*********/
class CertificationPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state={
           
            currPage:0,
            trueInfo:{},
        }

    }

    next=(trueInfo)=>{
        console.log(trueInfo);
        this.setState({currPage:1,trueInfo});
    }


    submit=(front,back)=>{
        var {trueInfo}=this.state;
        console.log(trueInfo);
        this.props.saveRealAccMt4(this,trueInfo,()=>{
            systemApi.setValue("isReal",2);//预置为2
        });



    }
    backClick=()=>{
        var {currPage =0} =this.state;
        if(currPage==1){
            this.setState({currPage:0});
        }else{
        hashHistory.goBack();
        }
    }

    

    render() {
        systemApi.log("CertificationPage render");
        var {femail,currPage} =this.state;

        let isReal = systemApi.getValue("isReal"); 

        return (
            <FullScreenView>
                <AppHeader showBack={true}  onBackClick={this.backClick} />
                <Content>
                    {isReal==2?
                    <div className={styles.box}>
                        <ul className={styles.login_tab}>
                            <li >认证信息已提交</li>
                        </ul>
                        {/* <div class="clear"></div> */}
                        <div className={styles.login_int} style={{fontSize:"0.2rem",color:"#333"}}>正在审核中</div>
                        <div className={styles.login_int}>
                            审核时间<br/>
                            工作日10:00-18:00，将在30分钟左右完成审核<br/>
                            工作日18:00以后，将在21:00、23:00统一审核；23:00后认证的将在次日审核<br/>
                            非工作日时间：将在10:00、16:00、22:00统一审核；22:00
                            后认证的将在次日审核<br/>
                            请留意查询牛奶的审核状态
                        </div>
                        {/* <div className={styles.bottom_btn_fixed}>
                            <div className={styles.login_btn}><button>确 定</button></div>
                        </div> */}
                    </div>
                        
                    
                    :<div className={styles.box}>
                        <ul className={styles.login_tab}>
                            <li >实名认证</li>
                        </ul>
                        <div className={styles.login_int}>
                        {currPage==0?
                        <span>因监管要求，请您根据提供相关信息。请确认是您本人，审核通过后不可修改。</span>
                        :
                        <span>证件类型：大陆居民身份证<br />请确保证件边框完整、大小适中、字迹清晰、亮度均衡、证件信息与填写信息一致、证件未过期、已满18周岁</span>
                        }
                        
                        </div>
                    </div>
                    }

                    {isReal==2?null:
                    <LazyLoad index={currPage}>
                        <CertificationForm next={this.next}/>
                        <UploadIDCardForm submit={this.submit} />
                    </LazyLoad>
                    }
                    
                 </Content>
            </FullScreenView>
        );
    }

}

function injectProps(state){
    var {accountArr} = state.base || {};
    return {accountArr};
}
function injectAction(){
    return {saveRealAccMt4};
}

module.exports = connect(injectProps,injectAction())(CertificationPage);
