import IScrollView from '../../iscroll/IScrollView';
import FullScreenView from '../../fullscreen/FullScreenView';
import AppHeader from '../../appheader/AppHeader';
import HeaderIcon from '../../appheader/HeaderIcon';
import CursorList from '../../iscroll/CursorList';
import DataLoadRet from '../../common/DataLoadRet';
import SearchBar from "../../searchbar/SearchBar";
import styles from '../css/DataListSelect/dataselectlist.css';
class DataSelectList extends CursorList {
  //构造函数
  constructor(props,context) {
      super(props,context);

      this.state=Object.assign(this.state,{selectdata:[],keyvalue:''})

  }
    renderSearchBar() {
      return (<SearchBar placeholder="查询条件..."
                        value={this.state.keyvalue}
                        onChange={this.inputChange}
                        onSearch={this.toSearch}
                        bgtheme="bgfff"/>);
    }
    componentWillMount(){
      var {data}=this.props;
      this.setState({selectdata:data});
    }

    componentWillReceiveProps(nextProps){
        var {data} = nextProps;
        if(data)
        {
          this.setState({selectdata:data});
        }
    }
    componentDidUpdate(){

    }
    inputChange=(e)=>{
      this.setState({
        keyvalue:e.toString().trim()
      })

    }
    renderNoData(){
      return (<DataLoadRet rettype="nodatafound" btnClick={this.refreshData.bind(this)}/>);
    }

    renderList(){
        return null;
    }

    //渲染UI函数
    renderUI(){
        var {data,preLoad} = this.state;

        return (
            <div className={styles.cd_list}>
                {!data.length && !preLoad?(
                    this.renderNoData()
                ):(
                    <ul className={styles.ul}>
                        {this.renderList()}
                    </ul>
                )}

            </div>
        );
    }
    //关闭弹出窗
    closeWindow=()=>{
      this.closeComponent();
    }

    formatData(){
      return '';
    }

    save=()=>{
      var {onSave}=this.props;
      var {selectdata}=this.state;

      if(onSave)
        onSave(selectdata, this.formatData());
    }
    render() {
        systemApi.log("DataSelectList render");

        return (
          <FullScreenView mask={true}>
              <AppHeader showBack={true} headerName={this.props.headerName}  onBackClick={this.closeWindow}  iconRight={<a  onClick={this.save}>保存</a>} />
              <div className="g_full_content_bggray">
                {this.renderSearchBar()}
                <IScrollView scrollclassName={styles.content}   canUpFresh={this.getCanUpFreshFlag()} upFresh={this.refreshDataFn} canDownFresh={this.getCanDownFreshFlag()} downFresh={this.loadMoreFn} ref="scroll">
                      {this.renderUI()}
                </IScrollView>
              </div>
            </FullScreenView>

        )
    }
}

module.exports = DataSelectList;
