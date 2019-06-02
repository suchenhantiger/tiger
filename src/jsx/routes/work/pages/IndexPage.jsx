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
                    <TabItem hash="/work/documentary" iconClass="documentary" text={McIntl.message("export")}/>
                    <TabItem hash="/work/optional" iconClass="optional" text={McIntl.message("trade")}/>
                    <TabItem hash="/work/trade" iconClass="trade" text={McIntl.message("pos")}/>
                    <TabItem hash="/work/me" iconClass="me" text={McIntl.message("mine")}/>
                </BottomTabs>
            </div>
        );
    }
}

module.exports = IndexFrame;
