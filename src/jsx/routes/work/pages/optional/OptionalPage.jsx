import AppHeader from '../../../../components/common/appheader/AppHeader';
import HeaderText from '../../../../components/common/appheader/HeaderText';

import OptionalList from '../../components/optional/OptionalList';
import OptionalEditList from '../../components/optional/OptionalEditList';

import styles from './css/optionalPage.less';

/********自选主页*********/
class OptionalPage extends PageComponent{

    constructor(props,context) {
        super(props,context);
        this.state = {
            editable:false
        }
        
    }

    componentDidMount(){
      
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
            <HeaderText text="添加" onClick={this.addClick}/>
        ]
    }

    renderLeftIcons(){
        var {editable} = this.state;
        return [
            !editable?<HeaderText text="编辑" onClick={this.editClick}/>:<HeaderText text="完成" onClick={this.submitClick}/>
        ]
    }

    render(){
        systemApi.log("OptionalPage render");

        var {editable} = this.state;

        return (
            <div>
                <AppHeader headerName="自选" showBack={false} iconLeft={this.renderLeftIcons()} iconRight={this.renderIcons()}/>
                <Content coverBottom={false}>
                    <div className={styles.optional_tit}>
                        <div className={this.mergeClassName(styles.optional_name, "c6")}>交易品种</div>
                        {editable?null:
                        <div className={styles.optional_price}>
                            <span className={this.mergeClassName("c9", "left")}>最新价格</span>
                            <i className={styles.i_buy}>买入</i>
                            <i className={styles.i_sell}>卖出</i>
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


module.exports = OptionalPage;
