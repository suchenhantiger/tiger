import styles from './css/carouselselect.css';
import CarouselSelectItem from './CarouselSelectItem';

// const data = [
//     {
//         value:1,
//         text:"1",
//         children:[{
//             value:11,
//             text:"11"
//         },{
//             value:12,
//             text:"12"
//         }]
//     },{
//         value:2,
//         text:"2",
//         children:[{
//             value:21,
//             text:"21"
//         },{
//             value:22,
//             text:"22"
//         }]
//     }
// ]


/**
*
* @param data  数据源
* @param values 初始选中值
*/
class CarouselSelect extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);

        this.state = {
            values:props.values || []
        }
    }

    componentWillMount(){

        this.initValue(this.props.data);
    }

    initValue(data){
        var deep = 1,
            values = [],
            curNode = data[0];
        while(true){
            var {children} = curNode;
            values.push(curNode.value);
            if(children && children[0]){
                curNode = children[0];
                deep++;
                continue;
            }
            break;
        }
        this.deep = deep;
        if(!this.state.values.length){

            this.setState({values});
        }
    }

    getItem(data, value){
        for(var i=0;i<data.length;i++){
            if(data[i].value == value)
                return data[i];
        }
        return null;
    }

    //选择改变后，子项重新渲染
    reInitValue(data, startIndex){
        var curNode = data,
            {values} = this.state;
        for(var i=0;i<this.deep;i++){
            if(i<=startIndex){
                curNode = this.getItem(curNode, values[i]).children;
            }
            else{
                values[i] = curNode[0].value;
                curNode = curNode[0].children;
            }
        }
        this.setState({values:values.slice(0)});
    }

    selectChange = (index)=>(value)=>{
        this.state.values[index] = value;
        this.reInitValue(this.props.data, index);
    }

    renderSelect(data){
        var curNode = data,
            {values} = this.state;


        return values.map((value, index)=>{
            var element = <CarouselSelectItem width={100/this.deep+"%"} data={curNode} value={value} onChange={this.selectChange(index)}/>;
            curNode = this.getItem(curNode, value).children;
            return element;
        });
    }

    //获取选择节点数组
    renderValues(data, values){
        var curNode = data;
        return values.map((value, index)=>{
            var item = this.getItem(curNode, value),
                {children, ...obj} = item;
            curNode = children;
            return obj;
        });
    }

    okClick = ()=>{
        var {onSelect, data} = this.props,
            {values} = this.state;
        onSelect && onSelect(this.renderValues(data, values));
    }

    cancelClick = ()=>{
        var {onCancel} = this.props,
            {values} = this.state;
        onCancel && onCancel(values);
    }

    //渲染函数
    render(){
 
        return(
            <div className={styles.frame}>
                <div className={styles.buttons}>
                    <div className={styles.cancel} onClick={this.cancelClick}>取消</div>
                    <span className={styles.text}>请选择</span>
                    <div className={styles.ok} onClick={this.okClick}>确定</div>
                </div>
                <div className={styles.box}>
                    {this.renderSelect(this.props.data)}
                </div>
            </div>
        );
    }


}

module.exports = CarouselSelect;
