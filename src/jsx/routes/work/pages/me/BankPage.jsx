import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import { connect } from 'react-redux';
import { queryBankCard} from '../../actions/me/meAction';
import styles from './css/bankPage.less';
import {getBankCode} from '../../../../utils/util';
/********我的主页*********/
class BankPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state={
            bankList:[]
        }
    }

    componentDidMount() {
        this.queryBankCard();
        Event.register("refresh_banklist",this.refreshBanklist);
        
    }

    queryBankCard =()=>{
        this.props.queryBankCard(this,{bankType:0},(bankList)=>{
            if(bankList && bankList.length>0){
                this.setState({bankList});
            }
               
        });
    }

    componentWillUnmount(){
        Event.unregister("refresh_banklist",this.refreshBanklist);
        
    }

    refreshBanklist=()=>{
        this.queryBankCard();
    }



    //获取页面名称
    getPageName() { return "银行账户"; }

    addAccount = () => {
        hashHistory.push("/work/me/bank/add");
    }

    modifyCard =(cardInfo)=> () =>{
        // cardInfo = JSON.stringify(cardInfo);
        // hashHistory.push({
        //     pathname:"/work/me/bank/modify",
        //     query:{cardInfo}
        // })
    }

    renderBankItem(){
        var {bankList}=this.state;
        return bankList.map((item,index)=>{
            var {
                bankbranch,
                bankcountry,
                bankid,
                bankname,
                banktype,
                cardactive,
                cardholder,
                cardno,
                city,
                clientid,
                createdate,
                id,
                phone,
                province
            } = item;
            var bankColor = index%3;
          //  console.log(bankColor);
            var bankstyle = styles.bk_zg;
            switch(bankColor){
                case 1:
                    bankstyle = styles.bk_zx;
                    break;
                case 2:
                    bankstyle = styles.bk_zh;
                    break;
            }
            cardno = getBankCode(cardno);
            return <li className={bankstyle} onClick={this.modifyCard(item)}>
            {/* <i className={styles.icon_zh}></i> */}
            <p className={styles.bank_name}>{bankname}</p>
            <p><span>储蓄卡</span></p>
            <p className={"font30"}>{cardno}</p>
        </li>

        })
        
    }

    render() {
        systemApi.log("BankPage render");

        return (
            <FullScreenView>
                <AppHeader headerName="银行账户" />
                <Content>
                    <div className={this.mergeClassName("mg-lr-30", "mg-tp-30")}>
                        <div className={this.mergeClassName(styles.upload_box, styles.bank_box)} onClick={this.addAccount}>
                            <span>点此添加银行账户</span>
                        </div>
                        <div className={styles.bank_list}>
                            <ul>
                                {this.renderBankItem()}
                                
                            </ul>
                        </div>
                    </div>
                </Content>
                {this.props.children}
            </FullScreenView>
        );
    }

}
function injectAction() {
    return { queryBankCard};
}

module.exports = connect(null, injectAction())(BankPage);

