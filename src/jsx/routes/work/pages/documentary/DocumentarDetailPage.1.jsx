import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import SubTabs from '../../../../components/common/subtabs/SubTabs';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';
import FlatTab from '../../../../components/common/subtabs/FlatTab';
import Static from '../../components/documentary/Static';

import CopyDialog from '../../components/documentary/detail/CopyDialog';
import CancelDialog from '../../components/documentary/detail/CancelDialog';

import ProcotolDialog from '../../components/documentary/detail/ProcotolDialog';
import CurTradeList from '../../components/documentary/detail/CurTradeList';
import HisTradeList from '../../components/documentary/detail/HisTradeList';
import { connect } from 'react-redux';
import { applyFollower,openFollow ,followRelieve} from '../../actions/documentary/documentaryAction';

import styles from './css/documentarDetailPage.less';

/********跟单主页*********/
class DocumentaryDetailPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        var { 
            followNmae,
            followerId,
        } = this.props.location.query;

        this._followNmae = followNmae;
        this._followerId = followerId;

        this._fowType = 0;
        this.state = {
            index: 0,
            fixTabs: false,
            showDialog:false,
            showProtocol:false,
            showCancel:false,

            starLevel:null,
            maxFowBalance:null,
            suggestBalance:null,
            fowInfo:null,
            signature:null,
            incomeRate30d:null,downRate30d:null,lastDayPLRate:null
            
        }
    }
    //获取页面名称
    getPageName() { return "跟单详情"; }

    componentDidMount(){
        this.interval = setInterval(()=>{
            var {iscroll} = this.refs;
            if(iscroll){
                var {y} = iscroll.wrapper,
                    yRem = this.calculateRem(0, y);
                this.setState({ fixTabs: yRem < -3.34 });;
            }
        }, 50);
    }

    componentWillUmount(){
        clearInterval(this.interval);
    }

    componentWillUpdate(nextProps, nextState) {
        var { fixTabs } = nextState;
        if (this.state.fixTabs == fixTabs) {
            this.shouldFresh = true;
        }
    }

    componentDidUpdate() {
        var { iscroll } = this.refs;
        if (this.shouldFresh) {
            iscroll && iscroll.refresh()
        }
        this.shouldFresh = false;
    }

    didUpdate = ()=>{
        var { iscroll } = this.refs;
        iscroll && iscroll.refresh();
    }

    tabChange = (index) => {
        this.setState({ index});
        setTimeout(()=>{
            var {iscroll} = this.refs,
                yRem = this.calculateRem(0, iscroll.wrapper.y);
            this.setState({ fixTabs: yRem < -3.34 });
        },50);
    }

    getScrollStyle() {
        return styles.frame;
    }

    reloadData = () => {
        console.log("reload");
    }

    renderTabs() {
        var {index} = this.state;
        return (
            <SubTabs index={index} onTabChange={this.tabChange}>
                <FlatTab text="数据统计" />
                <FlatTab text="当前交易" />
                <FlatTab text="历史交易" />
            </SubTabs>
        )
    }

    getNextPage = ()=>{
        var {index} = this.state,
            {curtrade, history} = this.refs;
        if(index == 1){
            curtrade && curtrade.getWrappedInstance().getNextPage();
        }
        else if(index == 2){
            history && history.getWrappedInstance().getNextPage();
        }
    }

    copyClick = ()=>{
        this._fowType=0;
        var f_mt4Id = systemApi.getValue("f_mt4Id");
        if(f_mt4Id && f_mt4Id.length>0){
            this.setState({showDialog:true});   
        }else{//展示协议
            this.setState({showProtocol:true});   
        }
       
    }

    changeCopy = ()=>{
        this._fowType=1;
        var f_mt4Id = systemApi.getValue("f_mt4Id");
        if(f_mt4Id && f_mt4Id.length>0){
            this.setState({showDialog:true,});   
        }else{//展示协议
            this.setState({showProtocol:true});   
        }
       
    }

    confirmCancelCopy=(cancelType)=>{
        var fowType = 2;
        if(!cancelType)
            fowType= 4;
 
        var f_mt4Id= systemApi.getValue("f_mt4Id");
        this.setState({showDialog:false});
        this.props.followRelieve(this,{followerId:this._followerId,fowType,fowMt4Id:f_mt4Id},(data)=>{
            this.setState({fowInfo:data,showCancel:false});

        });
    }


    cancelCopy = ()=>{

        var f_mt4Id = systemApi.getValue("f_mt4Id");
        if(f_mt4Id && f_mt4Id.length>0){
            this.setState({showCancel:true});   
        }else{//展示协议
            this.setState({showProtocol:true});   
        }
       
    }

    closeDialog = ()=>{
        this.setState({showDialog:false,showProtocol:false,showCancel:false});
         
     }

    updateInfo=(data)=>{
        var {starLevel,
            maxFowBalance,signature,
            incomeRate30d,downRate30d,lastDayPLRate,
            suggestBalance,fowInfo}=data;

        this.setState({
            starLevel,
            maxFowBalance,
            suggestBalance,fowInfo,signature,
            incomeRate30d,downRate30d,lastDayPLRate,
        });

    }

 
  //  
    confirmCopy = (funds)=>{
        var {fowInfo} = this.state;
        if(fowInfo==null) return;
        var {canFowBalance=0} =fowInfo;
        if(canFowBalance<=0){
            hashHistory.push("/work/me/recharge");
            return;
        }
        if(funds<200 || funds>canFowBalance) return;
        
        var f_mt4Id= systemApi.getValue("f_mt4Id");
        this.setState({showDialog:false});
        this.props.applyFollower(this,{followerId:this._followerId,funds,fowType:this._fowType,fowMt4Id:f_mt4Id},(data)=>{
            this.setState({fowInfo:data});
        });

    }

    confirmProcotol =()=>{
        this.props.openFollow(this,(data)=>{
            var {fowMt4Id} = data;
            systemApi.setValue("f_mt4Id",fowMt4Id);
            this.setState({showProtocol:false,fowInfo:data});
        });
    }

    recover = ()=>{

        var f_mt4Id= systemApi.getValue("f_mt4Id");
        this.setState({showDialog:false});
        this.props.followRelieve(this,{followerId:this._followerId,fowType:3,fowMt4Id:f_mt4Id},(data)=>{
            this.setState({fowInfo:data,showCancel:false});

        });

    }

    flate =()=>{

        var f_mt4Id= systemApi.getValue("f_mt4Id");
        this.setState({showDialog:false});
        this.props.followRelieve(this,{followerId:this._followerId,fowType:4,fowMt4Id:f_mt4Id},(data)=>{
            this.setState({fowInfo:data,showCancel:false});

        });

    }

        //  fowMt4Id
        //  fowStatus
        //  fowBalance
        //  canFowBalance
    render() {
        systemApi.log("DocumentaryDetailPage render");

        var { index, fixTabs,showDialog,showProtocol,showCancel,
            starLevel,
            maxFowBalance,
            suggestBalance,
            fowInfo,
            signature,
            incomeRate30d,downRate30d,lastDayPLRate
         } = this.state;
         var fowStatus =null;
         var canFowBalance = null;

         
         if(fowInfo){
             fowStatus = fowInfo.fowStatus;
             canFowBalance = fowInfo.canFowBalance;
         } 

        return (

            <div className={styles.main}>
                <AppHeader headerName={this._followNmae} theme="transparent" />
                <div className={styles.header}></div>
                <IScrollView className={this.getScrollStyle()} canUpFresh={true} canDownFresh={true}
                    upFresh={this.reloadData} downFresh={this.getNextPage} ref="iscroll">
                    <div className={styles.box}>
                        <div className={styles.optional_detail}>
                            <div className={styles.head_portrait}><img src="./images/documentary/img03.png" alt="" /></div>
                            <div className={styles.currency_name}>
                                <p className={this.mergeClassName("c3", styles.c3)}>
                                    <span >{this._followNmae}</span>
                                    {starLevel?<i className={styles.icon_grade}>{starLevel}</i>:null}
                                </p>
                                <p><span className={this.mergeClassName("c9", "left")}>{signature}</span></p>
                            </div>
                            <div className={"clear"}></div>
                            <div className={styles.account_dt}>
                                <ul>
                                    <li>
                                        <p className={this.mergeClassName("font32", "red")}>{incomeRate30d}%</p>
                                        <p className={this.mergeClassName("c9", "mg-tp-10")}>近30日收益率</p>
                                    </li>
                                    <li>
                                        <p className={this.mergeClassName("font32", "green")}>{downRate30d}%</p>
                                        <p className={this.mergeClassName("c9", "mg-tp-10")}>近30日最大跌幅</p>
                                    </li>
                                    <li>
                                        <p className={"font32"}>{lastDayPLRate}%</p>
                                        <p className={this.mergeClassName("c9", "mg-tp-10")}>上一交易日</p>
                                    </li>
                                </ul>
                            </div>

                        </div>
                        <div className={styles.bg}>
                            {this.renderTabs()}
                            <LazyLoad index={index}>
                                <Static updateInfo={this.updateInfo} onDidUpdate={this.didUpdate} followerId={this._followerId}/>
                                <CurTradeList followerId={this._followerId} onDidUpdate={this.didUpdate} ref="curtrade"/>
                                <HisTradeList followerId={this._followerId} onDidUpdate={this.didUpdate} ref="history" />
                            </LazyLoad>
                        </div>
                    </div>

                </IScrollView>
                
                    <div className={styles.bottomBtn}>
                        {fowStatus?null:<div className={styles.btn} onClick={this.copyClick}>复制</div>}
                        {fowStatus==0?<div className={styles.btn} onClick={this.copyClick}>复制</div>:null}

                        {fowStatus==1?<div className={styles.btn2Frame}>
                            <div className={styles.btn2} onClick={this.changeCopy}>修改复制金额</div>
                            </div>:null}
                        {fowStatus==1?
                            <div className={styles.btn2Frame}>
                                <div className={styles.btn2} onClick={this.cancelCopy}>解除跟随关系</div>
                            </div>:null}
                        {fowStatus==2?<div className={styles.btn2Frame}>
                            <div className={styles.btn2} onClick={this.recover}>复制</div>
                            </div>:null}
                        {fowStatus==2?
                            <div className={styles.btn2Frame}>
                                <div className={styles.btn2} onClick={this.flate}>立即平仓</div>
                            </div>:null}

                    </div>

                {fixTabs ? (
                    <div className={styles.fixed}>{this.renderTabs()}</div>
                ) : null}
            
                {showDialog? <CopyDialog suggestBalance={suggestBalance} maxFowBalance={maxFowBalance} canFowBalance={canFowBalance}  followName = {this._followNmae} onCancel={this.closeDialog} onSure={this.confirmCopy} />:null}
                {showCancel? <CancelDialog   onCancel={this.closeDialog} onSure={this.confirmCancelCopy} />:null}
                {showProtocol? <ProcotolDialog  followName = {this._followNmae} onCancel={this.closeDialog} onSure={this.confirmProcotol} />:null}
                
                {this.props.children}
            </div>
        );
    }

}
function injectAction() {
    return { applyFollower,openFollow ,followRelieve};
}

module.exports = connect(null, injectAction())(DocumentaryDetailPage);