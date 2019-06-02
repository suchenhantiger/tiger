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
           // console.log(data);
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

       // htmltext= "<p class='font30  line-ht-36 font_bold center'>大家汇多重交易激励</p><p class='mg-tp-30'><span class='font30 mg-bt-20 mg-tp-20 c1 line-ht-36 font_bold'>一重礼：</span><span class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36 font_bold'>交易手数累计红包</span></p><div style=' margin: .3rem;background: #fff;border-radius: .1rem;overflow: hidden;box-shadow: 0 0 0.38rem rgba(0, 0, 0, 0.1);'><div class='mg-tp-20'style='overflow: hidden;float: left;padding: .2rem 0 .22rem 0;margin: 0 .3rem;line-height: .35rem;width: 65%;'>体验金交易满2手、盈利15%以上，完成首次入金后即可兑现(美元/人民币和CFD产品不参与活动)，每位用户仅可领取一次(注册后14日内兑现)。</div><div style='float:right;padding: .3rem 0;height: 100%;font-size: .32rem;color:red;'><p style=' text-align: right;margin-right: .2rem;'>$5</p></div></div><div style=' margin: .3rem;background: #fff;border-radius: .1rem;overflow: hidden;box-shadow: 0 0 0.38rem rgba(0, 0, 0, 0.1);'><div class='mg-tp-20'style='overflow: hidden;float: left;padding: .2rem 0 .22rem 0;margin: 0 .3rem;line-height: .35rem;width: 65%;'>首次入金后完成3手交易(不含美元/人民币、CFD产品)，每个用户仅可领取一次(注册后14天内兑现)。</div><div style='float:right;padding: .3rem 0;height: 100%;font-size: .32rem;color:red;'><p style=' text-align: right;margin-right: .2rem;'>$10</p></div></div><div style=' margin: .3rem;background: #fff;border-radius: .1rem;overflow: hidden;box-shadow: 0 0 0.38rem rgba(0, 0, 0, 0.1);'><div class='mg-tp-20'style='overflow: hidden;float: left;padding: .2rem 0 .22rem 0;margin: 0 .3rem;line-height: .35rem;width: 65%;'>首次入金后完成9手交易(不含美元/人民币、CFD产品)，每个用户仅可领取一次(注册后30天内兑现)。</div><div style='float:right;padding: .3rem 0;height: 100%;font-size: .32rem;color:red;'><p style=' text-align: right;margin-right: .2rem;'>$20</p></div></div><div style=' margin: .3rem;background: #fff;border-radius: .1rem;overflow: hidden;box-shadow: 0 0 0.38rem rgba(0, 0, 0, 0.1);'><div class='mg-tp-20'style='overflow: hidden;float: left;padding: .2rem 0 .22rem 0;margin: 0 .3rem;line-height: .35rem;width: 65%;'>首次入金后完成25手交易(不含美元/人民币、CFD产品)，每个用户仅可领取一次(注册后45天内兑现)。</div><div style='float:right;padding: .3rem 0;height: 100%;font-size: .32rem;color:red;'><p style=' text-align: right;margin-right: .2rem;'>$50</p></div></div><div style=' margin: .3rem;background: #fff;border-radius: .1rem;overflow: hidden;box-shadow: 0 0 0.38rem rgba(0, 0, 0, 0.1);'><div class='mg-tp-20'style='overflow: hidden;float: left;padding: .2rem 0 .22rem 0;margin: 0 .3rem;line-height: .35rem;width: 65%;'>首次入金后5日内累计入金≥1000美金，累计完成50手交易(不含美元/人民币、CFD产品)即可兑现红包(金额100美金)(每位用户仅可领取一次，注册后75日内兑现)；</div><div style='float:right;padding: .3rem 0;height: 100%;font-size: .32rem;color:red;'><p style=' text-align: right;margin-right: .2rem;'>$100</p></div></div><div style=' margin: .3rem;background: #fff;border-radius: .1rem;overflow: hidden;box-shadow: 0 0 0.38rem rgba(0, 0, 0, 0.1);'><div class='mg-tp-20'style='overflow: hidden;float: left;padding: .2rem 0 .22rem 0;margin: 0 .3rem;line-height: .35rem;width: 65%;'>首次入金后完成60手交易(不含美元/人民币、CFD产品)，每个用户仅可领取一次(注册后45天内兑现)。</div><div style='float:right;padding: .3rem 0;height: 100%;font-size: .32rem;color:red;'><p style=' text-align: right;margin-right: .2rem;'>$120</p></div></div><div style=' margin: .3rem;background: #fff;border-radius: .1rem;overflow: hidden;box-shadow: 0 0 0.38rem rgba(0, 0, 0, 0.1);'><div class='mg-tp-20'style='overflow: hidden;float: left;padding: .2rem 0 .22rem 0;margin: 0 .3rem;line-height: .35rem;width: 65%;'>首次入金后5日内累计入金≥5000美金，累计完成90手交易(不含美元/人民币、CFD产品)即可兑现红包(金额200美金)(每位用户仅可领取一次，注册后75日内兑现)；</div><div style='float:right;padding: .3rem 0;height: 100%;font-size: .32rem;color:red;'><p style=' text-align: right;margin-right: .2rem;'>$200</p></div></div><div style=' margin: .3rem;background: #fff;border-radius: .1rem;overflow: hidden;box-shadow: 0 0 0.38rem rgba(0, 0, 0, 0.1);'><div class='mg-tp-20'style='overflow: hidden;float: left;padding: .2rem 0 .22rem 0;margin: 0 .3rem;line-height: .35rem;width: 65%;'>首次入金后5日内累计入金≥10000美金，累计完成180手交易(不含美元/人民币、CFD产品)即可兑现红包(金额500美金)(每位用户仅可领取一次，注册后150日内兑现)。</div><div style='float:right;padding: .3rem 0;height: 100%;font-size: .32rem;color:red;'><p style=' text-align: right;margin-right: .2rem;'>$500</p></div></div><p class='mg-tp-20'><span class='font30 mg-bt-20  c1 line-ht-36 font_bold'>二重礼：</span><span class='font26 mg-bt-20 mg-tp-20 c1 line-ht-36 font_bold'>好友邀请红包</span></p><div style=' margin: .3rem;background: #fff;border-radius: .1rem;overflow: hidden;box-shadow: 0 0 0.38rem rgba(0, 0, 0, 0.1);'><div class='mg-tp-20'style='overflow: hidden;float: left;padding: .2rem 0 .22rem 0;margin: 0 .3rem;line-height: .35rem;width: 65%;'>邀请3名好友注册，且至少有1人入金并完成1手交易(美元/人民币和CFD产品不参与活动)，每位用户仅可领取一次(注册后60日内兑现)。</div><div style='float:right;padding: .3rem 0;height: 100%;font-size: .32rem;color:red;'><p style=' text-align: right;margin-right: .2rem;'>$10</p></div></div><div style=' margin: .3rem;background: #fff;border-radius: .1rem;overflow: hidden;box-shadow: 0 0 0.38rem rgba(0, 0, 0, 0.1);'><div class='mg-tp-20'style='overflow: hidden;float: left;padding: .2rem 0 .22rem 0;margin: 0 .3rem;line-height: .35rem;width: 65%;'>被邀请好友完成注册流程，并入金交易且完成1手交易(美元/人民币和CFD产品不参与活动)，每位用户仅可领取一次(注册后60日内兑现)。</div><div style='float:right;padding: .3rem 0;height: 100%;font-size: .32rem;color:red;'><p style=' text-align: right;margin-right: .2rem;'>$5</p></div></div><p class=' c1'>注：</p><p class=' c1'>1.所有有效计算订单持仓时间不得低于3分钟；</p><p class='c1'>2.入金金额以活动期内净入金为标准；</p><p class='c1'>具体活动详询大家汇官方客服</p>";
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