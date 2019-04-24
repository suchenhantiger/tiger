import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView'

import styles from './css/agreementPage.less';
import { connect } from 'react-redux';
import { querySinglePage } from '../../actions/documentary/documentaryAction';
/********我的主页*********/
class AgreementPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        var {title,code} = this.props.location.query;
        this.title=title;
        this.code=code;
        this.state={
            data:{}
        }
    }
    //获取页面名称
    getPageName() { return "我的主页"; }
    componentDidMount(){
        
        this.props.querySinglePage(this,{pageCode:this.code},(data)=>{
            console.log(data);
            this.setState({data});
            });
    }

    render() {
        systemApi.log("AgreementPage render");
        var {data} = this.state;
        var {pagetitle,
            pagecode,
            htmltext=""
            }=data;

            // htmltext= "<p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>Make Capital尊重并且重视每一位客户的隐私及数据安全。我们希望清晰明了有关如何使用您的信息以及能够保护您个人隐私的方法。请认真阅读该项政策。如有任何问题，请致邮联系我们 support@makecapital.com。</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36 font_bold'>隐私政策说明:</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>我们收集何种信息以及收集该信息的原因;我们如何使用该信息以及留存时长;您的隐私权;我们如何保护您的个人信息;何时适用此政策以及其他重要的私密信息。我们收集何种信息以及收集该信息的原因</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>任何账户的申请以及维护，我们都会要求您向我们提供个人信息用于从验证身份等基本需求到处理请求和事务等更复杂的事情。</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>我们将收集并留存以下信息:</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36 font_bold'>允许我们验证您身份的信息</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'> 我们将在真实账户开户过程中收集您的大部分个人信息，但也可能在您注册模拟账户或您希望参与促销活动等期间向您收集个人信息。部分信息将由您提供，但我们或将从公开记录或其他渠道获取您的有关信息。收集的信息将包含您的姓名、邮寄地址、电子邮件地址、联系方式、出生日期和您的收入来源、资产证明、交易历史等详情，同时您需提交附有您照片的完整清晰有效身份证明副本，可以是护照、驾驶证、账单或者居住证等。</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36 font_bold'>支付信息</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>我们将在您需要例如出入金等服务时向您收集个人信息。其中包含您的支付信息，如银行卡号、帐号以及其他用于验证您的交易操作的详细信息。</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36 font_bold'>关于您使用我们网站时的信息</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>当您访问我们的网站或通过我们的平台进行交易时，我们将自动收集并存储您的个人信息。这不仅有助于为您提供最佳的浏览体验，并能帮助我们改进网站。通常，我们收集:</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>技术信息，包括IP地址、登入信息、浏览器类型和版本、时区设置、浏览器插件类型和版本、操作系统和平台。</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>浏览信息，包括通过我们网站点击过的所有URL链接（包括日期和时间）、查看或搜索的产品、页面响应时间、下载错误、浏览页面的时长、页面交互信息、访问与离开页面的途径以及用于拨打我们客户服务电话的任何电话号码。用于区分您与我们网站的其他用户的信息。</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36 font_bold'>从外部来源接收的信息</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>我们将从您合作的任何与我们关联的公司中获得您的信息。我们还与第三方机构（包括商业合作伙伴、技术分包商、支付与交付服务商、网络广告商、分析提供商、信息提供商和信贷咨询机构）有密切合作并能获取您的相关信息。</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36 font_bold'>我们如何使用您的信息以及留存时长</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>评估您与我们合作的资质并验证您的身份和背景;</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>履行我们为您提供的任何服务和/或您与我们签订的合同所产生的义务;</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>配合监管机构、政府机关和法院遵守我们的法律义务;</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>处理您提出的任何请求、查询或投诉;</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>必要时通知您相关的服务变更情况;</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>管理我们的网站和服务以及内部业务运营，包括故障排除、数据分析、测试、研究、统计和调查;</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>必要时通知您相关的服务变更情况;</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>改善我们的网站和服务;</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>作为我们努力确保网站和交易系统安全的一部分;</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>向您提供您已经购买或询问过或您可能感兴趣的产品和服务相关的信息;</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>我们不会将您的个人资料出售给第三方。</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36 font_bold'>我们与谁共享您的个人信息</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>未经您同意，我们不会将您的信息与任何用于独立营销或业务目的的第三方共享。但是，我们可能与以下人员共享您的信息:</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>所有Make Capital团队成员(包括子公司、控股公司及其子公司）;</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>通过我们为您提供服务的服务提供商，例如您的介绍经纪人、资金管理人或其他提供商;</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>具有高安全标准的服务提供商，例如VPS提供商。;</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>为我们或代表我们提供服务的服务提供商，例如帮助我们处理数据或验证您身份的公司。此服务提供商仅能将您的信息用于为我们提供服务;</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>为我们服务提供法律要求的或必要保护的其他机构，包括以下情况:</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>服从法律或回应强制法律程序(例如搜查令或其他法院命令);</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>验证或强制执行对我们服务的调控政策;</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>保护我们的权利、财产或安全，或任何我们各自的关联公司、业务合作伙伴或客户;</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>与公司交易有关的其他方面，包括出售或转让本公司或业务单位，或破产情况;</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>在您的同意或指导下的其他方面，例如您要求我们将您的信息发送给您的专业顾问。</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36 font_bold'>国际数据传输</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>我们可能需要将您的信息发送给在EEA (欧洲经济区)内外国家/地区的其他集团公司或服务提供商。这种情况将发生于如果我们的服务器或供应商和服务提供商位于其他位置。我们向您收集的数据可能会发送到澳大利亚、香港、新西兰和美国进行存储或以其他方式处理。当我们将您的个人数据转移到EEA(欧洲经济区)之外时，我们将努力保护您的隐私和权利，确保数据接收方有足够的系统和措施保护您的数据，并与数据接收方商定欧盟批准的旨在保护您的合同条款。</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>通过使用或参与服务和/或向我们提供您的信息，您同意在EEA之外收集、传输、存储和处理您的信息。</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36 font_bold'>数据留存</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>我们采取合理步骤，确保仅在收集信息的目的所必需的时间内，或根据我们所遵守的任何适用法律法规的要求，留存有关您的信息。</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>如果您认为我们关于您的任何信息有误或不完整，请告知我们。</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36 font_bold'>我们如何保护您的信息安全</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>我们将努力保护我们掌握的信息。我们将个人信息保存于安全的设备中，并以电子方式保存在安全服务器上。我们尽可能使用加密传输链路以及其他保护措施，例如防火墙、身份验证系统(例如密码)和访问控制机制以控制对系统和数据的未经授权访问。我们将定期审查我们的信息收集、存储和处理方式，包括物理安全措施，以防止未经授权访问系统，并限制需要了解您的信息以便为我们处理该信息的员工、承包商和代理的访问权限，他们必须遵守严格的保密协议义务。如果他们未能履行这些义务，他们可能会受到处罚或被解雇。</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36 font_bold'>何时适用此政策</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>本政策的规定适用于我们网站的访问者、过往客户、现有客户、申请人和我们服务的接受者。</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>本政策不适用于我们服务和链接到的第三方网站，或在我们的网站上的广告方。第三方网站均有各自的隐私政策，届时您可详细阅读其政策。</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36 font_bold'>关于我们隐私政策的变更</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>今后此类政策的任何变更我们都将发布在此页面上，并适时通知您。当变更发布并投入使用时生效，您确认并同意该变更方能继续使用我们的服务。我们正在不断开发新技术，因此请密切留意此政策的任何更新或变更。</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36 font_bold'>投诉</p><p class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36'>如果您认为我们有任何违反了本政策或适用法律的行为，请致信Make Capital, Artemis House, Fort Street, Grand Cayman, KY1-1111, Cayman Islands.</p>";
            return (
            <FullScreenView>
                <AppHeader headerName={this.title}/>
                <Content>
                    <div className={this.mergeClassName(styles.detail_box, "mg-lr-30")} dangerouslySetInnerHTML={{__html:htmltext} }>
  
                    </div>
                </Content>
            </FullScreenView>
        );
    }

}

function injectAction() {
    return { querySinglePage };
}

module.exports = connect(null, injectAction())(AgreementPage);