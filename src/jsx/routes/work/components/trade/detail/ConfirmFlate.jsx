import Confirm from '../../../../../components/common/popup/Confirm';

import styles from './css/disclaimer.less';

class ConfirmFlate extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }


    onSure = ()=>{
        var {onSure} = this.props;
        onSure && onSure();
    }

    //渲染函数
    render(){

        var {onCancel,onSure} = this.props;

        return(
            <Confirm onSure={onSure} onCancel={onCancel}>
                <div>
                    <p className="font30 mg-bt-30 center">您确定要平仓吗？</p>
                </div>
            </Confirm>
        );
    }

}

module.exports = ConfirmFlate;
