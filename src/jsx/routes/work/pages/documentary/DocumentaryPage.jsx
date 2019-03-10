import AppHeader from '../../../../components/common/appheader/AppHeader';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';
import ClassifyFrame from '../../components/documentary/ClassifyFrame';
import MultipleFrame from '../../components/documentary/MultipleFrame';


import styles from './css/documentaryPage.less';

/********跟单主页*********/
class DocumentaryPage extends PageComponent{

    constructor(props,context) {
        super(props,context);
        this.state = {
            index:0
        }
    }
      //获取页面名称
    getPageName(){ return "跟单主页"; }

    tabChange = (index) => () => {
        this.setState({ index });
    }

    renderHeader() {
        var { index } = this.state;
        return (
            <div className={styles.tabs}>
                <span className={this.mergeClassName(styles.item, index == 0 ? styles.on : "")} onClick={this.tabChange(0)}>分类高手<i></i></span>
                <span className={this.mergeClassName(styles.item, index == 1 ? styles.on : "")} onClick={this.tabChange(1)}>综合高手<i></i></span>
            </div>
        )
    }

    render(){
        systemApi.log("DocumentaryPage render");

        var {index} = this.state;

        return (
            <div>
                <AppHeader headerName={this.renderHeader()} showBack={false}/>
                <Content coverBottom={false}>
                    <LazyLoad index={index}>
                        <ClassifyFrame/>
                        <MultipleFrame/>
                    </LazyLoad>
                </Content>
                {this.props.children}
            </div>
        );
    }

}


module.exports = DocumentaryPage;
