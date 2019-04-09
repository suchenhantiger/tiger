import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';

import InputItem from '../../components/me/bank/InputItem';

import styles from './css/addBankPage.less';

/********我的主页*********/
class AddBankPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {}
    }
    //获取页面名称
    getPageName() { return "添加银行账户"; }

    inputChange = (key)=>(e)=>{
        var {value} = e.target;
        this.setState({[key]:value});
    }

    submit = ()=>{
        
    }

    render() {
        systemApi.log("AddBankPage render");

        var {name, country, account, bankName, province, city, branchName, telephone} = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName="" />
                <Content>
                    <div className={styles.header}>添加银行账户</div>
                    <div className={styles.hint}>请绑定认证用户本人的银行账户，当前支持信用卡提现，请绑定储蓄卡。</div>
                    <div className={styles.cont}>
                        <InputItem name="持卡人" value={name} onChange={this.inputChange("name")} placeholder="请输入持卡人姓名" />
                        <InputItem name="银行国家" value={country} onChange={this.inputChange("country")} placeholder="请输入银行国家" />
                        <InputItem name="" value={account} onChange={this.inputChange("account")} placeholder="请输入银行卡" />
                        <InputItem name="" value={bankName} onChange={this.inputChange("bankName")} placeholder="请输入您的银行名称" />
                        <InputItem name="" value={province} onChange={this.inputChange("province")} placeholder="请输入您的开户省" />
                        <InputItem name="" value={city} onChange={this.inputChange("city")} placeholder="请输入您的开户市" />
                        <InputItem name="" value={branchName} onChange={this.inputChange("branchName")} placeholder="请输入支行名称" />
                        <InputItem name="" value={telephone} onChange={this.inputChange("telephone")} placeholder="请输入银行预留手机号" />
                    </div>
                    <div className={styles.btnFrame}><div className={styles.btn} onClick={this.submit}>提交</div></div>
                </Content>
                {this.props.children}
            </FullScreenView>
        );
    }

}


module.exports = AddBankPage;
