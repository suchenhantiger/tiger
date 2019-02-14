import BottomTabs from '../../../components/common/bottomtabs/BottomTabs';
import TabItem from '../../../components/common/bottomtabs/TabItem';

/** 首页构件 **/
class IndexFrame extends PureComponent{

    constructor(props,context) {
        super(props,context);
    }

    render(){
        systemApi.log("IndexFrame render");

        return (
            <div>
                <div className="g_main">
                    {this.props.children}
                </div>
                <BottomTabs>
                    <TabItem hash="/work/documentary" iconClass="documentary" text="跟单"/>
                    <TabItem hash="/work/optional" iconClass="optional" text="自选"/>
                    <TabItem hash="/work/trade" iconClass="trade" text="交易"/>
                    <TabItem hash="/work/me" iconClass="me" text="我的"/>
                </BottomTabs>
            </div>
        );
    }
}

module.exports = IndexFrame;
