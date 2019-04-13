import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import CopyDialog from '../../components/documentary/detail/CopyDialog';
import CancelDialog from '../../components/documentary/detail/CancelDialog';
import CopyAllList from '../../components/trade/CopyAllList';

import { connect } from 'react-redux';
import { getMasterDetail,applyFollower,openFollow ,followRelieve} from '../../actions/documentary/documentaryAction';

import styles from './css/currCopyDetailPage.less';

/********跟单主页*********/
class CurrCopyDetailPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        var { avatarUrl="",
            balance,
            followNmae,
            followerId,
            fowBalance,
            fowStatus,
            maxFowBalance,
            starLevel,
            suggestBalance,
            totalPL} = this.props.location.query;
        if(avatarUrl.length==0) 
            this.avatarUrl ="./images/documentary/img03.png";
        else
            this.avatarUrl = avatarUrl;
        this.balance = balance;
        this.followNmae = followNmae;
        this.followerId = followerId;
        this.fowBalance = fowBalance;
        this.fowStatus = fowStatus;
        this.maxFowBalance = maxFowBalance;
        this.starLevel = starLevel;
        this.suggestBalance = suggestBalance;
        this.totalPL = totalPL;
        
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
            fowInfo:null
            
        }
    }
    //获取页面名称
    getPageName() { return "跟单详情"; }

    componentDidMount(){
        
        this.props.getMasterDetail(this,{followerId:this.followerId},(data)=>{
            var {info={},fowInfo={}} =data;
            var {starLevel,
                maxFowBalance,
                suggestBalance,
                }= info;
            this.setState({fowInfo,maxFowBalance,suggestBalance});       
        });
    }

    componentWillUmount(){
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
        this.props.followRelieve(this,{followerId:this.followerId,fowType,fowMt4Id:f_mt4Id},(data)=>{
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
        this.props.applyFollower(this,{followerId:this.followerId,funds,fowType:this._fowType,fowMt4Id:f_mt4Id},(data)=>{
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
        this.props.followRelieve(this,{followerId:this.followerId,fowType:3,fowMt4Id:f_mt4Id},(data)=>{
            this.setState({fowInfo:data,showCancel:false});

        });

    }

    flate =()=>{

        var f_mt4Id= systemApi.getValue("f_mt4Id");
        this.setState({showDialog:false});
        this.props.followRelieve(this,{followerId:this.followerId,fowType:4,fowMt4Id:f_mt4Id},(data)=>{
            this.setState({fowInfo:data,showCancel:false});

        });

    }

    gotoMaster=()=>{

        hashHistory.push({
            pathname:"/work/trade/currcopydetail/master",
            query:{
                followNmae:this.followNmae,
                followerId:this.followerId}
        })

    }

    renderRight=()=>{
        return <span style={{color:"white"}}onClick={this.gotoMaster}>高手主页</span>
    }

    render() {
        systemApi.log("DocumentaryDetailPage render");
        var {couplist}=this.props;
        var fowList = [];
        var pltmp=0;
        for(var i=0,l=couplist.length;i<l;i++){
            if(couplist[i].followerId==this.followerId){
                fowList.push(couplist[i]);
                pltmp+=couplist[i].netProfit;
            }
            
        }
        var {showDialog,showProtocol,showCancel,
            starLevel,
            maxFowBalance,
            suggestBalance,
            fowInfo
         } = this.state;
         var fowStatus =null;
         var canFowBalance = null;

         
         if(fowInfo){
             fowStatus = fowInfo.fowStatus;
             canFowBalance = fowInfo.canFowBalance;
         }


        return (

            <div className={styles.main}>
                <AppHeader headerName="跟单详情" theme="transparent" iconRight = {this.renderRight()}/>
                <div className={styles.header}></div>
                <IScrollView className={this.getScrollStyle()} canUpFresh={true} canDownFresh={true}
                    upFresh={this.reloadData} downFresh={this.getNextPage} ref="iscroll">
                    <div className={styles.box}>
                        <div className={styles.optional_detail}>
                            <div className={styles.head_portrait}><img src={this.avatarUrl} alt="" /></div>
                            <div className={styles.currency_name}>
                                <p className={this.mergeClassName("c3", styles.c3)}>
                                    <span >{this.followNmae}</span>
                                    {this.starLevel?<i className={styles.icon_grade}>{this.starLevel}</i>:null}
                                </p>
                            </div>
                            <div className={"clear"}></div>
                            <div className={styles.account_dt}>
                                <ul>
                                    <li>
                                        <p className={this.mergeClassName("font32",(pltmp>=0?"red":"green"))}>${pltmp.toFixed(2)}</p>
                                        <p className={this.mergeClassName("c9", "mg-tp-10")}>浮动盈亏</p>
                                    </li>
                                    <li>
                                        <p className={this.mergeClassName("font32",(this.totalPL>=0?"red":"green"))}>${this.totalPL}</p>
                                        <p className={this.mergeClassName("c9", "mg-tp-10")}>累计收益</p>
                                    </li>
                                    <li>
                                        <p className={"font32"}>${this.balance}</p>
                                        <p className={this.mergeClassName("c9", "mg-tp-10")}>复制金额</p>
                                    </li>
                                </ul>
                            </div>

                        </div>
                        <div className={styles.bg}>
                        
                            <CopyAllList  data={fowList} />

                        </div>
                    </div>

                </IScrollView>
                
                    <div className={styles.bottomBtn}>
                        <div className={styles.btn2Frame}>
                            <div className={styles.btn2} onClick={this.changeCopy}>修改复制金额</div>
                        </div>
                        <div className={styles.btn2Frame}>
                            <div className={styles.btn2} onClick={this.cancelCopy}>解除跟随关系</div>
                        </div>

                    </div>
                {showDialog? <CopyDialog suggestBalance={suggestBalance} maxFowBalance={maxFowBalance} canFowBalance={canFowBalance}  followName = {this._followNmae} onCancel={this.closeDialog} onSure={this.confirmCopy} />:null}
                {showCancel? <CancelDialog   onCancel={this.closeDialog} onSure={this.confirmCancelCopy} />:null}
                {this.props.children}
            </div>
        );
    }

}
function injectProps(state) {
    var { couplist} = state.base || {};
    return { couplist};
}
function injectAction() {
    return { getMasterDetail,applyFollower,openFollow ,followRelieve};
}

module.exports = connect(injectProps, injectAction())(CurrCopyDetailPage);

