import LazyLoad from '../../../../../components/common/subtabs/LazyLoad';
import ToUploadList from './ToUploadList';
import ApprovalList from './ApprovalList';
import ApprovedList from './ApprovedList';
import AddCertificatePage from '../../../pages/me/AddCertificatePage';
import styles from './css/records.less';

class Records extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            subIndex:0
        }
    }


    componentDidMount() {
        Event.register("refresh_recordlist",this.refresh_recordlist);
        
    }

    refresh_recordlist =()=>{

        this.refs.ToUploadList.getWrappedInstance().refreshData();
        
    }

    componentWillUnmount(){
        Event.unregister("refresh_recordlist",this.refresh_recordlist);
        
    }


    exampleClick = () => {
        Client.openUrlInapp(systemApi.getValue("rootUrl")+"external/certificateRecord");
    }

    tabChange = (subIndex)=>()=>{
        this.setState({subIndex});
    }

    //渲染函数
    render() {

        var {subIndex} = this.state;

        return (
            <div>
                <div className="mg-lr-30 mg-tp-42">
                    <div className="form_input mg-bt-40">
                        <div className="font_bold mg-bt-20">
                            <span className="left font26" >凭证注意事项</span>
                            <span className="right blue font24 font_100" onClick={this.exampleClick}>查看凭证示例</span>
                        </div>
                        <div className="clear"></div>
                        <div className="c9 line-ht-36 mg-tp-20">
                            <p>1.凭证信息必须显示姓名、银行卡好、支付金额等内容；</p>
                            <p>2.凭证信息必须为实名认证本人银行账户；</p>
                            <p>3.未满足条件1或条件2，审核将被驳回；</p>
                            <p>4.若多次上传凭证不符合条件1或条件2,支付金额将原路退还,产生2%手续费由您自行承担；</p>
                            <p className="red">注意：充值成功后请及时上传凭证，若超过两周未上传，将无法进行交易操作。</p>
                            {/* <p className="red">*代表必须上传入金凭证</p> */}
                        </div>
                    </div>
                </div>
                <div className={styles.ht_gray}></div>
                <div className={this.mergeClassName(styles.subtabs, "center", "mg-tp-30")}>
                    <span className={subIndex==0?styles.on:""} onClick={this.tabChange(0)}>待上传<i></i></span>
                    <span className={subIndex==1?styles.on:""} onClick={this.tabChange(1)}>审核中<i></i></span>
                    <span className={subIndex==2?styles.on:""} onClick={this.tabChange(2)}>审核成功<i></i></span>
                </div>
                <LazyLoad index={subIndex}>
                    <ToUploadList ref="ToUploadList" />
                    <ApprovalList/>
                    <ApprovedList/>
                </LazyLoad>
            </div>
        );
    }

}

module.exports = Records;
