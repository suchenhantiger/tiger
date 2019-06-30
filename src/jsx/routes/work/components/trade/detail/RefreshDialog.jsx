import Confirm from '../../../../../components/common/popup/Confirm2';

import styles from './css/disclaimer.less';

class RefreshDialog extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);

    }


    //渲染函数
    render(){

        var {onSure} = this.props;

        return(
            <Confirm onSure={onSure} showCancel={false} >
                <div>
                    <p className="font30 mg-bt-30 center">订单已发生变化，请更新持仓列表</p>
                </div>
            </Confirm>
        );
    }

}

module.exports = RefreshDialog;