import AppHeader from '../../../../components/common/appheader/AppHeader';
import HeaderText from '../../../../components/common/appheader/HeaderText';
import {connect} from 'react-redux';
import OptionalList from '../../components/optional/OptionalList';
import OptionalEditList from '../../components/optional/OptionalEditList';
import {updateProduct} from '../../actions/optional/optionalAction';
import styles from './css/optionalPage.less';
import VConsole from 'vconsole';
/********自选主页*********/
class OptionalPage extends PageComponent{

    constructor(props,context) {
        super(props,context);
        this.state = {
            editable:false
        }
        this._secret=0;
    }

    componentDidMount(){

        this.props.updateProduct(this);
      
    }
      //获取页面名称
    getPageName(){ return "自选主页"; }

    addClick = ()=>{
        hashHistory.push("/work/optional/add");
        
    }

    editClick = ()=>{
       this.setState({editable:true});
    }

    submitClick = ()=>{
        this.refs.edit.getWrappedInstance().save();
        this.setState({editable:false});
    }

    renderIcons(){
        var {editable} = this.state;
        if(!editable)
        return [
            <HeaderText text={McIntl.message("add")} onClick={this.addClick}/>
        ]
    }

    secretFunc=()=>{
        
        if(this._secret<10){
            this._secret++
        }else{
            vconsole = true;
            let vConsole = new VConsole() ;
        }
    }

    rendertitle=()=>{
        return <span onClick={this.secretFunc}>{McIntl.message("trade")}</span>
    }

    renderLeftIcons(){
        var {editable} = this.state;
        return [
            !editable?<HeaderText text={McIntl.message("edit")} onClick={this.editClick}/>:<HeaderText text="完成" onClick={this.submitClick}/>
        ]
    }

    render(){
        systemApi.log("OptionalPage render");

        var {editable} = this.state;

        return (
            <div>
                <AppHeader headerName={this.rendertitle()} showBack={false} iconLeft={this.renderLeftIcons()} iconRight={this.renderIcons()}/>
                <Content coverBottom={false}>
                    <div className={styles.optional_tit}>
                        <div className={this.mergeClassName(styles.optional_name, "c6")}>{McIntl.message("product")}</div>
                        {editable?null:
                        <div className={styles.optional_price}>
                            <span className={this.mergeClassName("c9", "left")}>{McIntl.message("new_price")}</span>
                            <i className={styles.i_buy}>{McIntl.message("buy")}</i>
                            <i className={styles.i_sell}>{McIntl.message("sell")}</i>
                        </div>
                        
                        }
                        
                    </div>
                    {!editable?(
                        <OptionalList/>
                    ):(
                        <OptionalEditList ref="edit"/>
                    )}
                </Content>
                {this.props.children}
            </div>
        );
    }

}

function injectAction(){
    return {updateProduct};
}
module.exports = connect(null,injectAction())(OptionalPage);
