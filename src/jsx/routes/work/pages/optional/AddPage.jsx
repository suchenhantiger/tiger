import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import SearchBar from '../../../../components/common/searchbar/SearchBar';
import SubTabs from '../../../../components/common/subtabs/SubTabs';
import UlineTab from '../../../../components/common/subtabs/UlineTab';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';

import AddList from '../../components/optional/add/AddList';

import styles from './css/addPage.less';

/********自选-添加*********/
class AddPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            index:0
        }
    }
    //获取页面名称
    getPageName() { return "自选-添加"; }

    searchChange = (search)=>{

    }
        
    tabChange = (index)=>{
        this.setState({index});
    }

    render() {
        systemApi.log("AddPage render");

        var { index } = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName="添加交易品种" />
                <Content>
                    <SearchBar onSearch={this.searchChange}/>
                    <SubTabs index={index} onTabChange={this.tabChange}>
                        <UlineTab text="外汇"/>
                        <UlineTab text="贵金属"/>
                        <UlineTab text="能源"/>
                        <UlineTab text="差价合约"/>
                    </SubTabs>
                    <LazyLoad index={index}>
                        <AddList type=""/>
                        <AddList type=""/>
                        <AddList type=""/>
                        <AddList type=""/>
                    </LazyLoad>
                </Content>
                {this.props.children}
            </FullScreenView>
        );
    }

}


module.exports = AddPage;
