import Confirm from '../../../../../components/common/popup/Confirm';

import styles from './css/disclaimer.less';

class BuyDialog extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            choose:false
        }
    }

    toggleChoose = ()=>{
        var {choose} = this.state;
        this.setState({choose:!choose});
    }

    onSure = ()=>{
        var {onSure,direction} = this.props,
            {choose} = this.state;
        onSure && onSure(direction,choose);
    }

    //渲染函数
    render(){

        var {onCancel, num, direction} = this.props,
            {choose} = this.state;

        return(
            <Confirm onSure={this.onSure} onCancel={onCancel}>
                <div>
                    <p className="font30 mg-bt-30 center">您确定要{direction==0?"买入":"卖出"}{num}手吗？</p>
                    {/* <p className={this.mergeClassName("coffee", styles.coffee)} onClick={this.toggleChoose}><i className={this.mergeClassName(styles.icon_choose, choose?styles.on:"", "mg-rt-10")}></i>不再提醒</p> */}
                </div>
            </Confirm>
        );
    }

}

module.exports = BuyDialog;
