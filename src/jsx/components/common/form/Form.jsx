
class Form extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    buildData=()=>{
        var obj={};
        React.Children.forEach(this.props.children,(item,index)=>{
            if(this.refs["refform_"+index].getWrappedInstance){
                obj=Object.assign({},obj,this.refs["refform_"+index].getWrappedInstance().getKeyValue());
            }else if(item.type!='div'){
                obj=Object.assign({},obj,this.refs["refform_"+index].getKeyValue());
            }
        });
        return obj;
    }

    //渲染函数
    render(){

        var children = [];

        React.Children.forEach(this.props.children,(item,index)=>{
            children.push(React.cloneElement(item,{
                ref:"refform_"+index
            }));
        });

        return <div>{children}</div>;
    }

}

module.exports = Form;
