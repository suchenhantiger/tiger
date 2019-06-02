import {connect} from 'react-redux';
import {showComplete,showCertification} from '../../../../store/actions';
import styles from './css/noMt4Frame.less';

class NoMt4Frame extends PureComponent {

    // static defaultProps = {
    //     selectType:0,
    //     showOn:true
    // }
    //构造函数
    constructor(props) {
        super(props);

    }

    
    addAccount=()=>{
        this.props.showComplete("完善资料后可开通体验账号");
    }

 

    //渲染函数
    render() {


        return (

            <div className={styles.optional_detail}>
                <div className={styles.currency_name}>
                    <p className={"c3 font32"}>{McIntl.message("trade_acc")}</p>
                </div>
                <div className={"clear"}></div>
                <div className={styles.account_dt2}>
                    <div style={{textAlign:"center",fontSize:".8rem",paddingTop: ".1rem",paddingBottom: ".1rem",color: "#999"}} onClick={this.addAccount}> +</div>
                    <div style={{textAlign:"center",color: "#999"}}  onClick={this.addAccount} >{McIntl.message("creat_sub_acc")}</div>
                </div>
            </div>
        );
    }

}
function injectAction(){
    return {showComplete,showCertification};
}

module.exports = connect(null,injectAction())(NoMt4Frame);

