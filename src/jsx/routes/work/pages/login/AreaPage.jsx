import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView'
import SearchBar from '../../../../components/common/searchbar/SearchBar'

import AreaItem from '../../components/login/AreaItem';

import styles from './css/areaPage.less';

const areas = [{
    letter:"A",
    list:[{
        areaName:"中国",
        areaCode:"+86"
    },{
        areaName:"美国",
        areaCode:"+10"
    }]
}]

/********我的主页*********/
class AreaPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            search:""
        }
    }
    //获取页面名称
    getPageName() { return "地区选择"; }

    searchChange = (search) => {
        this.setState({search});
    }

    renderAllArea(areas){
        var {search} = this.state;
        return areas.map(item=>{
            var {letter, list} = item;
            return (
                <div>
                    <div className={this.mergeClassName(styles.bg_gray_th)}>{letter}</div>
                    <div className="mg-lr-30">
                    <table width="100%">
                        {list.map(subitem=>{
                            var {areaName, areaCode} = subitem;
                            if(areaName.indexOf(search) != -1){
                                return <AreaItem areaName={areaName} areaCode={areaCode}/>
                            }
                            return null;
                        })}
                    </table>
                    </div>
                </div>
            ) 
        })
    }

    render() {
        systemApi.log("AreaPage render");

        return (
            <FullScreenView>
                <AppHeader headerName="选择国家" />
                <Content>
                    <SearchBar onSearch={this.searchChange} />
                    <div class="floor">
                        <div className={this.mergeClassName(styles.bg_gray_th, "mg-tp-30")}>当前选择国家</div>
                        <div className="mg-lr-30">
                            <table width="100%">
                                <AreaItem areaName="中国" areaCode="+86"/>
                            </table>
                        </div>
                        {this.renderAllArea(areas)}
                    </div>
                </Content>
            </FullScreenView>
        );
    }

}


module.exports = AreaPage;
