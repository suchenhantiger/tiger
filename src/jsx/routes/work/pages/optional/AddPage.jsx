import {connect} from 'react-redux';
import {updateProduct} from '../../actions/optional/optionalAction';
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

    componentDidMount(){
        //先读本地缓存，再发起请求从服务端更新
        this.props.updateProduct(this);
    }

    searchChange = (search)=>{

    }
        
    tabChange = (index)=>{
        this.setState({index});
    }

    gotoSearch=()=>{
        hashHistory.push("/work/optional/add/search");
    }

    render() {
        systemApi.log("AddPage render");

        var { index } = this.state;
        var {ProductList={},OptionalList=[]} =this.props;
        return (
            <FullScreenView>
                <AppHeader headerName="添加交易品种" />
                <Content>
                    {/* <SearchBar onSearch={this.searchChange}/> */}
                    <div className={styles.searchBar} onClick={this.gotoSearch}>
                        <div className={styles.input}> 搜索</div>
                    </div>
                    <SubTabs index={index} onTabChange={this.tabChange}>
                        <UlineTab text="外汇"/>
                        <UlineTab text="贵金属"/>
                        <UlineTab text="能源"/>
                        <UlineTab text="差价合约"/>
                    </SubTabs>
                    {ProductList["1"] || ProductList["2"] || ProductList["3"] ||ProductList["4"] ?
                    <LazyLoad index={index}>
                        <AddList type="1" optList={OptionalList} data={ProductList["1"]?ProductList["1"]:[]}/>
                        <AddList type="2" optList={OptionalList} data={ProductList["2"]?ProductList["2"]:[]}/>
                        <AddList type="3" optList={OptionalList} data={ProductList["3"]?ProductList["3"]:[]}/>
                        <AddList type="4" optList={OptionalList} data={ProductList["4"]?ProductList["4"]:[]}/>
                    </LazyLoad>
                    :null
                    }
                </Content>
                {this.props.children}
            </FullScreenView>
        );
    }

}
function injectProps(state){
    var {ProductList,OptionalList} = state.base || {};
    return {ProductList,OptionalList};
}
function injectAction(){
    return {updateProduct};
}
module.exports = connect(injectProps,injectAction())(AddPage);

