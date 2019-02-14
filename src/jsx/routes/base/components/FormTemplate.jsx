import {connect} from 'react-redux';
import {getTemplate} from '../actions/templateAction';

import TextInput from './TextInput';
import TextArea from './TextArea';
import SelectBox from './SelectBox';
import DateTime from './DateTime';
import Category from './Category';

import styles from './css/uiTemplate.css';

class FormTemplate extends PureComponent {
    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            templates:[]
        }
    }

    componentDidMount(){
        var {local, tmplId, tmplData} = this.props;
        this.initTemplate(local, tmplId, tmplData);
    }

    componentWillReceiveProps(nextProps){
        var {local:oldLocal, tmplId:oldTmplId, tmplData:oldTmplData} = this.props,
            {local, tmplId, tmplData} = nextProps;

        if(oldLocal!=local || oldTmplId!=tmplId || oldTmplData!=tmplData){
            this.initTemplate(local, tmplId, tmplData);
        }
    }

    //初始化模板号和数据
    initTemplate(local, tmplId, tmplData){
        if(!tmplId && !tmplData) return;
        if(tmplData){
            this.setState({templates:tmplData});
        }
        else{
            if(local){
                var templates = require("../../../templates/"+tmplId+".json");
                this.setState({templates});
            }
            else{
                this.props.getTemplate(this, tmplId, this.updateTemplates);
            }
        }

    }

    updateTemplates = (templates)=>{
        this.setState({templates});
    }

    valueChange = (key)=>(value)=>{
        var {onChange} = this.props;
        onChange && onChange(key, value);
    }

    renderForm(templates, data){
        return templates.map((item)=>{
            var {onCustomRender} = this.props,
                {title, value, key, type, editable, defaultValue, required, datas, picktitle} = item;
            if(type == "input"){
                return <TextInput title={title} required={required} value={value || data[key] || defaultValue || ""} editable={editable} onChange={this.valueChange(key)}/>
            }
            else if(type == "textarea"){
                return <TextArea title={title} required={required} value={value || data[key] || defaultValue || ""} editable={editable} onChange={this.valueChange(key)}/>;
            }
            else if(type == "blank"){
                return <div className={styles.blank}></div>;
            }
            else if(type == "select"){
                return <SelectBox title={title} required={required} picktitle={picktitle} value={value || data[key] || defaultValue || ""} datas={datas} editable={editable} onChange={this.valueChange(key)}/>;
            }
            else if(type == "radio"){
                return null;
            }
            else if(type == "checkbox"){
                return null;
            }
            else if(type == "datetime"){
                return <DateTime title={title} required={required} value={value || data[key] || defaultValue || ""} editable={editable} onChange={this.valueChange(key)}/>;
            }
            else if(type == "category"){
                return <Category title={title}/>
            }
            return (onCustomRender && onCustomRender(item)) || null;
        });
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("FormTemplate render");

        var {data} = this.props,
            {templates} = this.state;

        return (
            <div>
                {this.renderForm(templates, data)}
            </div>
        );
    }

}

function injectAction(){
    return {getTemplate};
}

module.exports = connect(null, injectAction())(FormTemplate);
