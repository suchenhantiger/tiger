

import styles from '../css/DataListSelect/datapopselect.css';

class DataPopSelect extends PureComponent{


    //构造函数
    constructor(props) {
        super(props);
        this.state={
          data:[],
          formatdata:"",
          flag:false
        }
    }
    componentWillMount(){
      var {value} = this.props;
      var {data}=this.state;
      if(value){
        this.setState({data:value});
      }
    }
    componentWillReceiveProps(nextProps){
        var {value,idparam} = nextProps;
        var {data}=this.state;
        if(value){
            var fdata='';
            value.forEach((item)=>{fdata+=item[idparam]+","})
            if(fdata.length>0) fdata=fdata.substring(0,fdata.length-1);
            this.setState({data:value,formatdata:fdata});
        }

    }

    chooseClick=()=>{
      var {disabled}=this.props;
      if(!disabled)
        this.setState({flag:true});

    }
    renderContent=()=>{
      var  {data}=this.state;
      var {nameparam,disabled}=this.props;
      var list=[];

      data.forEach((item)=>{
          list.push(<li  onClick={this.delItem(item)} ><a>{item[nameparam]}</a></li>);
      })
      return list;
    }
    formatData(data){
      var {idparam}=this.props;
      var ret="";
      data.forEach((item)=>{
        ret+=item[idparam]+",";
      })
      if(ret.length>0)
        ret=ret.substr(0,ret.length-1);
      return ret;
    }
    getKeyValue=()=>{
      var obj={};
      obj[this.props.tag]=this.state.formatdata;
      return obj;

    }
    closeComponent=()=>{
      this.setState({flag:false});
    }
    delItem=(obj)=>{
      return ()=>{
        var {disabled}=this.props;
        if(!disabled){
          var {idparam,nameparam}=this.props;
          var {data}=this.state;
          var index=data.findIndex((item)=>item[idparam]==obj[idparam]);
          var list=data.slice(0);
          list.splice(index,1);
          this.setState({data:list,formatdata:this.formatData(list)});
        }

      }
    }
    saveRet=(data, formatdata)=>{
     
       this.setState({flag:false,data:data,formatdata:formatdata});
    }
    //渲染函数
    render(){


        var {label,nullable,value,tag,popclass,bordertype,moduletype,idparam,nameparam,disabled} = this.props,
            {data,flag}=this.state,
            divFrmCls= this.mergeClassName(styles.box,bordertype?styles[bordertype]:null),
            Component = require("../../../../routes/work/components/anaplatform/DataSelect/"+popclass),
            formCls=this.mergeClassName(styles.formelem,disabled?styles.disable:"");

        return(
            <div className={divFrmCls}>
                {label?(
                    <label>
                        {nullable==false?<i>*</i>:<i style={{"visibility":"hidden"}}>*</i>}
                      {label}
                    </label>
                ):null}
                <div className={formCls}>
                     <ul>
                       {this.renderContent()}
                     </ul>
                   <span className={styles.addpic} onClick={this.chooseClick}></span>
                </div>
                {flag?<Component  tag={tag} idparam={idparam}  nameparam={nameparam} onClose={this.closeComponent} onSave={this.saveRet} onItemClick={this.onItemClick}
                 moduletype={moduletype} data={data}  headerName={label} />:null}
            </div>
        );
    }


}

module.exports = DataPopSelect;
