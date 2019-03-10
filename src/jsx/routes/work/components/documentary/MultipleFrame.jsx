import SubTabs from '../../../../components/common/subtabs/SubTabs';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';
import FlatTab from '../../../../components/common/subtabs/FlatTab';
import BenefitList from './BenefitList';
import styles from './css/multipleFrame.less';

class MultipleFrame extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            index:0
        }
    }

    tabChange = (index)=>{
        this.setState({index});
    }

    //渲染函数
    render() {

        var {index} = this.state;

        return (
            <div>
                <SubTabs index={index} onTabChange={this.tabChange}>
                    <FlatTab text="收益高手"/>
                    <FlatTab text="稳健高手"/>
                    <FlatTab text="常在高手"/>
                </SubTabs>
                <LazyLoad index={index}>
                    <BenefitList/>
                </LazyLoad>
            </div>
        );
    }

}

module.exports = MultipleFrame;
