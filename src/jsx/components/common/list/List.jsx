import ToggleItem from "./ToggleItem";

import styles from './css/list.css';

class List extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            index:0
        }
    }

    itemClick = (index)=>{
        this.setState({
            index:index
        })
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("List render");

        var children = [];

        React.Children.forEach(this.props.children,(item,index)=>{
            if(item.type === ToggleItem){
                children.push(React.cloneElement(item,{
                    key:index,
                    index:index,
                    selected:this.state.index,
                    onClick:this.itemClick
                }));
            }
            else{
                children.push(item);
            }
        });

        return(
            <ul>
                {children}
            </ul>
        );
    }


}

module.exports = List;
