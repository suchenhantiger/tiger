import {connect} from 'react-redux';
import {updateProduct} from '../../actions/optional/optionalAction';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import SearchBar from '../../../../components/common/searchbar/SearchBar';

import AddList from '../../components/optional/add/AddList';

import styles from './css/addPage.less';

/********自选-添加*********/
class SearchPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            index:0,
            resArr:[]
        }
    }
    //获取页面名称
    getPageName() { return "自选-添加"; }

    componentDidMount(){
        //先读本地缓存，再发起请求从服务端更新
        this.props.updateProduct(this);
    }

    searchChange = (search)=>{
        var {ProductList={}} =this.props;
        console.log(ProductList);
        var resArr=[];
        if(ProductList[1]){
            for(var i=0,l=ProductList[1].length;i<l;i++){
                var {prodCode,prodName}  = ProductList[1][i];
                var lowerCode = search.toUpperCase();
                if(prodCode.indexOf(search)>=0 || prodName.indexOf(search)>=0 || prodCode.indexOf(lowerCode)>=0   )
                    resArr.push(ProductList[1][i]);
            }
        }
        if(ProductList[2]){
            for(var i=0,l=ProductList[2].length;i<l;i++){
                var {prodCode,prodName}  = ProductList[2][i];
                var lowerCode = search.toUpperCase();
                if(prodCode.indexOf(search)>=0 || prodName.indexOf(search)>=0 || prodCode.indexOf(lowerCode)>=0  )
                    resArr.push(ProductList[2][i]);
            }
        }
        if(ProductList[3]){
            for(var i=0,l=ProductList[3].length;i<l;i++){
                var {prodCode,prodName}  = ProductList[3][i];
                var lowerCode = search.toUpperCase();
                if(prodCode.indexOf(search)>=0 || prodName.indexOf(search)>=0 || prodCode.indexOf(lowerCode)>=0  )
                    resArr.push(ProductList[3][i]);
            }
        }
        if(ProductList[4]){
            for(var i=0,l=ProductList[4].length;i<l;i++){
                var {prodCode,prodName}  = ProductList[4][i];
                var lowerCode = search.toUpperCase();
                if(prodCode.indexOf(search)>=0 || prodName.indexOf(search)>=0 || prodCode.indexOf(lowerCode)>=0 )
                    resArr.push(ProductList[4][i]);
            }
        }

        this.setState({resArr});
        

    }


    render() {
        systemApi.log("AddPage render");

        var { resArr } = this.state;
        var {OptionalList=[]} =this.props;

        return (
            <FullScreenView>
                <AppHeader headerName="搜索交易品种" />
                <Content>
                    <SearchBar onSearch={this.searchChange}/>
                    <AddList type="99" optList={OptionalList} data={resArr}/>

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
module.exports = connect(injectProps,injectAction())(SearchPage);

